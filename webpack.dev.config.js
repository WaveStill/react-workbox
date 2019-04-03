const path = require("path");

// plugins 中使用
const webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');  

const CleanWebpackPlugin = require('clean-webpack-plugin');  //清楚 以前的dist 打包文件

const workboxPlugin = require('workbox-webpack-plugin');

require("babel-polyfill")

// --hot 热更新  只是配合网页刷新， 不能保存 state状态
/**
 * Q:　请问webpack-dev-server与react-hot-loader两者的热替换有什么区别？

    A: 区别在于webpack-dev-server自己的--hot模式只能即时刷新页面，但状态保存不住。
    因为React有一些自己语法(JSX)是HotModuleReplacementPlugin搞不定的。
    而react-hot-loader在--hot基础上做了额外的处理，来保证状态可以存下来。
 */

// "start": "webpack-dev-server --config webpack.dev.config.js --color --progress --hot", 
// package.json 里面的start 里面的 color 颜色， 和 --progress 进程， 这个进程 非常消耗Node 资源， 可以不用要

 // z最后 要加一个devtool优化 确保 能找到报错的位置， 而不是在 build.js 里面

module.exports = {
  // devtool 优化
  devtool: 'inline-source-map',
  entry: {
    app:[
      'react-hot-loader/patch', //增加react热更新模块
      'babel-polyfill',
      path.join(__dirname, 'src/index.js')
    ],
    vendor: ['react', 'react-router-dom', 'react-dom', ] //抽离公共组件  现在还例如 redux  引入之后  也要加进去
  },

  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].js'
  },

  //src文件夹下面的以.js结尾的文件，要使用babel解析
  //cacheDirectory是用来缓存编译结果，下次编译加速
  module: {
    rules: [
      //编译  图片
      //   {
      //     test: /\.(png|jpg|gif)$/,
      //     use: [{
      //         loader: 'url-loader',
      //         options: {
      //             limit: 8192 //options limit 8192意思是，小于等于8K的图片会被转成base64编码，直接插入HTML中，减少HTTP请求。
      //         }
      //     }]
      // },
      // // 编译css
      // {
      //   test: /\.(css|scss)$/,
      //   use: ['style-loader', 'css-loader', "postcss-loader", "sass-loader"]
      // },

      // 下边是完整 编译模块

      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
          test: /\.scss$/,
          loaders: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      }, {
          test: /\.css$/,
          loaders: ["style-loader", "css-loader", "postcss-loader"]
      },{
          test: /\.(jpe?g|png|gif|svg|mp4|rmvb)$/,
          loader: 'url-loader',
          query: {limit: 10240}
      },{
          test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
          loader: "url-loader",
          query: {
              limit: 1024
          }
      },
      {
        test: /\.(js|jsx|mjs)$/,
        use: ['babel-loader?cacheDirectory=true'],
        include: path.join(__dirname, 'src')
      }
    ]
  },

  // 配置dev-server
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true,
    hot: true,
    port: 3000
  },

  plugins: [
    /*
    HRM配置其实有两种方式，一种CLI方式，一种Node.js API方式。我们用到的就是CLI方式，比较简单。
    Node.js API方式，就是建一个server.js等等，网上大部分教程都是这种方式，这里不做讲解了。

    你以为模块热替换到这里就结束了？nonono~

      上面的配置对react模块的支持不是很好哦。

      当模块热替换的时候，state会重置，这不是我们想要的
    
    */

   
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src/index.html')
    }),
    new webpack.HashedModuleIdsPlugin(),

    /*plugins*/
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
  }),

  new webpack.optimize.CommonsChunkPlugin({
    name: 'runtime'
  }),

   // 以下为service-worker 配置
  //  new workboxPlugin({
  //   globDirectory: 'dist',
  //   globPatterns: [
  //     '**/*.{js,css}',
  //   ],
  //   swSrc: './src/sw.js',
  //   swDest: path.join('dist', 'sw.js')
  //  }),

  new webpack.DefinePlugin({   //内置 压缩代码  把开发环境的Log 到成产环境后都去掉
    'process.env': {
        'NODE_ENV': JSON.stringify('production')
     }
  }),

  //你现在打开dist，是不是发现好多好多文件，每次打包后的文件在这里混合了？我们希望每次打包前自动清理下dist文件。
  new CleanWebpackPlugin(['dist'])
 
  ]

}