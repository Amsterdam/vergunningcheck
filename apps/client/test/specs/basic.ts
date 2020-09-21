describe("webdriver.io page", () => {
  it("should have the right title", async () => {
    const x = await browser.url("https://webdriver.io");
    console.log(x);
    await expect(browser).toHaveTitle(
      "WebdriverIO · xt-gen browser and mobile automation test framework for Node.js"
    );
  });
});
