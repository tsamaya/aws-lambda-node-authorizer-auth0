const jwt = require('jsonwebtoken');

// Set in `environment` of serverless.yml
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_CERTIFICATE = process.env.AUTH0_CERTIFICATE;

// Policy helper function
const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  console.log('authResponse', JSON.stringify(authResponse));
  return authResponse;
};

module.exports.auth = (event, ctx, callback) => {
  console.log('Autthorizer event', event);
  if (!event.authorizationToken) {
    console.log('no authorization!');
    // return generatePolicy('NoAuthorization', 'Deny', event.methodArn);
    return callback('Unauthorized');
  }

  const tokenParts = event.authorizationToken.split(' ');
  const tokenValue = tokenParts[1];

  if (!(tokenParts[0].toLowerCase() === 'bearer' && tokenValue)) {
    console.log('no auth token!');
    // return generatePolicy('NoAuthToken', 'Deny', event.methodArn);
    return callback('Unauthorized');
  }
  const options = {
    audience: `https://${AUTH0_DOMAIN}/api/v2/`,
  };

  try {
    jwt.verify(
      tokenValue,
      AUTH0_CERTIFICATE,
      options,
      (verifyError, decoded) => {
        if (verifyError) {
          console.log('Verify Error', verifyError);
          // 401 Unauthorized
          console.log(`Token invalid. ${verifyError}`);
          // return generatePolicy('VerifyError', 'Deny', event.methodArn);
          return callback('Unauthorized');
        }
        // Valid token
        console.log('Valid from customAuthorizer', decoded);
        // return generatePolicy(decoded.sub, 'Allow', event.methodArn);
        return callback(
          null,
          generatePolicy(decoded.sub, 'Allow', event.methodArn)
        );
      }
    );
  } catch (err) {
    console.log('Error caught. Invalid token', err);
    // return generatePolicy('InvalidToken', 'Deny', event.methodArn);
    return callback('Unauthorized');
  }
};
