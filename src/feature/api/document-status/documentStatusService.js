import { readFile } from 'fs'
import repo from './documentStatusRepository'
import djangoRequest from '../../django-request/djangoRequest'
import parser from './parserDocumentStatus'

export const documentStatusMultipleService = async (userId) => {
  const rowsDocumentRaw = await repo.selectDocumentNotDone(userId)
  const rowsDocument = parser.documentStatus(rowsDocumentRaw)
  const documentSet = await Promise.all(rowsDocument.map(async (row) => {
    const { documentId } = row
    const rowsPageRaw = await repo.selectPageInDocument(documentId)
    const rowsPage = parser.page(rowsPageRaw)
    return { ...row, pages: rowsPage }
  }))

  return documentSet
}

export const documentStatusService = async (documentId, userId) => {
  const rowDocumentRaw = await repo.selectDocumentById(documentId, userId)
  const rowDocument = parser.documentStatus(rowDocumentRaw)
  const rowsPageRaw = await repo.selectPageInDocument(documentId)
  const rowsPage = parser.page(rowsPageRaw)
  return { ...rowDocument[0], pages: rowsPage }
}

export const pageInDocumentService = async (documentId) => {
  const rowsPageRaw = await repo.selectPageInDocument(documentId)
  const rowsPage = parser.page(rowsPageRaw)
  return rowsPage
}

export const keywordInPageService = async (pageId) => {
  const rowsPretermRaw = await repo.selectPretermInPage(pageId)
  const rowsPreterm = parser.preterm(rowsPretermRaw)
  return rowsPreterm
}

export const imageInPageService = async (documentId, userId, pageId) => {
  const rowDocumentRaw = await repo.selectDocumentById(documentId, userId)
  const path = rowDocumentRaw.name.split('.pdf')[0]
  readFile(`${process.cwd()}/pics/demopic.png`, (err, data) => {

  })
}

export const insertPretermService = async (newPreterm, pageId) => {
  const row = await repo.insertPreterm(newPreterm, pageId)
  const result = parser.preterm(row)
  return result[0]
}

export const editPretermService = async (newPreterm, preTermId) => {
  const row = await repo.editPreterm(newPreterm, preTermId)
  const result = parser.preterm(row)
  return result[0]
}

export const deletePretermService = async (preTermId) => {
  const row = await repo.deletePreterm(preTermId)
  if (row === 1) return true
  return false
}

export const overridePertermService = async ({ overide, newPage }) => {
  await Promise.all(overide.map(async (element) => {
    await repo.clearPertermInPage(element.pageId)
    const bodyParser = parser.overide(element.pageId, element.token)
    await repo.overidePertermInPage(bodyParser)
    return true
  }))

  const logAddNewPage = await Promise.all(newPage.map(async (element) => {
    const checkPageStatus = repo.checkIndexInPage(element.documentId, element.pageIndex)
    if (checkPageStatus) return { pageIndex: element.pageIndex, documentId: element.documentId, status: false }
    const row = await repo.addNewPage(element.pageIndex, element.name, element.documentId)
    const PageId = row[0]
    const bodyParser = parser.overide(PageId, element.token)
    await repo.overidePertermInPage(bodyParser)
    return { pageIndex: element.pageIndex, documentId: element.documentId, status: true }
  }))

  return { overidestatus: true, addNewStatus: logAddNewPage }
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
  if (result.res) {
    const {
      status, message,
    } = {
      status: result.output.status,
      message: result.output.message,
    }
    return {
      status, message,
    }
  }
  return false
}

export default {}
