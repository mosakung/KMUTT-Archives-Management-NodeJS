import { gql } from 'apollo-server-express'
import { readFileSync } from 'fs'
import {
  documentStatusMultipleController,
  documentStatusController,
  pageInDocumentController,
  keywordInPageController,
  insertPretermController,
  editPretermController,
  deletePretermController,
  changeStatusPageController,
  startTfDjangoController,
  overridePertermController,
  amountPageController,
} from './documentStatusController'

const fileGraphqlType = readFileSync(`${__dirname}/documentStatusGQL.gql`, 'utf8')

export const documentStatusGraphql = gql(fileGraphqlType)

export const documentStatusResolver = {
  Query: {
    documentStatusMultiple: (_, __, context) => documentStatusMultipleController(context),
    documentStatus: (_, param, context) => documentStatusController(param, context),
    pageInDocument: (_, param) => pageInDocumentController(param),
    keywordInPage: (_, param, context) => keywordInPageController(param, context),
    amountPage: (_, param, context) => amountPageController(param, context),
  },
  Mutation: {
    insertPreterm: (_, param, context) => insertPretermController(param, context),
    editPreterm: (_, param, context) => editPretermController(param, context),
    deletePreterm: (_, param, context) => deletePretermController(param, context),
    overridePerterm: (_, param) => overridePertermController(param),
    changeStatusPage: (_, param, context) => changeStatusPageController(param, context),
    startTfDjango: (_, param, context) => startTfDjangoController(param, context),
  },
}
