import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { docClient, TableNames } from '../utils/dynamodb';
import { success, error } from '../utils/response';

const getUserId = (event: APIGatewayProxyEvent): string | null => {
  return event.requestContext.authorizer?.claims?.sub || null;
};

export const save = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const userId = getUserId(event);
    if (!userId) return error('Unauthorized', 401);

    const body = JSON.parse(event.body || '{}');
    const { child_id, story_id, event_type } = body;

    if (!child_id || !story_id || !event_type) {
      return error('Missing required fields', 400);
    }

    if (!['view', 'favorite', 'unfavorite', 'complete'].includes(event_type)) {
      return error('Invalid event_type', 400);
    }

    await docClient.send(new PutCommand({
      TableName: TableNames.EVENTS,
      Item: {
        event_id: uuidv4(),
        user_id: userId,
        child_id,
        story_id,
        event_type,
        timestamp: new Date().toISOString(),
      },
    }));

    return success({ message: 'Interaction saved' });
  } catch (err: any) {
    return error(err.message || 'Failed to save interaction', 500);
  }
};

export const getLibrary = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const userId = getUserId(event);
    if (!userId) return error('Unauthorized', 401);

    const { child_id, tab = 'continue' } = event.queryStringParameters || {};
    if (!child_id) return error('child_id is required', 400);

    // Get progress for continue reading
    const progressResult = await docClient.send(new QueryCommand({
      TableName: TableNames.PROGRESS,
      IndexName: 'user-child-index',
      KeyConditionExpression: 'user_id = :userId AND begins_with(pk, :prefix)',
      ExpressionAttributeValues: {
        ':userId': userId,
        ':prefix': `${userId}#${child_id}#`,
      },
    }));

    // Get interactions for favorites
    const eventsResult = await docClient.send(new QueryCommand({
      TableName: TableNames.EVENTS,
      IndexName: 'user-child-index',
      KeyConditionExpression: 'user_id = :userId AND begins_with(child_id, :childId)',
      ExpressionAttributeValues: {
        ':userId': userId,
        ':childId': child_id,
      },
    }));

    const progress = progressResult.Items || [];
    const events = eventsResult.Items || [];

    // Filter based on tab
    let library: any[] = [];
    if (tab === 'continue') {
      library = progress.filter(p => !p.completed && p.percentage > 0);
    } else if (tab === 'favorites') {
      const favoriteStoryIds = new Set(
        events.filter(e => e.event_type === 'favorite').map(e => e.story_id)
      );
      library = progress.filter(p => favoriteStoryIds.has(p.story_id));
    } else if (tab === 'completed') {
      library = progress.filter(p => p.completed);
    }

    return success({ library, tab });
  } catch (err: any) {
    return error(err.message || 'Failed to get library', 500);
  }
};
