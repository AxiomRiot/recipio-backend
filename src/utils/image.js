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

    if (!isValidUrl(url)) {
      throw new Error(`Invalid URL provided for image download: ${url}`);
    }

    const absoluteImageUrl = isValidUrl(imageUrl) ? imageUrl : new URL(imageUrl, baseUrl).href;

    logger.info(`Downloading image from src: ${absoluteImageUrl}`);

    const response = await axios({
      url: absoluteImageUrl,
      method: 'GET',
      responseType: 'arraybuffer',
    });

    const buffer = Buffer.from(response.data);
    const base64Image = buffer.toString('base64'); // Convert buffer to Base64 string

    return base64Image;
  } catch (e) {
    logger.error(`Failed to download image: ${e}`);
  }
}

module.exports = downloadImage;