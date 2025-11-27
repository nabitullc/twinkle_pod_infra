import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
};

const userPool = new CognitoUserPool(poolData);

export const signUp = (email: string, password: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
    ];

    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export const signIn = (email: string, password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const token = result.getIdToken().getJwtToken();
        resolve(token);
      },
      onFailure: (err) => reject(err),
    });
  });
};

export const signOut = () => {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
  }
};

export const getCurrentUser = (): CognitoUser | null => {
  return userPool.getCurrentUser();
};
