const { createLogger, format, transports } = require('winston')
const loggingConfig = require('../config/config').logging

function getLabel(callingModule) {
  let parts = callingModule.filename.split('/');
  return parts.pop();
}

module.exports = function(callingModule, config) {
  const name = (callingModule instanceof String && callingModule) || getLabel(callingModule)
  const myFormat = format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${name}] ${level}: ${message}`
  })
  
  const logger = createLogger({
    level: (config && config.level) || 'info',
    format: format.combine(
      format.simple(),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.errors({ stack: true })
    ),
    defaultMeta: { service: name },
    transports: [
      new transports.File({ filename: `${loggingConfig.pathPrefix}-error.log`, level: 'error' }),
      new transports.File({ filename: `${loggingConfig.pathPrefix}-info.log` })
    ]
  })

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
      format: format.combine(
        format.simple(),
        format.colorize()
      )
    }));
  }
  return logger
}