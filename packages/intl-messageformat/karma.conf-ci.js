module.exports = function (config) {
    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
      console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.')
      process.exit(1)
    }
  
    // Browsers to run on Sauce Labs
    // Check out https://saucelabs.com/platforms for all browser/OS combos
    const customLaunchers = {
        sl_safari: {
            base: 'SauceLabs',
            browserName: 'safari',
            version: '12'
        },
        sl_edge: {
            base: 'SauceLabs',
            browserName: 'edge',
            platform: 'Windows 10',
            version: '16'
        },
      sl_chrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'Windows 10',
        version: '74'
      },
      sl_firefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: '67'
      },
      sl_ie_11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 10',
        version: '11'
      }
    };
  
    config.set({
      basePath: '',
      frameworks: ['mocha', 'chai'],
      files: [
        'test/browser.js'
      ],
      reporters: ['progress', 'saucelabs'],
      port: 9876,
      colors: true,
      sauceLabs: {
        testName: 'intl-messageformat',
        recordScreenshots: false,
        connectOptions: {
          port: 5757,
          logfile: 'sauce_connect.log'
        },
        public: 'public'
      },
      // Increase timeout in case connection in CI is slow
      captureTimeout: 120000,
      customLaunchers: customLaunchers,
      browsers: Object.keys(customLaunchers),
      singleRun: true
    })
  };