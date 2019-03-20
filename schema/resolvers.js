const bindStorage = require('../storage/bindStorage')

const userStorage = require('../data/user')
const articleStorage = require('../data/article')

module.exports = {
  user: bindStorage(userStorage),
  article: bindStorage(articleStorage)
}