const app = require('./app')
const logger = require('./utils/loggers');

const port = process.env.PORT;

app.listen(port, () => {
  logger.info(`Server is up on port ${port}`);
});