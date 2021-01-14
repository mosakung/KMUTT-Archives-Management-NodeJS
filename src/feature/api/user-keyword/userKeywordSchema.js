import { gql } from 'apollo-server-express'
import { readFileSync } from 'fs'
import {
  tagInDocumentController, generateTagForAddController, putDocumentDoneController, overrideUserKeywordController,
} from './userKeywordController'

const fileGraphqlType = readFileSync(`${__dirname}/userKeywordGQL.gql`, 'utf8')

export const userKeywordGraphql = gql(fileGraphqlType)

export const userKeywordResolver = {
  Query: {
    tagInDocument: (_, { documentId }) => tagInDocumentController(documentId),
    generateTagForAdd: (_, { documentId, limit }) => generateTagForAddController(documentId, limit),
  },
  Mutation: {
    putDocumentDone: (_, { documentId }) => putDocumentDoneController(documentId),
    overrideUserKeyword: (_, { keywords, documentId }) => overrideUserKeywordController(keywords, documentId),
  },
}
