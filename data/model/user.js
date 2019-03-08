const LocalDataStorage = require('../localDataStorage')

const data = [
	{
		'id': '1',
		'name': 'Van Dore',
		'roles': [1, 2]
	}
]

module.exports = new LocalDataStorage(data, {
	name: 'User',
	primarayKey: 'id',
	keys: ['id', 'name', 'roles']
})