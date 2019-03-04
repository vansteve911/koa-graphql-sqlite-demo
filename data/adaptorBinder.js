const assert = require('assert')

// TODO move to common module
function checkFunctionExists(func, message) {
  assert(func instanceof Function, message)
}

function DataAdaptorBinder() {
  const adaptors = {} 
  const self = this
  return {
    bind(resolver) {
      let name = resolver.name
      if (adaptors[name]) {
        console.warn(`will overwrite existed resolver ${name}!`)
      }
      const rowToData = resolver.rowToData || (x => x)
      const dataToRow = resolver.dataToRow || (x => x)
      adaptors[name] = {
        getOne: (id) => {
          checkFunctionExists(resolver.getOne, 'not supported')
          return rowToData(resolver.getOne(id))
        },
        getList: (query) => {
          checkFunctionExists(resolver.getList, 'not supported')
          return resolver.getList(query)
            .then(rowToData) // TODO difference sync & async 
        },
        add: (data) => {
          checkFunctionExists(resolver.add, 'not supported')
          let newRow = dataToRow(data)
          let result = resolver.add(newRow)
          return Object.assign(rowToData(result), data)
        },
        modify: (data) => {
          checkFunctionExists(resolver.modify, 'not supported')
          let row = dataToRow(data)
          return resolver.modify(row)
        },
        delete: (query) => {
          checkFunctionExists(resolver.delete, 'not supported')
          return resolver.delete(query)
        }
      }
      return self
    },
    find(name) {
      return adaptors[name]
    }
  }
}

module.exports = new DataAdaptorBinder()