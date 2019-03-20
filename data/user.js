const LocalDataStorage = require('../storage/localDataStorage')

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
  primaryKey: 'id',
  keys: ['id', 'name', 'roles']
})