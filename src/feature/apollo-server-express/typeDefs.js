import { gql } from 'apollo-server-express'
import { documentGraphql } from '../api/document/documentSchema'
import { userKeywordGraphql } from '../api/user-keyword/userKeywordSchema'
import { documentStatusGraphql } from '../api/document-status/documentStatusSchema'

const typeDefs = []

typeDefs.push(gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  type Subscription {
    _: String
  }
`)

typeDefs.push(documentGraphql)
typeDefs.push(userKeywordGraphql)
typeDefs.push(documentStatusGraphql)

export default typeDefs
