import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
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
    const { child_id, story_id, paragraph_index, percentage, completed } = body;

    if (!child_id || !story_id || paragraph_index === undefined || percentage === undefined) {
      return error('Missing required fields', 400);
    }

    const pk = `${userId}#${child_id}#${story_id}`;
    const now = new Date().toISOString();

    await docClient.send(new PutCommand({
      TableName: TableNames.PROGRESS,
      Item: {
        pk,
        user_id: userId,
        child_id,
        story_id,
        paragraph_index: parseInt(paragraph_index),
        percentage: parseFloat(percentage),
        last_read: now,
        completed: !!completed,
        ...(completed && { completed_at: now }),
      },
    }));

    return success({ message: 'Progress saved' });
  } catch (err: any) {
    return error(err.message || 'Failed to save progress', 500);
  }
};

export const getProgress = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const userId = getUserId(event);
    if (!userId) return error('Unauthorized', 401);

    const { child_id } = event.queryStringParameters || {};
    if (!child_id) return error('child_id is required', 400);

    const result = await docClient.send(new QueryCommand({
      TableName: TableNames.PROGRESS,
      IndexName: 'user-child-index',
      KeyConditionExpression: 'user_id = :userId AND begins_with(pk, :prefix)',
      ExpressionAttributeValues: {
        ':userId': userId,
        ':prefix': `${userId}#${child_id}#`,
      },
    }));

    return success({ progress: result.Items || [] });
  } catch (err: any) {
    return error(err.message || 'Failed to get progress', 500);
  }
};
