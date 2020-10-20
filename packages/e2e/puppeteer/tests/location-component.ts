import { expect } from "chai";
import puppeteer from "puppeteer";
import { flows, host, puppeteerOptions } from "../config";
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
  // IMTR Flow has an Intro page
  if (!options.shouldAlwaysDisplayRestrictions) {
    await page.waitForSelector('[data-testid="next-button"]');
    await page.click('[data-testid="next-button"]');
  }

  await page.waitForSelector('[name="postalCode"]');
  await page.type('[name="postalCode"]', randomAddress[0]);
  await page.type('[name="houseNumberFull"]', randomAddress[1].toString());

  await page.waitForSelector('[data-testid="location-found"]', {
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
// await page.type('[name="houseNumberFull"]', '19');
// await page.click('[data-testid="suggestList"] a');

// Test with multipe addresses the visiblity of the restrictions on the page
const testRestrictions = async (
  page: puppeteer.Page,
  options: FlowOptions,
  address: any
) => {
  await page.waitForSelector('[data-testid="next-button"]');
  await page.click('[data-testid="next-button"]');

  await page.waitForSelector('[name="postalCode"]');
  await page.type('[name="postalCode"]', address[0]);
  await page.type('[name="houseNumberFull"]', address[1].toString());

  await page.waitForSelector('[data-testid="location-found"]', {
    visible: true,
  });

  const properties = address[2];

  // OLO FLOW:
  if (options.shouldAlwaysDisplayRestrictions) {
    const monument = await page.$eval(
      '[data-testid="restriction-monument"]',
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
      '[data-testid="restriction-cityscape"]',
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
      expect(
        (await page.$$('[data-testid="restriction-monument"]')).length
      ).to.equal(1);
    } else {
      expect(
        (await page.$$('[data-testid="restriction-monument"]')).length
      ).to.equal(0);
    }

    if (
      properties.includes(NATIONAL_CITY_SCAPE) ||
      properties.includes(MUNICIPAL_CITY_SCAPE)
    ) {
      expect(
        (await page.$$('[data-testid="restriction-cityscape"]')).length
      ).to.equal(1);
    } else {
      expect(
        (await page.$$('[data-testid="restriction-cityscape"]')).length
      ).to.equal(0);
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
