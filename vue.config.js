module.exports = {
  // baseUrl: process.env.NODE_ENV === "production" ? "/" : "/",

  "devServer": {
      "proxy": {
          "/youtube/": {
              "target": 'https://youtu.be/',
              "pathRewrite": { '^/youtube/': '' },
              "changeOrigin": true,
              "secure": false
          }
      }
  }
};