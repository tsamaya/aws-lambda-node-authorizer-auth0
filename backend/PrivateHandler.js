// Private API endpoint
module.exports.handleRequest = async (event) => {
  console.log('event received for', event.requestContext.accountId);
  return {
    statusCode: 200,
    headers: {
      /* Required for CORS support to work */
      'Access-Control-Allow-Origin': '*',
      /* Required for cookies, authorization headers with HTTPS */
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      message: 'Hi ʕʘ‿ʘʔ from Private API. Only logged in users can see this',
    }),
  };
};
