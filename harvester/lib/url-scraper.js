const { chromium } = require('playwright');

module.exports = async (store) => {
  const urls = [];

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // set up loop

  let i = 1;
  let max = 1;

  if (store.paging && store.maxPage) {
    max = store.maxPage;
  }

  for (i; i <= max; i++) {
    // go to page

    await page.goto(store.url.replace('%s', i));

    // get urls

    const found = await page.evaluate((store) => {
      const anchors = document.querySelectorAll(store.urlSelector);

      return Object.values(anchors).map(a => a.href);
    }, store);

    if (found.length) {
      urls.push(...found);
    }
  }

  await browser.close();
  return urls;
};