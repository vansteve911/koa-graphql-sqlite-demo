const resolvers = require('./resolvers')

function bind(...path) {
  return findByPath(path, resolvers)
}

function findByPath(pathSegs, obj) {
  if (!pathSegs.length || !obj) {
    return obj
  }
  let curChild = obj[pathSegs[0]]
  return curChild ? findByPath(pathSegs.slice(1), curChild) : undefined
}

module.exports = {
  bindResolver: bind
}