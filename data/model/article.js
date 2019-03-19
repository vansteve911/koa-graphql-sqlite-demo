const LocalDataStorage = require('../localDataStorage')

const data = [
  {
    'id': '1',
    'title': 'We choose to go to the moon',
    'userId': '1'
  },
  {
    'id': '2',
    'name': 'Hi boy!',
    'userId': '2'
  }
]

module.exports = new LocalDataStorage(data, {
  name: 'Article',
  primaryKey: 'id',
  keys: ['id', 'name', 'userId']
})