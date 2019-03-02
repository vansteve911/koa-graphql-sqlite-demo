const router = require('koa-router')({prefix: '/api'})

const {apiResult} = require('./common/util')// .apiResult
const userService = require('./service/userService')

router.get('/', (ctx, next) => {
	ctx.body = 'hello world'
})
router.post('/register', async function(ctx, next) {
	let regInfo = ctx.request.body
	let result = await userService.register(regInfo)
	ctx.body = apiResult(result)
})

module.exports = router