const webdriver = require('selenium-webdriver');
const local = require('browserstack-local');
const userName = "sjens1";
const accessKey = "3T6jZ9N4pYf9qjzoqKxU"
const browserstackURL = `https://${userName}:${accessKey}@hub-cloud.browserstack.com/wd/hub`;

// creates an instance of Local
const bs_local = new local.Local();
const bs_local_args = { key: accessKey, onlyAutomate: true, forceLocal: true };

// starts the Local instance with the required arguments
new Promise(() => {
  bs_local.stop(function() {
    console.log("Stopped BrowserStackLocal");
  });
});
new Promise((resolve, reject) => {
    bs_local.start(bs_local_args, (error)=> {
      console.log('Local started');
      if (error) {
        reject(error);
      }
      resolve(bs_local);
    });
  });

// Input capabilities
const safari = {
  'os' : 'OS X',
  'os_version' : 'High Sierra',
  'browserName' : 'Safari',
  'browser_version' : '11.1',
  "browserstack.local" : "true",
  'browserstack.console': "errors",
  'name' : "Vergunningcheck safari"
}

const ie = {
  'os' : 'Windows',
  'os_version' : '10',
  'browserName' : 'IE',
  'browser_version' : '11.0',
  'browserstack.local': "true",
  'browserstack.console': "errors",
  'name' : "Vergunningcheck IE"
}

const driverSafari = new webdriver.Builder().
usingServer(browserstackURL).
withCapabilities(safari).
build();

const driverIe = new webdriver.Builder().
usingServer(browserstackURL).
withCapabilities(ie).
build();

searchTest(driverSafari);
searchTest(driverIe);

function searchTest(driver) {
  driver.get('http://localhost:3000/dakkapel-plaatsen/').then(() => {
    driver.findElement(webdriver.By.css("[data-testid=next-button]")).click();
    driver.findElement(webdriver.By.name('sq')).sendKeys('BrowserStack');
  });
}