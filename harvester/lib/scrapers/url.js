const { chromium } = require('playwright');

module.exports = async (store) => {
  let urls = [];

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

    const urlSelector = store.urlSelector;
    const found = await page.evaluate(async () => {
      const anchors = document.querySelectorAll(urlSelector);
      console.log(anchors);

      return anchors;

      // return anchors.map(a => a.href);
    });

    console.log(found);
  }


  

  await browser.close();
  return urls;
};