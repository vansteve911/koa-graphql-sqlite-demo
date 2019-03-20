const LocalDataStorage = require('../storage/localDataStorage')

const data = [
  {
    'id': '1',
    'title': 'We choose to go to the moon',
    'userId': '1'
  },
  {
    'id': '2',
    'title': 'Knowledge is power',
    'userId': '2'
  },
  {
    'id': '3',
    'title': 'Ask what you can do for your country',
    'userId': '1'
  }
]

module.exports = new LocalDataStorage(data, {
  primaryKey: 'id',
  keys: ['id', 'name', 'userId']
})