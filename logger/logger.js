const express = require('express');
const app = express();
const expressWinston = require('express-winston');
const { createLogger, transports, format } = require('winston');

require('winston-mongodb')

const logger = createLogger({
    transports:[

    new transports.Console(),
    new transports.File({
        level: 'error',
        filename: 'logsWarning.log'
    }),
    new transports.File({
        level: 'warn',
        filename: 'logsWarning.log'
    }),
    new transports.File({
        level: 'info',
        filename: 'logsWarning.log'
    }),
    new transports.MongoDB({
        db: process.env.CONNECTION_STRING,
        collection: 'Logs'
    })
],
  format: 
         format.combine(
            format.json(),
            format.prettyPrint(),
            format.timestamp(),
            format.metadata()
         ),
         statusLevels: true
})

module.exports = logger;