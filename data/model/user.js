const LocalDataStorage = require('../localDataStorage')

const data = [
	{
		'id': '1',
		'name': 'Van Dore',
		'roles': [1, 2]
	},
  {
    'id': '2',
    'name': 'Hsu Wang',
    'roles': [1, 2]
  }
]

module.exports = new LocalDataStorage(data, {
	name: 'User',
	primaryKey: 'id',
	keys: ['id', 'name', 'roles']
})