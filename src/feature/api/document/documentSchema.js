import { gql } from 'apollo-server-express'
import { readFileSync } from 'fs'
import {
  getDocumentController, insertDocumentController, uploadDocumentController, softDeleteDocumentController,
} from './documentController'

const fileGraphqlType = readFileSync(`${__dirname}/documentGQL.gql`, 'utf8')

export const documentGraphql = gql(fileGraphqlType)

export const documentResolver = {
  Query: {
    document: (_, { pk }) => getDocumentController(pk),
  },
  Mutation: {
    // addDocument: async (body) => insertDocumentController(body),
    addDocument: (_, { body }, context) => insertDocumentController(body, context),
    uploadDocument: (parent, args) => uploadDocumentController(parent, args),
    softDeleteDocument: (_, { documentId }) => softDeleteDocumentController(documentId),
  },
}

export default {}
