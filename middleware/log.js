const winston = require('winston');
const expressWinston = require('express-winston');

const { format } = winston;
const { combine, label, prettyPrint } = format;

const sucFile = new winston.transports.File({
  filename: 'logs/success.log',
});

const errFile = new winston.transports.File({
  filename: 'logs/error.log',
});

const transports = [new winston.transports.Console()];

exports.logger = expressWinston.logger({
  format: combine(label({ label: 'category one' }), prettyPrint()),
  transports,
});
exports.error = expressWinston.errorLogger({
  format: combine(label({ label: 'category one' }), prettyPrint()),
  transports,
});
