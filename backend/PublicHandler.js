// Public API endpoint
module.exports.handleRequest = async (event) => {
  // console.log('event received');
  return {
    statusCode: 200,
    headers: {
      /* Required for CORS support to work */
      'Access-Control-Allow-Origin': '*',
      /* Required for cookies, authorization headers with HTTPS */
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      message: 'Hi (͡• ͜໒ ͡• ) from Public API',
    }),
  };
};
