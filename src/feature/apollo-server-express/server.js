import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

import jwtCheck from '../../utils/jwt'

const serverGQL = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    user: jwtCheck(req.headers.authorization),
  }),
})

export default serverGQL
