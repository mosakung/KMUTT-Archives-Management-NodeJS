import { gql } from 'apollo-server-express'
import { readFileSync } from 'fs'
import { searchController } from './searchController'

const fileGraphqlType = readFileSync(`${__dirname}/searchGQL.gql`, 'utf8')

export const searchGraphql = gql(fileGraphqlType)

export const searchResolver = {
  Query: {
    searchDocument: (_, { searchSet }) => searchController(searchSet),
  },
}

export default {}
