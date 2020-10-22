import { expect } from "chai";
import puppeteer from "puppeteer";
import { flows, puppeteerOptions } from "../config";
import { FlowOptions } from "../types";
import { random } from "vergunningcheck-mocking/src/util";
import {
  getFixturesByProperties,
  NO_MONUMENT,
  NATIONAL_MONUMENT,
  MUNICIPAL_MONUMENT,
  NO_CITY_SCAPE,
  MUNICIPAL_CITY_SCAPE,
  NATIONAL_CITY_SCAPE,
  uniqueFixtures,
} from "vergunningcheck-mocking/src/restriction";

const selectors = require("../../selectors");
const host = require("../../host");

const {
  locationFound,
  locationHouseNumberFull,
  locationPostalCode,
  locationRestrictionCityScape,
  locationRestrictionMonument,
  navButtonNext,
} = selectors;

// Disable the warning "MaxListenersExceededWarning: Possible EventEmitter memory leak detected"
// See: https://github.com/puppeteer/puppeteer/issues/594
process.setMaxListeners(Infinity);

// Test the flow with a random address to see if all checkers are working
const addresses = getFixturesByProperties([NO_MONUMENT, NO_CITY_SCAPE]);
export const randomAddress = random(addresses);
if (!randomAddress) {
  throw new Error("address not found");
}
const testFlow = async (page: puppeteer.Page, options: FlowOptions) => {
  // Because the IMTR Flow has an Intro page, we need click on the nextButton twice
  if (!options.shouldAlwaysDisplayRestrictions) {
    await page.waitForSelector(navButtonNext);
    await page.click(navButtonNext);
  }

  await page.waitForSelector(locationPostalCode);
  await page.type(locationPostalCode, randomAddress[0]);
  await page.type(locationHouseNumberFull, randomAddress[1].toString());

  await page.waitForSelector(locationFound, {
    visible: true,
  });
};

flows.forEach(async (flow) => {
  flow.checkers.forEach(async (url) => {
    const browser = await puppeteer.launch(puppeteerOptions);
    try {
      const page = await browser.newPage();
      await page.goto(`${host}/${url}`);
      await testFlow(page, flow.options);
    } catch (e) {
      console.error(e);
    } finally {
      await browser.close();
    }
  });
});

// @TODO actually click in dropdown
// await page.type(locationHouseNumberFull, '19');
// await page.click('[data-testid="suggestList"] a');

// Test with multipe addresses the visiblity of the restrictions on the page
const testRestrictions = async (
  page: puppeteer.Page,
  options: FlowOptions,
  address: any
) => {
  await page.waitForSelector(navButtonNext);
  await page.click(navButtonNext);

  await page.waitForSelector(locationPostalCode);
  await page.type(locationPostalCode, address[0]);
  await page.type(locationHouseNumberFull, address[1].toString());

  await page.waitForSelector(locationFound, {
    visible: true,
  });

  const properties = address[2];

  // OLO FLOW:
  if (options.shouldAlwaysDisplayRestrictions) {
    const monument = await page.$eval(
      locationRestrictionMonument,
      (el) => el.textContent
    );
    if (properties.includes(NATIONAL_MONUMENT)) {
      expect(monument).to.include("Het gebouw is een rijksmonument.");
    } else if (properties.includes(MUNICIPAL_MONUMENT)) {
      expect(monument).to.include("Het gebouw is een gemeentelijk monument.");
    } else {
      expect(monument).to.include("Het gebouw is geen monument.");
    }

    const cityscape = await page.$eval(
      locationRestrictionCityScape,
      (el) => el.textContent
    );
    if (properties.includes(NATIONAL_CITY_SCAPE)) {
      expect(cityscape).to.include(
        "Het gebouw ligt in een rijksbeschermd stads- of dorpsgezicht."
      );
    } else if (properties.includes(MUNICIPAL_CITY_SCAPE)) {
      expect(cityscape).to.include(
        "Het gebouw ligt in een gemeentelijk beschermd stads- of dorpsgezicht."
      );
    } else {
      expect(cityscape).to.include(
        "Het gebouw ligt niet in een beschermd stads- of dorpsgezicht."
      );
    }
  } else {
    // IMTR FLOW:
    if (
      properties.includes(NATIONAL_MONUMENT) ||
      properties.includes(MUNICIPAL_MONUMENT)
    ) {
      expect((await page.$$(locationRestrictionMonument)).length).to.equal(1);
    } else {
      expect((await page.$$(locationRestrictionMonument)).length).to.equal(0);
    }

    if (
      properties.includes(NATIONAL_CITY_SCAPE) ||
      properties.includes(MUNICIPAL_CITY_SCAPE)
    ) {
      expect((await page.$$(locationRestrictionCityScape)).length).to.equal(1);
    } else {
      expect((await page.$$(locationRestrictionCityScape)).length).to.equal(0);
    }
  }
};

uniqueFixtures.forEach(async (address) => {
  flows.forEach(async (flow) => {
    // Only test a random checker from the flow
    const url = random(flow.checkers);
    const browser = await puppeteer.launch(puppeteerOptions);
    console.log(
      `Start test: are the correct restrictions displayed for address "${address[0]}" on ${url}`
    );
    try {
      const page = await browser.newPage();
      await page.goto(`${host}/${url}`);
      await testRestrictions(page, flow.options, address);
    } catch (e) {
      console.error(e);
    } finally {
      console.log(`Finished test: "${address[0]}" on ${url}`);
      await browser.close();
    }
  });
});
