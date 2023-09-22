const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Proxy requests to your Node.js server running on port 3001
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001', // Change this to match your Node.js server's address
      changeOrigin: true,
    })
  );
};
