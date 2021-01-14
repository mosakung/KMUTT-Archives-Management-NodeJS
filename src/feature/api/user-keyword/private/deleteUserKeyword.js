import repo from '../userKeywordRepository'

const deleteUserKeyword = async (keywords, documentId) => {
  const manageKeywordLog = await Promise.all(keywords.map(async (keyword) => {
    const rowDcKeyword = await repo.getKeywordByString(keyword, documentId)
    if (rowDcKeyword.length === 0) return { keyword, status: false, message: `not found keyword ${keyword}` }
    const keywordId = rowDcKeyword[0].DC_keyword_id
    const termRow = await repo.alreadyTerm(keyword)
    const termId = termRow[0].term_word_id
    const scoreRow = await repo.alreadyScore(termId, documentId)
    const scoreId = scoreRow[0].score_id
    const scoreTf = scoreRow[0].score_tf

    if (scoreTf === 0) {
      await repo.deleteScore(scoreId)
      await repo.decreaseTerm(termId)
      await repo.updateIdfTerm(termId)
      await repo.deleteKeyword(keywordId)
      return { keyword, status: true, message: 'delete score | decrease term | update IDF | delete keyword' }
    }
    await repo.scoreMarkTagSystem(scoreId)
    await repo.updateTfdfDocument(documentId)
    await repo.deleteKeyword(keywordId)
    return { keyword, status: true, message: 'change tag to system | update TF-IDF | delete keyword' }
  }))

  return manageKeywordLog
}

export default deleteUserKeyword
