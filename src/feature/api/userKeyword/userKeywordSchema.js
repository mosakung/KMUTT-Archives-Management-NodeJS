import { gql } from 'apollo-server-express'
import { readFileSync } from 'fs'
import { viewUserKeywordController, insertUserKeywordController, DeleteUserKeywordController } from './userKeywordController'

const fileGraphqlType = readFileSync(`${__dirname}/userKeywordGQL.gql`, 'utf8')

export const userKeywordGraphql = gql(fileGraphqlType)

export const userKeywordResolver = {
  Query: {
    userKeyword: (_, param, context) => viewUserKeywordController(param, context),
  },
  Mutation: {
    insertUserKeyword: (_, { body }) => insertUserKeywordController(body),
    deleteUserKeyword: (_, { body }) => DeleteUserKeywordController(body),
  },
}
