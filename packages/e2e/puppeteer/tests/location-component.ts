import { expect } from 'chai';
import puppeteer from "puppeteer";
import { flows, host, puppeteerOptions } from "../config";
import { FlowOptions } from "../types";
import { random } from 'vergunningcheck-mocking/src/util';
import { getFixturesByProperties, NO_MONUMENT, NO_CITY_SCAPE } from 'vergunningcheck-mocking/src/restriction';

const addresses = getFixturesByProperties([NO_MONUMENT, NO_CITY_SCAPE]);
export const address = random(addresses);
if (!address) {
  throw new Error('address not found');
}

// @TODO actually click in dropdown
// await page.type('[name="houseNumberFull"]', '19');
// await page.click('[data-testid="suggestList"] a');

const testFlow = async (page: puppeteer.Page, options: FlowOptions) => {

  await page.waitForSelector('[data-testid="next-button"]');
  await page.click('[data-testid="next-button"]');

  await page.waitForSelector('[name="postalCode"]');
  await page.type('[name="postalCode"]', address[0]);
  await page.type('[name="houseNumberFull"]', address[1].toString());

  await page.waitForSelector('[data-testid="location-found"]', { visible: true });

  if (options.shouldAlwaysDisplayMonumentStatus) {
    const monument = await page.$eval('[data-testid="restriction-monument"]', el => el.textContent);
    expect(monument).to.include('Het gebouw is geen monument.');

    const cityscape = await page.$eval('[data-testid="restriction-cityscape"]', el => el.textContent);
    expect(cityscape).to.include('Het gebouw ligt niet in een beschermd stads- of dorpsgezicht.');
  } else {
    expect((await page.$$('[data-testid="restriction-monument"]')).length).to.equal(0);
    expect((await page.$$('[data-testid="restriction-cityscape"]')).length).to.equal(0);
  }
}

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
  })
})
