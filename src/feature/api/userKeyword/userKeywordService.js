import * as repo from './userKeywordRepository'
import { parserDebViewUserKeyword, parserBodyInsertUserKeyword } from './parserUserKeyword'

export const viewUserKeywordService = async (id) => {
  const rows = await repo.viewUserKeywordRepository(id)
  const result = parserDebViewUserKeyword(rows)
  return result
}

export const insertUserKeywordService = async (body) => {
  const insertBodySet = parserBodyInsertUserKeyword(body)

  const manageKeywordLog = await Promise.all(
    insertBodySet.map(async (insertBody) => {
      const { keywordDC, documentId } = {
        keywordDC: insertBody.DC_keyword,
        documentId: insertBody.index_document_id,
      }
      const alreadyStatus = await repo.alreadyKeyword(keywordDC, documentId)
      if (alreadyStatus.length !== 0) { return { status: false, message: `already keyword in document (pls delete "${keywordDC}" keyword)` } }
      const log = await repo.insertUserKeywordRepository(insertBody)
      const keywordRow = await repo.convertIdToUserKeyword(log[0])
      const rawKeyword = keywordRow[0].DC_keyword
      const termRow = await repo.alreadyTerm(rawKeyword)
      if (termRow.length === 0) {
        const newTermRow = await repo.insertTerm(rawKeyword)
        const newTermId = newTermRow[0]
        await repo.insertScore(newTermId, documentId)
        await repo.updateIdfTerm(newTermId)
        await repo.updateTfdfDocument(documentId)
        return { status: true, message: 'new term(y) | new score(y) | update tag user(y)' }
      }
      const termId = termRow[0].term_word_id
      const scoreRow = await repo.alreadyScore(termId, documentId)
      if (scoreRow.length === 0) {
        await repo.increaseTerm(termId)
        await repo.insertScore(termId, documentId)
        await repo.updateIdfTerm(termId)
        await repo.updateTfdfDocument(documentId)
        return { status: true, message: 'new term(n) | new score(y) | update tag user(y)' }
      }
      const scoreId = scoreRow[0].score_id
      await repo.scoreMarkTagUser(scoreId)
      await repo.updateIdfTerm(termId)
      await repo.updateTfdfDocument(documentId)
      return { status: true, message: 'new term(n) | new score(n) | update tag user(y)' }
    }),
  )

  return manageKeywordLog
}

export const DeleteUserKeywordService = async ({ keywordsId, idDocument }) => {
  const keywordRow = await repo.getKeyword(keywordsId)
  const keyword = keywordRow[0].DC_keyword
  if (keywordRow === 0) return { status: false, message: `not found keyword ID ${keywordsId}` }
  const termRow = await repo.alreadyTerm(keyword)
  const termId = termRow[0].term_word_id
  const scoreRow = await repo.alreadyScore(termId, idDocument)
  const scoreId = scoreRow[0].score_id
  const scoreTf = scoreRow[0].score_tf

  if (scoreTf === 0) {
    await repo.deleteScore(scoreId)
    await repo.decreaseTerm(termId)
    await repo.updateIdfTerm(termId)
    await repo.deleteKeyword(keywordsId)
    return { status: true, message: 'delete score | decrease term | update IDF | delete keyword' }
  }
  await repo.scoreMarkTagSystem(scoreId)
  await repo.updateTfdfDocument(idDocument)
  await repo.deleteKeyword(keywordsId)
  return { status: true, message: 'change tag to system | update TF-IDF | delete keyword' }
}

export default {}
