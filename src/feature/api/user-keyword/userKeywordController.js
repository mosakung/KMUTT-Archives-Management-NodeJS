import {
  tagInDocumentService, generateTagForAddService, putDocumentDoneService, overrideUserKeywordService,
} from './userKeywordService'

export const tagInDocumentController = async (documentId) => tagInDocumentService(documentId)
export const generateTagForAddController = async (documentId, limit) => generateTagForAddService(documentId, limit)
export const putDocumentDoneController = async (documentId) => putDocumentDoneService(documentId)
export const overrideUserKeywordController = async (keywords, documentId) => overrideUserKeywordService(keywords, documentId)

export default {}
