const path = require('path');
const { set } = require('lodash');

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('worker')
      .test(/\.worker\.js$/)
      .use('worker-loader/loader')
        .loader('worker-loader/loader')
        .end()
  },
  configureWebpack: config => {
    set(config, 'optimization.minimize', false);
    // Fixes issue with script in the Web Worker crash while trying to get/set window global
    set(config, 'output.globalObject', 'this');
  },
  pluginOptions:{
    env: {
      BUILD_TIME: Date.now(),
    },
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/scope.scss'),
      ]
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales'
    }
  }
};
