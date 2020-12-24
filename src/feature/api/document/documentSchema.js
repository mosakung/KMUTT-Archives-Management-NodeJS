import { gql } from 'apollo-server-express'
import { readFileSync } from 'fs'
import { getDocumentController, getDocumentsController, insertDocumentController } from './documentController'

const fileGraphqlType = readFileSync(`${__dirname}/documentGQL.gql`, 'utf8')

export const documentGraphql = gql(fileGraphqlType)

export const documentResolver = {
  Query: {
    document: (_, { pk }) => getDocumentController(pk),
    documents: () => getDocumentsController(),
  },
  Mutation: {
    // addDocument: async (body) => insertDocumentController(body),
    addDocument: (_, { body }, context) => insertDocumentController(body, context),
  },
}

export default {}
