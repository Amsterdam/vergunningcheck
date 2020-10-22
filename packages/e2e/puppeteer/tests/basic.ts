import puppeteer from "puppeteer";
import { host } from "../config";

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
