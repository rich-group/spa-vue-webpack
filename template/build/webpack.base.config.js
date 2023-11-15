import { VueLoaderPlugin } from 'vue-loader';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackBar from 'webpackbar';
import path from 'path';
import config from '../config';
import loaders from './vue-loader.config';

const { ModuleFederationPlugin } = webpack.container;

const devMode = process.env.NODE_ENV !== 'production';


const baseConfig = {
  experiments: {
    // asyncWebAssembly: true,
    // layers: true,
    // lazyCompilation: true,
    // outputModule: true,
    // syncWebAssembly: true,
    topLevelAwait: true, // 能够在顶层使用await, 方便es6动态导入(仅支持webpack5)
  },
  entry: {
    main: '@/main.ts',
    vendor: ['vue'],
  },
  target: 'web',
  output: {
    path: config.build.assetsRoot,
    filename: '[name]-[contenthash].js',
    publicPath: devMode
      ? config.dev.assetsPublicPath
      : config.build.assetsPublicPath,
    clean: true                     // webpack5不需要clean-webpack-plugin，会自动追踪新增、删除、修改的文件
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.ts', '.tsx'],
    // 别名配置，需要同步tsconfig.json中paths字段
    alias: {
      'vue': '@vue/runtime-dom',
      '@utils': '/utils',         // 每当引模块的时候，它会直接从映射的路径引入而不需要按模块的查找规则查找, 加快 webpack 查找模块的速度
      '@': '/src',
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.m?(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-syntax-top-level-await'],
              cacheDirectory: true // 自动babel缓存
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'url-loader',
      },
      ...loaders
    ]
  },
  plugins: [
    new WebpackBar({}),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      // 'process.env': JSON.stringify(Object.assign({}, config.build.env, {language})),
      'process.env': JSON.stringify(config.build.env)
    }),
    new webpack.ProvidePlugin({
      $API: [path.resolve(__dirname, '../src/apis'), 'default'],
      createStore: [path.resolve(__dirname, '../src/utils/reactive'), 'createStore']
    }),
    new ModuleFederationPlugin({
      name: 'remote_activities',
      exposes: {},
      shared: {}
    }),
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      template: './src/index.html', 
      filename: 'index.html',
      app: '<div id="app"></div>',
      hash: true
    })
  ]
};


export default baseConfig;