// const {bind} = require('./resolverBinder')
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
        type: GraphQLList(episodeEnum),
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
        type: GraphQLObjectType(userType),
        description: 'article user'
      }
    }
  }
})


const fakeDb = {
  user: {
    '120': {
      id: '120',
      name: 'watson',
      articleIds: ['42']
    }
  },
  article: {
    '42': {
      id: '42',
      title: 'Unknown',
      userId: '120'
    }
  }
}

const rootQuery = {
  user: function({id}) {
    return fakeGetUser(id)
  }
}

graphql(typeSchema, '{user{1}}', rootQuery)
  .then(res => {
    console.log(res)
  })

