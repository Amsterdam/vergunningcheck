const webdriver = require('selenium-webdriver');

const userName = "sjens1";
const accessKey = "3T6jZ9N4pYf9qjzoqKxU"
const browserstackURL = `https://${userName}:${accessKey}@hub-cloud.browserstack.com/wd/hub`;

// Input capabilities
const safari = {
  'os' : 'OS X',
  'os_version' : 'High Sierra',
  'browserName' : 'Safari',
  'browser_version' : '11.1',
  'name' : "sjens1's First Test"
}

const ie = {
  'os' : 'Windows',
  'os_version' : '10',
  'browserName' : 'IE',
  'browser_version' : '11.0',
  'name' : "sjens1's First Test"
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
    driver.get('http://www.google.com').then(() => {
      driver.findElement(webdriver.By.name('sq')).sendKeys('BrowserStack').then(() => {
        driver.getTitle().then((title) => {
          console.log(title);
          driver.quit();
        });
      });
    });
}