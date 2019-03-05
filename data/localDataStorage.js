const assert = require('assert')

function LocalDataStorage(localData, meta) {
  assert(localData instanceof Array, 'invalid localData')
  assert(meta.name, 'meta.name is required')
  assert(meta.primaryKey, 'meta.primaryKey is required')
  assert(meta.keys && meta.keys instanceof Array, 'meta.keys should be a list')

  const storage = localData.reduce((recordMap, currentRecord) => {
      let pk = currentRecord[meta.primaryKey]
      recordMap[pk] = currentRecord
      return recordMap
  }, {})
  const validKeys = new Set(meta.keys)

  return {
    name: meta.name,
    getOne(id) {
      let result = storage[id]
      return result
    },
    getList(query) {
      let key = Object.keys(query).find(k => validKeys.has(k))
      if (key) {
        let value = query[key]
        return Object.keys(storage)
          .map(id => storage[id])
          .filter(record => {
            return record[key] == value
          })
      }
      return []
    }
  }
}

module.exports = LocalDataStorage