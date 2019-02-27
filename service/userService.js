const BusinessError = require('../common/businessError')
const {md5Hash} = require('../common/util')
const logger = require('../common/logger')(module)

module.exports = function() {

	const emailRegex = /\w+@[\w+\.]+\w+/

	return {
		register: function(regInfo) { // TODO make it async 
			logger.info('incoming reg req: %s', regInfo)
			if (!regInfo.email.match(emailRegex)) {
				throw new BusinessError('illegal email', 400)
			}
			if (!regInfo.password) {
				throw new BusinessError('empty password', 400)
			}
			let pwHash = md5Hash(regInfo.password)
			return {email: regInfo.email, password: pwHash}
		}
	}
}()
