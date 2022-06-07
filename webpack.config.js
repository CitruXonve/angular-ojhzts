const webpack = require('webpack');

module.exports = {
  module: {
    rules: [{
      test: /\.m?js$/,
      /**
       * Exclude `node_modules` except the ones that need transpiling for IE11 compatibility.
       * Run `$ npx are-you-es5 check . -r` to get a list of those modules.
       */
      exclude: /[\\/]node_modules[\\/](?!(incompatible-module1|incompatible_module_2|some_other_nested_module)[\\/])/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env', {
                targets: {
                  // Criteria for selecting browsers. See https://github.com/browserslist/browserslist
                  browsers: ['> 0.5%', ' last 2 versions', ' Firefox ESR', ' not dead', ' IE 11']
                }
              }
            ]
          ]
        }
      }
    }]
  }
};