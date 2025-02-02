const winston = require('winston');
const { combine, timestamp, printf } = winston.format

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    winston.format.colorize(),
    timestamp({format: 'YYYY-MM-DD HH:mm:ss', colorize: true}),
    printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console()
  ]
});

module.exports = logger;