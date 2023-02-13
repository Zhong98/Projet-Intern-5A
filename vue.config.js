const { defineConfig } = require('@vue/cli-service');
let path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  //代理，跨域
  devServer:{
    proxy:{
      '/api':{
        target:"http://localhost:3000",
        changeOrigin: true,
        pathRewrite:{
          '^/api':'/api'
        }
      }
    }
  },
  configureWebpack:(config)=>{
    config.resolve={
      extensions:['.js','.json','.vue'],
      alias:{
        '@':path.resolve(__dirname,'./src'), //有@默认从src目录开始找
      }
    }
  }
})
