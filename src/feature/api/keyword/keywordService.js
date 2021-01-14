import repo from './keywordRepository'
import parser from './parserKeyword'

export const tagInDocumentService = async (documentId) => {
  const check = await repo.checkStatus6Document(documentId)
  if (!check) return []
  const tagSet = await repo.selectShowTagInDocument(documentId)
  const result = parser.keyword(tagSet)
  return result
}

export const generateTagForShowService = async (documentId) => {
  const check = await repo.checkStatus5Document(documentId)
  if (!check) return []
  const dcKeywords = await repo.selectDcKeyword(documentId)
  const userKeyword = parser.userKeyword(dcKeywords)
  const lenOfUserKeyword = userKeyword.length
  const systemKeyword = await repo.selectTopNTag(documentId, 10 - lenOfUserKeyword)
  const result = userKeyword.concat(systemKeyword)

  return result
}

export const insertTagForShowService = async (documentId, newTag) => {
  const check = await repo.checkStatus5Document(documentId)
  if (!check) return false
  const perInsert = parser.insertShowKeyword(newTag, documentId)
  const result = await repo.insertShowTag(perInsert)
  if (!result) return false
  await repo.updateDocumentStatusToDone(documentId)
  return true
}

export default { }
