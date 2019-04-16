const knex = require('knex')

let {log} = console;

function storageBuilder(db, table, primaryKey) {
  return {
    getOne: async(id) => {
      return db.select().from(table).where(primaryKey, id)
    },
    getList: async(query) => {
      return db.select().from(table).where(query)
    },
    add: async(data) => {
      let insertRes = await db(table).insert(data)
      let res = {}
      res[primaryKey] = insertRes[0]
      return Object.assign(res, data)
    },
    modify: async({id, condition, updates}) => {
      if (!updates) {
        throw Error('nothing to be updated')
      }
      if (id) {
        return db(table).where(primaryKey, id).update(updates)
      } else if (condition) {
        return db(table).where(condition).update(updates)
      }
      throw Error('illegal condition')
    }
  }
}

const SqliteStorage = function({dataFile, table, primaryKey}) {
  const db = knex({
    client: 'sqlite3',
    connection: {
      filename: dataFile
    }
  })
  return storageBuilder(db, table, primaryKey)
}

const MySqlStorage = function({connection, table, primaryKey}) {
  const db = knex({
    client: 'mysql',
    connection: {
      host: connection.host,
      port: connection.port || 3306, 
      user: connection.user,
      password: connection.password,
      database: connection.database
    }
  })
  return storageBuilder(db, table, primaryKey)
}

// test script
// let storage = SqliteStorage({
//   dataFile: '/Users/vansteve911/project/mygithub/koa-graphql-sqlite-demo/testData/testDb.db',
//   table: 'user', 
//   primaryKey: 'id'
// })

// storage.getList({
//   name: 'NumOne',
// }).then((data) => console.log(data))
//   .catch((err) => console.error(err))

module.exports = {SqliteStorage, MySqlStorage}
