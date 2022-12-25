const express = require('express');
const app = express();
const expressWinston = require('express-winston');
const { transports, format, level } = require('winston');

const myFormat = format.printf( ({level, meta, timestamp}) => {
    return `${timestamp} ${level}: ${meta.message}`
})

app.use(expressWinston.errorLogger({
    transports: [
        new transports.File({
            filename: 'logsInternalErrors.log'
        })
    ],
    format: format.combine(
        format.json(),
        format.timestamp,
        myFormat
    )
}))

module.exports = loggerErr;