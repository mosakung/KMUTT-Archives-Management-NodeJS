import parserDocument from './parserDocument'
import { insertDocumentService } from './documentService'

export const insertDocumentController = async (req) => {
  const body = { ...req }
  const document = parserDocument(body)

  if (!document) {
    return { status: false, message: 'paserDocument is false', prevBody: {} }
  }

  const respones = await insertDocumentService(document)

  if (!respones) {
    return { status: false, message: 'respones is false', prevBody: {} }
  }

  return respones
}

export default {}
