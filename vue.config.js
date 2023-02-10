module.exports = {
  // LintOnSave: false
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'htthttp://gmall-h5-api.atguigu.cn',
        // pathRewrite: {'^/api' : ''}
      }
    }
  }
}
