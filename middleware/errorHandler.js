const BusinessError = require('../common/businessError')
const {apiResult} = require('../common/util')

module.exports = function() {
	return async function(ctx, next) {
		try {
			await next()
		} catch (err) {
			if (err instanceof BusinessError) {
				console.warn(`business error occurred: ${err.message}`)
			} else {
				console.error(`error raised: ${err.stack}`)
			}
			ctx.body = apiResult(null, err)
		}
	}
}()
