const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../utils/loggers');
const downloadImage = require('../utils/image');

async function scrapeWebsite(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const title = $('.wprm-recipe-name').text();
    const description = $('.wprm-recipe-summary').text();
    const servings = $('.wprm-recipe-servings').text();

    const duration = {
      days: $('.wprm-recipe-total_time-days').text(),
      hours: $('.wprm-recipe-total_time-hours').text(),
      minutes: $('.wprm-recipe-total_time-minutes').text()
    }

    const imageUrl = $('.wprm-recipe-image img').attr('data-lazy-src');
    const image = await downloadImage(imageUrl, url);

    const recipe = {
      title,
      description,
      servings,
      duration,
      url,
      ingredients : [],
      steps: [],
      image
    };

    $('ul.wprm-recipe-ingredients li').each((i, elem) => {
      recipe.ingredients.push($(elem).text().slice(2));
    });

    $('.wprm-recipe-instruction-text').each((i, elem) => {
      recipe.steps.push($(elem).text());
    });

    return recipe;

  } catch ( error ) {
    logger.error(error);
  }
}

module.exports = scrapeWebsite

