import { gql } from 'apollo-server-express'
import { readFileSync } from 'fs'
import {
  queryUserInformationController,
} from './userController'

const fileGraphqlType = readFileSync(`${__dirname}/userGQL.gql`, 'utf8')

export const userGraphql = gql(fileGraphqlType)

export const userResolver = {
  Query: {
    userInformation: (_, __, context) => queryUserInformationController(context),
  },
}

export default { }
