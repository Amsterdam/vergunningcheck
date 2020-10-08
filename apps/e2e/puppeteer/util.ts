import puppeteer from "puppeteer";
import mkdirp from "mkdirp";

const folder = `build/${new Date()}`;

(async () => {
  await mkdirp(folder);
})();

export const screenshot = async (page: puppeteer.Page) => {
  const path = `${folder}/${new Date()}.png`;
  await page.screenshot({ path });
  console.log('saved screenshot in ', path);
}
