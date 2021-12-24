const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const apiPaths = {
  '/backend': {
    target: 'http://localhost:3434',
    pathRewrite: {
      '^/backend': '/',
    },
    changeOrigin: true,
  },
};

app.prepare().then(() => {
  const server = express();

  if (dev) {
    server.use('/backend', createProxyMiddleware(apiPaths['/backend']));
  }

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
