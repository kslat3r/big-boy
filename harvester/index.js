const stores = require('big-boy-stores');
const urlScraper = require('./lib/url-scraper');
const productScraper = require('./lib/product-scraper');

(async () => {
  await stores.forEach(async store => {
    try {
      store.urls = await urlScraper(store);
    } catch (e) {
      throw e;
    }

    store.products = [];
    
    await store.urls.forEach(async url => {
      let product;

      try {
        product = await productScraper(url);
      } catch (e) {
        throw e;
      }

      store.products.push(product);
    });
    
    console.log(store);
  });
})();