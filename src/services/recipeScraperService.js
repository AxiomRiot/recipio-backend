const { urlScraperMap } = require('../config/config');

const getScraperForUrl = (hostname) => {
  
  console.log(`Received scrape request for site: ${hostname}`);
  return urlScraperMap[hostname] || null;
}

const getRecipe = async (url) => {

  const hostname = new URL(url).hostname;
  const scraper = getScraperForUrl(hostname);

  if(!scraper) {
    throw new Error(`No scraper found for url: ${url}`);
  }

  console.log(`${hostname} is supported, parsing website for recipe data`);

  return await scraper(url);
}

module.exports = {
  getRecipe
}
