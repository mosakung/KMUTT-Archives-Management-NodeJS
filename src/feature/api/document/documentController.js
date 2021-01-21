import parser from './parserDocument'
import {
  getDocumentService, insertDocumentService, uploadDocumentService, softDeleteDocumentService, pdfDocumentService,
} from './documentService'

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

  const respones = await insertDocumentService(document, context)

  if (!respones) {
    return { status: false, message: 'respones is false', prevBody: {} }
  }

  return respones
}

export const uploadDocumentController = async (parent, args) => uploadDocumentService(args.file)

export const softDeleteDocumentController = async (documentId) => softDeleteDocumentService(documentId)

export const pdfDocumentController = async (documentId) => pdfDocumentService(documentId)

export default {}
