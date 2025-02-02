const { urlScraperMap } = require('../config/config');
const logger = require('../utils/loggers');

const getScraperForUrl = (hostname) => {
  
  logger.info(`Received scrape request for site: ${hostname}`);
  return urlScraperMap[hostname] || null;
}

const getRecipe = async (url) => {

  const hostname = new URL(url).hostname;
  const scraper = getScraperForUrl(hostname);

  if(!scraper) {
    throw new Error(`No scraper found for url: ${url}`);
  }

  logger.info(`${hostname} is supported, parsing website for recipe data`);

  return await scraper(url);
}

module.exports = {
  getRecipe
}
