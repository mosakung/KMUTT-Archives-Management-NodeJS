import { promises as fsp } from 'fs'
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
    const path = row.pathImage
    const resultImage = row.status >= 2 ? await fsp.readFile(`${path}/page${row.pageStart}.jpg`, { encoding: 'base64' }, (error, data) => {
      if (error) {
        return error
      }
      return data
    }) : null
    return { ...row, pages: rowsPage, image: resultImage }
  }))

  return documentSet
}

export const documentStatusService = async (documentId, userId) => {
  const rowDocumentRaw = await repo.selectDocumentById(documentId, userId)
  const rowDocument = parser.documentStatus(rowDocumentRaw)
  const rowsPageRaw = await repo.selectPageInDocument(documentId)
  const rowsPage = parser.page(rowsPageRaw)
  const path = rowDocumentRaw[0].path_image
  let resultImage = null
  try {
    resultImage = rowDocument[0].status >= 2
      ? await fsp.readFile(`${path}/page${rowDocumentRaw[0].page_start}.jpg`, { encoding: 'base64' }, (error, data) => {
        if (error) {
          return error
        }
        return data
      }) : null
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error(err)
    }
  }

  return { ...rowDocument[0], pages: rowsPage, image: resultImage }
}

export const pageInDocumentService = async (documentId) => {
  const rowsPageRaw = await repo.selectPageInDocument(documentId)
  const rowsPage = parser.page(rowsPageRaw)
  return rowsPage
}

export const keywordInPageService = async (documentId, userId, pageId) => {
  const pageInDB = await repo.selectPageInDocumentWithId(documentId, pageId)
  let rowsPreterm = ['']
  let pageDBId = -1
  let maxPage = -1
  if (pageInDB.length !== 0) {
    maxPage = pageInDB[0].amount_page
    pageDBId = pageInDB[0].page_in_document_id
    const rowsPretermRaw = await repo.selectPretermInPage(pageInDB[0].page_in_document_id)
    rowsPreterm = parser.preterm(rowsPretermRaw)
  }
  const rowDocumentRaw = await repo.selectDocumentById(documentId, userId)
  const path = rowDocumentRaw[0].path_image
  const resultImage = await fsp.readFile(`${path}/page${pageId}.jpg`, { encoding: 'base64' }, (error, data) => {
    if (error) {
      return error
    }
    return data
  })
  return {
    PreTerms: rowsPreterm, image: resultImage, pageId: pageDBId, amountPage: maxPage,
  }
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

export const overridePertermService = async ({ overide, newPage }, documentId) => {
  const permission = await repo.checkDocumentStatusIs3(documentId)

  if (permission) {
    await Promise.all(overide.map(async (element) => {
      await repo.clearPertermInPage(element.pageId)
      const bodyParser = parser.override(element.pageId, element.token)
      await repo.overidePertermInPage(bodyParser)
      return true
    }))

    const logAddNewPage = await Promise.all(newPage.map(async (element) => {
      const checkPageStatus = await repo.checkIndexInPage(documentId, element.pageIndex)
      if (checkPageStatus) return { pageIndex: element.pageIndex, documentId, status: false }
      const row = await repo.addNewPage(element.pageIndex, element.name, documentId)
      const PageId = row[0]
      const bodyParser = parser.override(PageId, element.token)
      await repo.overidePertermInPage(bodyParser)
      return { pageIndex: element.pageIndex, documentId, status: true }
    }))

    return { overidestatus: true, addNewStatus: logAddNewPage }
  }

  return { overidestatus: false, addNewStatus: [] }
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
