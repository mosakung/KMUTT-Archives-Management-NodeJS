import {
  documentStatusMultipleService,
  documentStatusService,
  pageInDocumentService,
  keywordInPageService,
  insertPretermService,
  editPretermService,
  deletePretermService,
  changeStatusPageService,
  startTfDjangoService,
  overridePertermService,
  amountPageService,
  documentInProcessService,
} from './documentStatusService'

export const documentStatusMultipleController = async ({ user }) => {
  const { userId } = { userId: user.id }
  return documentStatusMultipleService(userId)
}

export const documentStatusController = async ({ documentId }, { user }) => {
  const { userId } = { userId: user.id }
  return documentStatusService(documentId, userId)
}

export const pageInDocumentController = async ({ documentId }) => pageInDocumentService(documentId)

export const keywordInPageController = async ({ documentId, pageId }, { user }) => keywordInPageService(documentId, user.id, pageId)

export const insertPretermController = async ({ newPreterm, pageId }) => insertPretermService(newPreterm, pageId)

export const editPretermController = async ({ newPreterm, preTermId }) => editPretermService(newPreterm, preTermId)

export const deletePretermController = async ({ preTermId }) => deletePretermService(preTermId)

export const overridePertermController = async ({ newInformation, documentId }) => overridePertermService(newInformation, documentId)

export const changeStatusPageController = async ({ pageId, status }) => changeStatusPageService(pageId, status)

export const startTfDjangoController = async ({ documentId }) => startTfDjangoService(documentId)

export const amountPageController = async ({ documentId }, { user }) => amountPageService(documentId, user.id)

export const documentInProcessController = async (pk, { user }) => {
  const respones = await documentInProcessService(pk, user)
  if (!respones) {
    return { statusQuery: false }
  }

  return { statusQuery: true, ...respones }
}

export default {}
