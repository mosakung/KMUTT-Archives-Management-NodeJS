import { parserDocument } from './parserDocument'
import {
  getDocumentService, getDocumentsService, insertDocumentService, uploadDocumentService,
} from './documentService'

export const getDocumentController = async (pk) => {
  const respones = await getDocumentService(pk)

  if (!respones) {
    return { statusQuery: false }
  }

  return { statusQuery: true, ...respones }
}

export const getDocumentsController = async () => {
  const respones = await getDocumentsService()

  if (!respones) {
    return { statusQuery: false, documents: [] }
  }

  return { statusQuery: true, documents: respones }
}

export const insertDocumentController = async (req, context) => {
  console.log('test')
  const body = { ...req }
  console.log('test1', body)
  const document = parserDocument(body, context)
  console.log('test', document)

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

export default {}
