import puppeteer from "puppeteer";

const host = require("../../host");

const path = "build/example.png";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(host);
  console.log("done rendering chappie");
  await page.screenshot({ path });
  console.log("saved screenshot in ", path);

  await browser.close();
})();
