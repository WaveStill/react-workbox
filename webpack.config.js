const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const CleanWebpackPlugin = require('clean-webpack-plugin'); //打包优化
const workboxPlugin = require('workbox-webpack-plugin');



module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
      
        app: [
          'babel-polyfill',
            path.join(__dirname, 'src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'react-dom']
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash:5].js',
        chunkFilename: '[name].[chunkhash:5].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.css$/,
            loaders: ["style-loader", "css-loader", "postcss-loader"]
        }, {
            test: /\.(png|jpg|gif|mp4|rmvb)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
    
        new webpack.HashedModuleIdsPlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),

        //以下为service-worker 配置
        new workboxPlugin.GenerateSW({
          cacheId: 'webpack-pwa', // 设置前缀
          importWorkboxFrom: 'local',
          skipWaiting: true, // 强制等待中的 Service Worker 被激活
          clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
          swDest: 'sw.js', // 输出 Service worker 文件
         
          runtimeCaching: [
            // 配置路由请求缓存
            {
                urlPattern: /.*\.js/, // 匹配文件
                handler: 'cacheFirst' // 缓存优先
            },
            {
              urlPattern: /web-manage/, // 匹配文件
              handler: 'staleWhileRevalidate', // 网络优先
              
              options:{
                fetchOptions: {
                  mode: 'cors',
                  
                },
              }
            },
            {
              urlPattern: /https:\/\/.*\/static\/.*\.(jpg|png|js|css)/, // 匹配文件
              handler: 'cacheFirst',
              
              options:{
                cacheName: 'my-img-name',
                expiration: {
                  maxAgeSeconds: 7 * 24 * 60 * 60,
                  // Only cache 10 requests.
                  maxEntries: 10,
                }
              
              }
             
            }
        ]
        }),



        new UglifyJSPlugin(), //压缩生成文件

       

        new webpack.optimize.CommonsChunkPlugin({
          name: 'runtime'
        }),

        new webpack.DefinePlugin({  //内置 压缩代码  把开发环境的Log 到成产环境后都去掉
          'process.env': {
              'NODE_ENV': JSON.stringify('production')
           }
       }),

       new CleanWebpackPlugin(['dist'])
    ],
  };