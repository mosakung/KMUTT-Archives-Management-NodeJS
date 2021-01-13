import { gql } from 'apollo-server-express'
import { readFileSync } from 'fs'

import { tagInDocumentController, generateTagForShowController, insertTagForShowController } from './keywordController'

const fileGraphqlType = readFileSync(`${__dirname}/keywordGQL.gql`, 'utf8')

export const keywordGraphql = gql(fileGraphqlType)

export const keywordResolver = {
  Query: {
    tagInDocument: (_, { documentId }) => tagInDocumentController(documentId),
    generateTagForShow: (_, { documentId }) => generateTagForShowController(documentId),
  },
  Mutation: {
    insertTagForShow: (_, { documentId, newTag }) => insertTagForShowController(documentId, newTag),
  },
}

export default {}
