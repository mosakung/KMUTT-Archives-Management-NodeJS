import { gql } from 'apollo-server-express'
import { readFileSync } from 'fs'
import { insertDocumentController } from './documentController'

const fileGraphqlType = readFileSync(`${__dirname}/documentGQL.gql`, 'utf8')

export const documentGraphql = gql(fileGraphqlType)

export const documentResolver = {
  Mutation: {
    // addDocument: async (body) => insertDocumentController(body),
    addDocument: (_, { body }) => insertDocumentController(body),
  },
}

export default {}
