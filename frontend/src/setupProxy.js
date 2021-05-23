// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//     const target = "http://127.1.1:3001"
//   app.use(
//     createProxyMiddleware("/iceApi", { // iceApi是自定义的，用的时候也要对应写iceApi
//       target: target, // 请求的地址
//       changeOrigin: true,
//       pathRewrite: {
//         "^/iceApi": ""
//       }
//     })
//   );
// }