const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8300/'
  },
  devServer: {
      port: 8300,
      historyApiFallback: {
          index: 'index.html',
      },
  },
  plugins: [
 
      new ModuleFederationPlugin({

         name: 'container',
         remotes: {
             marketing: 'marketing@http://localhost:8310/remoteEntry.js',
             auth: 'auth@http://localhost:8315/remoteEntry.js',
             dashboard: 'dashboard@http://localhost:8320/remoteEntry.js',
         },

         shared: packageJson.dependencies,

         /*shared: [
             'react',
             'react-dom'
         ]*/

      }),
      
  ]
};

module.exports = merge( commonConfig, devConfig);