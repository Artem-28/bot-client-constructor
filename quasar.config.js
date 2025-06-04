const { configure } = require('quasar/wrappers');
const path = require('path');

module.exports = configure(function(/* ctx */) {
  return {
    boot: [
      'i18n',
      'axios',
      'form-rules',
      'check-permission',
    ],
    css: [
      'app.scss',
    ],
    extras: [
      'roboto-font',
      'material-icons',
    ],
    build: {
      env: {
        API_URL: 'http://localhost:8088',
      },
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node20',
      },
      vueRouterMode: 'history',
      vitePlugins: [
        ['@intlify/vite-plugin-vue-i18n', {
          include: path.resolve(__dirname, './src/i18n/**'),
        }],
        ['vite-plugin-checker', {
          eslint: {
            lintCommand: 'eslint "./**/*.{js,mjs,cjs,vue}"',
          },
        }, { server: false }],
      ],
      extendViteConf(viteConf) {
        viteConf.resolve = viteConf.resolve || {};
        viteConf.resolve.extensions = ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'];
      },
    },
    devServer: {
      port: 8088,
      open: false,
      proxy: {
        '/api': {
          target: 'http://bot_app_server:3000',
          changeOrigin: true,
        },
      },
    },
    framework: {
      plugins: [
        'Notify',
      ],
      config: {
        notify: {},
      },
    },
    animations: [],
    ssr: {
      pwa: false,
      prodPort: 3000,
      middlewares: [
        'render',
      ],
    },
    pwa: {
      workboxMode: 'generateSW',
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,
    },
    cordova: {},
    capacitor: {
      hideSplashscreen: true,
    },
    electron: {
      inspectPort: 5858,
      bundler: 'packager',
      packager: {
      },
      builder: {
        appId: 'app-client-constructor',
      },
    },
    bex: {
      contentScripts: [
        'my-content-script',
      ],
    },
  };
});
