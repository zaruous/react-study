const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    createProxyMiddleware(
      '/api-service',     
      {
        /* target: process.env.REACT_APP_API_URL,*/
        target: "http://localhost:8190",
        changeOrigin: true,
        /*
        router: {
          '/v2': process.env.REACT_APP_V2_URL
        },
        
        pathRewrite: {
          '^/v2': ''
        }
        */
      }
    )
  );
}
