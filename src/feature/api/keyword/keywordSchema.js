import { gql } from 'apollo-server-express'
import { readFileSync } from 'fs'

import { setStatusKeywordController } from './keywordController'

const fileGraphqlType = readFileSync(`${__dirname}/keywordGQL.gql`, 'utf8')

export const keywordGraphql = gql(fileGraphqlType)

export const keywordResolver = {
  Query: {

  },
  Mutation: {
    setStatusKeyword: (_, param) => setStatusKeywordController(param),
  },
}

export default {}
