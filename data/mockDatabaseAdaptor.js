const mockDb = {
  '1': {
    name: 'Jon Snow',
    badge: 'wolf',
    descrition: 'You know nothing'
  },
  '2': {
    name: 'Arya Stark',
    badge: 'wolf',
    descrition: 'revenge'
  },
  '3': {
    name: 'Tyrion Lannister',
    badge: 'lion',
    descrition: 'the Imp'
  }
}

const validKeys = new Set(['name', 'badge', 'descrition'])

const GoTResolver = {
  name: 'gameOfThrone',
  getOne: async function (id) {
    let result = mockDb[id]
    return result
  },
  getList: async function(query) {
    let key = Object.keys(query).find(k => validKeys.has(k))
    if (key) {
      let value = query[key]
      return Object.keys(mockDb)
        .map(id => mockDb[id])
        .filter(record => {
          return record[key] == value
        })
    }
    return []
  }
}

const adaptorBinder = require('./adaptorBinder')
adaptorBinder.bind(GoTResolver)

const mockAdaptor = adaptorBinder.find('gameOfThrone')
mockAdaptor.getOne('1')
  .then(console.log)
mockAdaptor.getList({badge: 'wolf'})
  .then(console.log)


module.exports = GoTResolver