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
      getOne: async function(root, {id}) {
        checkFunctionExists(resolver.getOne, 'not supported')
        let result = await resolver.getOne(id)
        return rowToData(result)
      },
      getList: async function(root, query) {
        checkFunctionExists(resolver.getList, 'not supported')
        let result = await resolver.getList(query)
        return result.map(rowToData)
      },
      add: async function(root, data) {
        checkFunctionExists(resolver.add, 'not supported')
        let newRow = dataToRow(data)
        return await resolver.add(newRow)
      },
      modify: async function(root, data) {
        checkFunctionExists(resolver.modify, 'not supported')
        let row = dataToRow(data)
        return await resolver.modify(row)
      },
      delete: async function(root, query) {
        checkFunctionExists(resolver.delete, 'not supported')
        return await resolver.delete(query)
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