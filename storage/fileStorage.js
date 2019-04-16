const assert = require('assert')
const fs = require('fs')
const util = require('util')

const statAsync = util.promisify(fs.stat)
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const loadFile = async (file, deserializer) => {
  let content = await readFile(file, 'utf8')
  return deserializer(content)
}

const updateFile = async (file, data, serializer) => {
  let content = serializer(data)
  await writeFile(file, content)
  return data
}

const SingleDataFileStorage = function(file, {serializer, deserializer}) {
  assert(serializer instanceof Function, 'must provide serializer')
  assert(deserializer instanceof Function, 'must provide deserializer')

  return {
    getOne: async() => {
      return loadFile(file, deserializer)
    },
    add: async(data) => {
      return updateFile(file, data, serializer)
    },
    modify: async({updates}) => {
      if (!updates) {
        throw Error('nothing to be updated')
      }
      let data = loadFile(file, deserializer)
      Object.assign(data, updates)
      return updateFile(file, data, serializer)
    }
  }
}

const MultiDataFileStorage = function(file, {serializer, deserializer, primaryKey}) {
  return {
    getOne: async(id) => {
      let dataList = await loadFile(file, deserializer)
      return dataList.find(item => item[primaryKey] == id)
    },
    add: async(data) => {
      let dataList = await loadFile(file, deserializer)
      dataList.push(data)
      return await updateFile(file, data, serializer)
    },
    modify: async({id, updates}) => {
      // TODO 
      // if (!updates) {
      //   throw Error('nothing to be updated')
      // }
      // let data = await loadFile(file, deserializer)
      // Object.assign(data, updates)
      // return await updateFile(file, data, serializer)
    }
  }
}

// test codes
let storage = SingleDataFileStorage('/tmp/test911.json', {
  serializer: JSON.stringify,
  deserializer: JSON.parse
})
storage.add({day: 'Easter Day', month: 'April'})
  .then((data) => {
    console.log('after add', data)
    return storage.modify({
      updates: {
        description: 'the day when Jesus came back to life'
      }
    })
  })
  .then((data) => {
    console.log('after modify', data)
    return storage.getOne()
  })
  .then((data) => {
    console.log('file content', data)
  })
  .catch((err) => {
    console.error('something\' wrong you little fool: ', err)
  })








