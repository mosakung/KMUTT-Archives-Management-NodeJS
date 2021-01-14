import repo from '../userKeywordRepository'
import parser from '../parserUserKeyword'

const insertUserKeyword = async (keywords, documentPk) => {
  const insertBodySet = parser.bodyInsertUserKeyword(keywords, documentPk)

  const manageKeywordLog = await Promise.all(
    insertBodySet.map(async (insertBody) => {
      const { keywordDC, documentId } = {
        keywordDC: insertBody.DC_keyword,
        documentId: insertBody.index_document_id,
      }
      const alreadyStatus = await repo.alreadyKeyword(keywordDC, documentId)
      if (alreadyStatus.length !== 0) {
        return {
          keyword: keywordDC,
          status: false,
          message: `already keyword in document (pls delete "${keywordDC}" keyword)`,
        }
      }
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
        return { keyword: keywordDC, status: true, message: 'new term(y) | new score(y) | update tag user(y)' }
      }
      const termId = termRow[0].term_word_id
      const scoreRow = await repo.alreadyScore(termId, documentId)
      if (scoreRow.length === 0) {
        await repo.increaseTerm(termId)
        await repo.insertScore(termId, documentId)
        await repo.updateIdfTerm(termId)
        await repo.updateTfdfDocument(documentId)
        return { keyword: keywordDC, status: true, message: 'new term(n) | new score(y) | update tag user(y)' }
      }
      const scoreId = scoreRow[0].score_id
      await repo.scoreMarkTagUser(scoreId)
      await repo.updateIdfTerm(termId)
      await repo.updateTfdfDocument(documentId)
      return { keyword: keywordDC, status: true, message: 'new term(n) | new score(n) | update tag user(y)' }
    }),
  )

  return manageKeywordLog
}

export default insertUserKeyword
