const stores = require('./stores');
const urlScraper = require('./lib/url-scraper');
const sleep = require('./lib/sleep');
const productScraper = require('./lib/product-scraper');
const writer = require('./lib/writer');

(async () => {
  process.once('SIGINT', async () => {
    await writer(stores);
  });
  
  await stores.forEach(async store => {
    try {
      store.urls = await urlScraper(store);
    } catch (e) {
      throw e;
    }

    store.products = [];
  
    for (url of store.urls) {
      let product;

      try {
        [product] = await Promise.all([
          productScraper(url, store),
          sleep(30)
        ]);
      } catch (e) {
        console.log(e);
      }

      store.products.push(product);
    }
  });

  try {
    await writer(stores);
  } catch (e) {
    throw e;
  }
})();