const { chromium } = require('playwright');
const { expect } = require('@playwright/test');

module.exports = async (url, store) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // go to page

  await page.goto(url);

  // load

  const locator = page.locator(store.imgSelector);

  try {
    await expect(locator).toBeVisible({ timeout: 60000 });
  } catch (e) {
    throw e;
  }

  // get image url

  const imgUrl = await page.evaluate((store) => {
    const img = document.querySelector(store.imgSelector)

    if (img && img.src) {
      return img.src;
    }

    return undefined;
  }, store);
  
  // get sizes

  const sizes = await page.evaluate((store) => {
    const options = document.querySelectorAll(store.sizesSelector);

    return Object.values(options).map(option => store.sizesMap[option.innerHTML.replace('\n', '').trim()]);
  }, store);

  await browser.close();
  return { url, imgUrl, sizes };
};