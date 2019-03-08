const BusinessError = require('../common/businessError')
const {md5Hash} = require('../common/util')
const logger = require('../common/logger')(module)

const emailRegex = /\w+@[\w+\.]+\w+/

module.exports = {
	register: async function(regInfo) {
		logger.info('incoming reg req: %s', regInfo)
		if (!regInfo.email.match(emailRegex)) {
			throw new BusinessError('illegal email', 400)
		}
		if (!regInfo.password) {
			throw new BusinessError('empty password', 400)
		}
		let pwHash = md5Hash(regInfo.password)
		return {email: regInfo.email, password: pwHash}
	},
	get(query) {
		return 
	}
}
	