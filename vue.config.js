var path = require('path')

module.exports = {
  outputDir:'../cordova/www/',
  publicPath:'./',

  configureWebpack:{
    resolve:{
        alias:{
          'assets':'@/assets',
          'common':'@/common',
          'components':'@/components',
            'views':'@/views',
          'network':'@/network'
        }
    }
  },
  devServer: {

    public: '0.0.0.0:8080',

    hot: true,

    disableHostCheck: true,

  },



}
