const assert = require('assert')

// TODO move to common module
function checkFunctionExists(func, message) {
  assert(func instanceof Function, message)
}

function DataAdaptorBinder() {
  const adaptors = {}
  const self = this

  function bind(resolver) {
    let name = resolver.name
    if (adaptors[name]) {
      console.warn(`will overwrite existed resolver ${name}!`)
    }
    const rowToData = resolver.rowToData || (x => x)
    const dataToRow = resolver.dataToRow || (x => x)
    adaptors[name] = {
      // sync functions
      getOne(id) {
        checkFunctionExists(resolver.getOne, 'not supported')
        return rowToData(resolver.getOne(id))
      },
      getList(query) {
        checkFunctionExists(resolver.getList, 'not supported')
        return resolver.getList(query)
          .then(rowToData) // TODO difference sync & async 
      },
      add(data) {
        checkFunctionExists(resolver.add, 'not supported')
        let newRow = dataToRow(data)
        let result = resolver.add(newRow)
        return Object.assign(rowToData(result), data)
      },
      modify(data) {
        checkFunctionExists(resolver.modify, 'not supported')
        let row = dataToRow(data)
        return resolver.modify(row)
      },
      delete(query) {
        checkFunctionExists(resolver.delete, 'not supported')
        return resolver.delete(query)
      },
      // async functions
      getOneAsync: async function(id) {
        checkFunctionExists(resolver.getOneAsync, 'not supported')
        let result = await resolver.getOneAsync(id)
        return rowToData(result)
      },
      getListAsync: async function(query) {
        checkFunctionExists(resolver.getListAsync, 'not supported')
        let result = await resolver.getListAsync(query)
        return result.map(rowToData)
      },
      addAsync: async function(data) {
        checkFunctionExists(resolver.addAsync, 'not supported')
        let newRow = dataToRow(data)
        return await resolver.addAsync(newRow)
      },
      modifyAsync: async function(data) {
        checkFunctionExists(resolver.modifyAsync, 'not supported')
        let row = dataToRow(data)
        return await resolver.modifyAsync(row)
      },
      deleteAsync: async function(query) {
        checkFunctionExists(resolver.deleteAsync, 'not supported')
        return await resolver.deleteAsync(query)
      }
    }
    return self
  }

  function find(name) {
    return adaptors[name]
  }

  return {
    bind,
    find
  }
}

module.exports = new DataAdaptorBinder()