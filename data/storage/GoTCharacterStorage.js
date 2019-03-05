const localDataStorage = require('../localDataStorage')

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

// const validKeys = new Set(['name', 'badge', 'descrition'])

const GoTCharacterStorage = new localDataStorage(data, {
  name: 'GameOfThroneData',
  keys: ['id', 'name', 'badge', 'descrition'],
  primaryKey: 'id'
})
// const adaptorBinder = require('./adaptorBinder')
// adaptorBinder.bind(GoTResolver)

// const mockAdaptor = adaptorBinder.find('gameOfThrone')
console.log(GoTCharacterStorage.getOne('1'))
console.log(GoTCharacterStorage.getList({badge: 'wolf'}))
