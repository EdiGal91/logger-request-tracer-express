const express = require('express')
const rTracer = require('cls-rtracer')

const Logger = require('./logger')
const severityEnum = require('./logger/severity.enum')

const SECOND = 1000;
const FIVE_SECONDS = 5*SECOND;

const logger = new Logger(console.log, severityEnum, rTracer)
const app = express()

app.use(rTracer.expressMiddleware())

app.get('/test/:num', async (req, res) => {
    const { num } = req.params
    logger.info(`starting request for ${num}`)
    const result = await asyncSquare(num)
    logger.info(`Square of ${num} is ${result}`)
    res.json(result)
})

function asyncSquare (num) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num**2)
        }, FIVE_SECONDS)
    })
}


const { PORT:port=3000 } = process.env
app.listen(port, (err) => {
  if (err) {
    logger.info('ERROR: The app could not start')
  }
  logger.info(`The app is listening on port ${port}`)
})
