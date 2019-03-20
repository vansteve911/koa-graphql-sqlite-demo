const {
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  graphql, 
  buildSchema
} = require('graphql')

const resolvers = require('./resolvers')

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'user',
  fields: () => {
    return {
      id: {
        type: GraphQLNonNull(GraphQLString),
        description: 'user id'
      },
      name: {
        type: GraphQLNonNull(GraphQLString),
        description: 'user name'
      },
      articles: {
        type: GraphQLList(articleType),
        resolve(user) {
          return resolvers.article.getList(user, {userId: user.id})
        }
      }
    }
  }
})


const articleType = new GraphQLObjectType({
  name: 'Article',
  description: 'article',
  fields: () => {
    return {
      id: {
        type: GraphQLNonNull(GraphQLString),
        description: 'article id'
      },
      title: {
        type: GraphQLNonNull(GraphQLString),
        description: 'article title'
      },
      user: {
        type: userType,
        description: 'article user',
        resolve(article) {
          return resolvers.user.getOne(article, {id: article.userId})
        }
      }
    }
  }
})

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: {
      type: userType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: resolvers.user.getOne
    },
    article: {
      type: articleType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: resolvers.article.getOne
    },
    users: {
      type: new GraphQLList(userType),
      args: {
        name: {
          type: GraphQLString
        }
      },
      resolve: resolvers.user.getList
    },
    articles: {
      type: new GraphQLList(articleType),
      args: {
        userId: {
          type: GraphQLString
        }
      },
      resolve: resolvers.article.getList
    },
  }
})

const querySchema = new GraphQLSchema({
  query: queryType,
  types: [userType, articleType]
  // TODO mutations
})


let userQuery = `
query {
  user(id: "1") {
    id,
    name,
    articles {
      id,
      title
    }
  }
}
`
graphql(querySchema, userQuery)
  .then(res => {
    console.log(res.data)
  })

let articlesQuery = `
query {
  articles(userId: "1") {
    id,
    title,
    user {
      name
    }
  }
}
`

graphql(querySchema, articlesQuery)
  .then(res => {
    console.log(res.data)
  })
