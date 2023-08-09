module.exports = {
  // baseUrl: process.env.NODE_ENV === "production" ? "/" : "/",

  "devServer": {
      "proxy": {
          "/api/GetWinningNumbers/": {
              "target": 'https://www.dhlottery.co.kr/',
              "pathRewrite": { '^/api/GetWinningNumbers/': '' },
              "changeOrigin": true,
              "secure": false
          }
      }
  }
};