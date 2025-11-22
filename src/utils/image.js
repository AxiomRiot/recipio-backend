const axios = require('axios');
const logger = require('./loggers');

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

async function downloadImage(imageUrl, url) {
  try {

    if (!isValidUrl(imageUrl)) {
      throw new Error(`Invalid URL provided for image download: ${imageUrl}`);
    }

    // second param is optional — validate only if provided
    if (url && !isValidUrl(url)) {
      throw new Error(`Invalid referer URL provided for image download: ${url}`);
    }

    logger.info(`Downloading image from src: ${imageUrl}`);

    const response = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'arraybuffer',
      validateStatus: null, // we'll handle status explicitly
    });

    if (!response || response.status !== 200) {
      throw new Error(`Image download failed. status=${response && response.status}`);
    }

    const buffer = Buffer.from(response.data, 'binary');
    const contentType = response.headers['content-type'] || 'image/jpeg';
    const base64Image = buffer.toString('base64');

    // Return a proper data URI the frontend can use directly in an <img src="...">
    return `data:${contentType};base64,${base64Image}`;
  } catch (e) {
    logger.error(`Failed to download image: ${e.message || e}`);
    throw e; // bubble error up so caller can handle it
  }
}

module.exports = downloadImage;