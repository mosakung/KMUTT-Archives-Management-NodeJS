import * as repo from './documentStatusRepository'
import djangoRequest from '../../django-request/djangoRequest'
import { parserDocumentStatus, parserPage, parserPreterm } from './parserDocumentStatus'

export const documentStatusMultipleService = async (userId) => {
  const rowsDocumentRaw = await repo.selectDocumentNotDone(userId)
  const rowsDocument = parserDocumentStatus(rowsDocumentRaw)
  const documentSet = await Promise.all(rowsDocument.map(async (row) => {
    const { documentId } = row
    const rowsPageRaw = await repo.selectPageInDocument(documentId)
    const rowsPage = parserPage(rowsPageRaw)
    return { ...row, pages: rowsPage }
  }))

  return documentSet
}

export const documentStatusService = async (documentId, userId) => {
  const rowDocumentRaw = await repo.selectDocumentById(documentId, userId)
  const rowDocument = parserDocumentStatus(rowDocumentRaw)
  const rowsPageRaw = await repo.selectPageInDocument(documentId)
  const rowsPage = parserPage(rowsPageRaw)
  return { ...rowDocument[0], pages: rowsPage }
}

export const pageInDocumentService = async (documentId) => {
  const rowsPageRaw = await repo.selectPageInDocument(documentId)
  const rowsPage = parserPage(rowsPageRaw)
  return rowsPage
}

export const keywordInPageService = async (pageId) => {
  const rowsPretermRaw = await repo.selectPretermInPage(pageId)
  const rowsPreterm = parserPreterm(rowsPretermRaw)
  return rowsPreterm
}

export const insertPretermService = async (newPreterm, pageId) => {
  const row = await repo.insertPreterm(newPreterm, pageId)
  const result = parserPreterm(row)
  return result[0]
}

export const editPretermService = async (newPreterm, preTermId) => {
  const row = await repo.editPreterm(newPreterm, preTermId)
  const result = parserPreterm(row)
  return result[0]
}

export const deletePretermService = async (preTermId) => {
  const row = await repo.deletePreterm(preTermId)
  if (row === 1) return true
  return false
}

export const changeStatusPageService = async (pageId, status) => {
  const result = await repo.updatePageStatus(pageId, status)
  if (result === 1) return true
  return false
}

export const startTfDjangoService = async (documentId) => {
  const objectBody = {
    documentId,
  }
  const apiStartTfDjango = 'start-TF/'
  const result = await djangoRequest.post(apiStartTfDjango, objectBody, true)
  if (result) return true
  return false
}

export default {}
