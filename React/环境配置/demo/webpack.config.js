var webpack = require('webpack'); 
var path = require('path');                 //引入node的path库
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;


var env = process.env.WEBPACK_ENV;//区分开发模式和发布模式
var outputFile;
var plugins = [
  new HtmlWebpackPlugin({
      title: 'React Biolerplate by Linghucong',
      template: path.resolve(__dirname, 'templates/index.ejs'),
      inject: 'body'
    })
  ];

if (env === 'build') {
  var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = 'bundle.min.js';
} else {  
  outputFile = 'bundle.js';
}

var config = {
  entry: ['./app/index.js'],                //入口文件
  output: {
    path: path.resolve(__dirname, 'dist'),  // 指定编译后的代码位置为 dist/bundle.js
    filename: outputFile
  },
  module: {
    loaders: [
      // 为webpack指定loaders
      //{ test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      {
        test: /\.less$/,
         loaders: ['style', 'css', 'less'],
         include: path.resolve(__dirname, 'app')
      },
      { 
        test: /\.jsx?$/, 
        loader: 'babel', 
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015'] 
        }
      } 
    ]
  },
  /*
  plugins: [
  
    new HtmlWebpackPlugin({
      title: 'React Biolerplate by Linghucong',
      template:path.resolve(__dirname, 'templates/index.ejs'),
      inject:"body"
    }),
    //new UglifyJsPlugin({ minimize: true }) 压缩生成的文件
  ]*/
  plugins:plugins
  ,
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3000',
    './app/index.js'      //入口文件
    ],  
   devtool: 'source-map',
}

module.exports = config;