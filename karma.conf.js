const FILES = [
  'intl-format-cache',
  'intl-locales-supported',
  'intl-messageformat',
  'intl-relativeformat'
].map(pkg => `./tests/functional/${pkg}.js`)
module.exports = function(config) {
    config.set({
      frameworks: ['mocha', 'chai'],
      files: FILES,
      reporters: ['progress'],
      port: 9876,  // karma web server port
      colors: true,
      logLevel: config.LOG_INFO,
      browsers: ['ChromeHeadless'],
      autoWatch: false,
      singleRun: true,
      concurrency: Infinity
    })
  }