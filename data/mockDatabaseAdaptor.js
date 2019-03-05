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

function LocalDataAdaptor(localData, meta) = {
  assert(meta.name, 'name is required')
  assert(meta.keys, 'name is required')
  return {
    name: 'gameOfThrone',
      getOne(id) {
        let result = mockDb[id]
        return result
      },
      getList(query) {
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
      },
      getOneAsync: async function(id) {
        return getOne(id)
      },
      getListAsync: async function(query) {
        return getList(query)
      }
    }

}

// const adaptorBinder = require('./adaptorBinder')
// adaptorBinder.bind(GoTResolver)

// const mockAdaptor = adaptorBinder.find('gameOfThrone')
// mockAdaptor.getOneAsync('1')
//   .then(console.log)
// mockAdaptor.getListAsync({badge: 'wolf'})
//   .then(console.log)


module.exports = LocalDataAdaptor