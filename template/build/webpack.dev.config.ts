import baseWebpackConfig from './webpack.base.config';
import { merge } from 'webpack-merge';
import webpack, { Compiler, WebpackPluginInstance } from 'webpack';
import config from '../config';
const plugins: (
  | ((this: Compiler, compiler: Compiler) => void)
  | WebpackPluginInstance
)[] = []

const webpackConfig: webpack.Configuration = merge(baseWebpackConfig, {
  devtool: config.dev.devtool,
  devServer: {
    port: 8080,
    historyApiFallback: true
  },
  mode: 'development',
  plugins
});

export default webpackConfig;