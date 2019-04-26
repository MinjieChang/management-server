const winston = require('winston');

const { combine, printf } = winston.format;
const myCustomLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 4,
  },
  colors: {
    debug: 'blue',
    info: 'green',
    warn: 'yellow',
    error: 'red',
  },
};
winston.addColors(myCustomLevels.colors);

const myFormat = printf(
  ({ level, message, label, timestamp }) =>
    `\r\n{time: ${timestamp}, label: [${label}], ${level}: ${message}}\r\n`,
);

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    winston.format.label({ label: 'right meow!' }),
    winston.format.timestamp(),
    myFormat,
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = logger;
