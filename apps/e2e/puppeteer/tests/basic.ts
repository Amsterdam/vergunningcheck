import puppeteer from "puppeteer";

const path = "build/example.png";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://vergunningcheck.amsterdam.nl/test");
  console.log('done rendering chappie')
  await page.screenshot({ path });
  console.log('saved screenshot in ', path)

  await browser.close();
})();
