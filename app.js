const Koa = require('koa')
const KoaBody = require('koa-body')
const {serverPort} = require('./config/config.json')
const errorHandler = require('./middleware/errorHandler')

const app = new Koa()
const logger = require('./common/logger')(module)

// global error handling
app.use(errorHandler)

// register middlewares
app.use(KoaBody({json: true}))

// register router
const router = require('./router')
app.use(router.routes())
app.use(router.allowedMethods())
logger.info('Server start at http://127.0.0.1: %s', serverPort)
app.listen(serverPort)

