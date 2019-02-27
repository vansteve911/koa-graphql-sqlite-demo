const router = require('koa-router')({prefix: '/api'})

const {apiResult} = require('./common/util')// .apiResult
const userService = require('./service/userService')

router.get('/', (ctx, next) => {
	ctx.body = 'hello world'
})
router.post('/register', (ctx, next) => {
	let regInfo = ctx.request.body
	ctx.body = apiResult(userService.register(regInfo))
})

module.exports = router