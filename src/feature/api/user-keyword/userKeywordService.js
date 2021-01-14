import repo from './userKeywordRepository'
import parser from './parserUserKeyword'
import intersectArray from '../../../utils/array/intersectArray'
import subtractArrays from '../../../utils/array/subtractArray'
import { insertUserKeyword, deleteUserKeyword } from './private'

export const tagInDocumentService = async (documentId) => {
  const result = await repo.viewUserKeywordRepository(documentId)
  return parser.debViewUserKeyword(result)
}
export const generateTagForAddService = async (documentId, limit = 10) => {
  const result = await repo.selectTopNTag(documentId, limit)
  return result
}
export const putDocumentDoneService = async (documentId) => {
  const permission = await repo.alreadyStatus5Document(documentId)
  if (!permission) return false
  await repo.updateDocmentDone(documentId)
  return true
}
export const overrideUserKeywordService = async (keywords, documentId) => {
  const rawOldKeyword = await repo.viewUserKeywordRepository(documentId)
  const oldKeyword = parser.debViewUserKeyword(rawOldKeyword)
  const newTag = subtractArrays(keywords, oldKeyword)
  const norTag = intersectArray(keywords, oldKeyword)
  const delTag = subtractArrays(oldKeyword, keywords)
  const logAddTag = await insertUserKeyword(newTag, documentId)
  const logDelTag = await deleteUserKeyword(delTag, documentId)
  const result = parser.mergeLog(norTag, logAddTag, logDelTag)
  return result
}

export default {}
