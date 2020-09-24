import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://vergunningcheck.amsterdam.nl/test");
  await page.screenshot({ path: "build/example.png" });

  await browser.close();
})();
