function funcOrNone(f) {
  return (f instanceof Function) && f
}

module.exports = function(storage) {
  const rowToData = funcOrNone(storage.rowToData) || (x => x)
  const dataToRow = funcOrNone(storage.dataToRow) || (x => x)
  return {
    getOne: funcOrNone(storage.getOne) && (async (root, {id}) => {
      let result = await storage.getOne(id)
      return rowToData(result)
    }),
    getList: funcOrNone(storage.getList) && (async (root, query) => {
      let result = await storage.getList(query)
      return result.map(rowToData)
    }),
    add: funcOrNone(storage.add) && (async (root, data) => {
      return await storage.add(dataToRow(data))
    }),
    modify: funcOrNone(storage.modify) && (async (root, data) => {
      return await storage.modify(dataToRow(data))
    }),
    delete: funcOrNone(storage.delete) && (async (root, query) => {
      return await storage.delete(query)
    })
  }
}