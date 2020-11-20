import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

import jwtCheck from '../../utils/jwt'

const serverGQL = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user = jwtCheck(req.headers.authorization)
    if (!user) throw new AuthenticationError('you must login')
    return { user }
  },
})

export default serverGQL
