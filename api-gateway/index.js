const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: 'http://localhost:8000',
    changeOrigin: true,
  })
);
app.use(
  "/api/posts",
  createProxyMiddleware({
    target: "http://localhost:9000",
    changeOrigin: true,
  })
);
app.use(
  "/api/comments",
  createProxyMiddleware({
    target: "http://localhost:10000",
    changeOrigin: true,
  })
);

const port = 3000;
app.listen(port, () => console.log(`api gateway on port ${port}`));