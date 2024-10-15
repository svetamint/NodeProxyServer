import express, { Express } from 'express'
import nunjucks from 'nunjucks'
import config from './task9/config/config'
import meteorRouter from './task9/delivery/meteorController'
import errorHandler from './task9/exception/errorHandler'

const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(meteorRouter)

app.use(errorHandler)

nunjucks.configure('views', {
  autoescape: true,
  express: app
})

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`)
})
