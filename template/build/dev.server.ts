process.env.NODE_ENV = 'development'
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import minimist from 'minimist';
import webpackConfig from './webpack.dev.config';
import openInEditor from 'launch-editor-middleware'
const compiler = webpack(webpackConfig);
const parseArgv = minimist(process.argv.slice(2));
const moduleName = parseArgv.module;
const devServerOptions = {...webpackConfig.devServer, open: moduleName || true};

const localServer = new WebpackDevServer({
  ...devServerOptions,
  open: moduleName || true,
  setupMiddlewares(setupMiddlewares, {app}) {
    app?.use('/__open-in-editor', openInEditor('code'));
    return setupMiddlewares
  },
}, compiler);

localServer.start()


