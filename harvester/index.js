const stores = require('big-boy-stores');
const urlScraper = require('./lib/scrapers/url');
const productScraper = require('./lib/scrapers/product');
const sizeFilter = require('./lib/filters/size');

(async () => {
  await stores.forEach(async store => {
    try {
      store.urls = await urlScraper(store);
    } catch (e) {
      throw e;
    }

    store.products = {
      all: [],
      filtered: []
    };
    
    await store.urls.forEach(async url => {
      let product;

      try {
        product = await productScraper(url);
      } catch (e) {
        throw e;
      }

      store.products.all.push(product);

      if (sizeFilter(product, store)) {
        store.products.filtered.push(product); 
      }
    });
    
    console.log(store);
  });
})();