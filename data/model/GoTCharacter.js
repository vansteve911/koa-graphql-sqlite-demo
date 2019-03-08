const LocalDataStorage = require('../localDataStorage')

const data = [
  {
    id: '1',
    name: 'Jon Snow',
    badge: 'wolf',
    descrition: 'You know nothing'
  },
  {
    id: '2',
    name: 'Arya Stark',
    badge: 'wolf',
    descrition: 'revenge'
  },
  {
    id: '3',
    name: 'Tyrion Lannister',
    badge: 'lion',
    descrition: 'the Imp'
  }
]

module.exports = new LocalDataStorage(data, {
  name: 'Character',
  keys: ['id', 'name', 'badge', 'descrition'],
  primaryKey: 'id'
})
