const browserstack = require('browserstack-local');

nightwatch_config = {
  src_folders : [ "nightwatch/tests" ],

  selenium : {
    "start_process" : false,
    "host" : "hub-cloud.browserstack.com",
    "port" : 80
  },

  common_capabilities: {
    'build': 'nightwatch-browserstack',
    'browserstack.user': 'sjens1',
    'browserstack.key': '3T6jZ9N4pYf9qjzoqKxU',
    'browserstack.debug': false,
    'browserstack.local': true
  },

  test_settings: {
    default: {},
    chrome: {
      desiredCapabilities: {
        browser: "chrome"
      }
    },
    firefox: {
      desiredCapabilities: {
        browser: "firefox"
      }
    },
    safari: {
      desiredCapabilities: {
        browser: "safari",
        osVersion: "Catalina",
        browserVersion: "13.0"
      }
    },
    ie: {
      desiredCapabilities: {
        browser: "ie"
      }
    }
  }
};

// Code to support common capabilites
for(let i in nightwatch_config.test_settings){
  const config = nightwatch_config.test_settings[i];
  config['selenium_host'] = nightwatch_config.selenium.host;
  config['selenium_port'] = nightwatch_config.selenium.port;
  config['desiredCapabilities'] = config['desiredCapabilities'] || {};
  for(let j in nightwatch_config.common_capabilities){
    config['desiredCapabilities'][j] = config['desiredCapabilities'][j] || nightwatch_config.common_capabilities[j];
  }
}

module.exports = nightwatch_config;