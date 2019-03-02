const crypto = require('crypto')

module.exports = {
	apiResult: function(data, err) {
		if (err) {
			return {
				code: err.code || 500,
				message: err.message,
				data: data
			}
		} else {
			return {
				code: 200,
				data: data
			}
		}
	},
	md5Hash: function(input) {
		let md5sum = crypto.createHash('md5')
		md5sum.update(input)
		return md5sum.digest('hex')
	}
}

