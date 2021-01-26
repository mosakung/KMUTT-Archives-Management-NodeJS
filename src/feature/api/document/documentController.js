import parser from './parserDocument'
import {
  getDocumentService,
  insertDocumentService,
  uploadDocumentService,
  softDeleteDocumentService,
  updateDocumentService,
  pdfDocumentService,
} from './documentService'

import isDate from '../../../utils/date/isDate'

export const getDocumentController = async (pk) => {
  const respones = await getDocumentService(pk)
  if (!respones) {
    return { statusQuery: false }
  }

  return { statusQuery: true, ...respones }
}

export const insertDocumentController = async (req, context) => {
  const body = { ...req }

  const document = parser.document(body, context)

  if (!document) {
    return { status: false, message: 'paserDocument is false', prevBody: {} }
  }

  if (document.DC_contributor === null && document.DC_contributor_role !== null) {
    return { status: false, message: 'was contributor role but no contributor', prevBody: {} }
  }

  const respones = await insertDocumentService(document, context)

  if (!respones) {
    return { status: false, message: 'respones is false', prevBody: {} }
  }

  return respones
}

export const updateDocumentController = async (documentId, body) => {
  if (body.issuedDate !== '' && body.issuedDate !== null && isDate(body.issuedDate)) return { error: 'issued date is not date', prevBody: body }
  return updateDocumentService(documentId, body)
}

export const uploadDocumentController = async (parent, args) => uploadDocumentService(args.file)

export const softDeleteDocumentController = async (documentId) => softDeleteDocumentService(documentId)

export const pdfDocumentController = async (documentId) => pdfDocumentService(documentId)

export default {}
