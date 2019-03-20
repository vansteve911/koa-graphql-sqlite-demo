function func(f) {
  return (f instanceof Function) && f
}

module.exports = function(storage) {
  const rowToData = func(storage.rowToData) || (x => x)
  const dataToRow = func(storage.dataToRow) || (x => x)
  return {
    getOne: func(storage.getOne) && (async (root, {id}) => {
      let result = await storage.getOne(id)
      return rowToData(result)
    }),
    getList: func(storage.getList) && (async (root, query) => {
      let result = await storage.getList(query)
      return result.map(rowToData)
    }),
    add: func(storage.add) && (async (root, data) => {
      return await storage.add(dataToRow(data))
    }),
    modify: func(storage.modify) && (async (root, data) => {
      return await storage.modify(dataToRow(data))
    }),
    delete: func(storage.delete) && (async (root, query) => {
      return await storage.delete(query)
    })
  }
}