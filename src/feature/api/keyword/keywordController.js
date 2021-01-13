import { tagInDocumentService, generateTagForShowService, insertTagForShowService } from './keywordService'

export const tagInDocumentController = async (documentId) => tagInDocumentService(documentId)

export const generateTagForShowController = async (documentId) => generateTagForShowService(documentId)

export const insertTagForShowController = async (documentId, newTag) => insertTagForShowService(documentId, newTag)

export default { }
