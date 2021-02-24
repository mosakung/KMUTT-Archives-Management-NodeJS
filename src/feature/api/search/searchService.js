import djangoRequest from '../../django-request/djangoRequest'
import repo from './searchRepository'
import parser from './parserScore'

export const searchService = async (fulltext, similarSize = 2, similarThreshold = 0.72) => {
  const resDjango = await djangoRequest.post('deepcut/', { fulltext }, true)
  const { tokens, similarTokens } = resDjango.output
  const lengthToken = tokens.length

  const keySearchCleanSpace = tokens.filter((x) => x !== ' ')

  const tokenPsSimilar = parser.extendSimilarWord(keySearchCleanSpace, similarTokens, similarSize, similarThreshold)

  const keySearch = tokenPsSimilar.map((key) => key.replace(/\s+/g, ''))

  const retrievalTerm = await Promise.all(keySearch.map(async (element) => ({ termId: await repo.selectTermId(element), keyword: element })))
  const keywordDeepcut = retrievalTerm.map((element) => ({ keyword: element.keyword, used: element.termId !== null }))

  const keywordSet = retrievalTerm.filter((element) => element.termId)

  const retrievalScore = await Promise.all(keywordSet.map(async (element) => {
    const rowScores = await repo.selectScoreByTermId(element.termId)
    return rowScores
  }))

  const retrievalSet = parser.restructRetrievalScore(retrievalScore)
  const uniqueDocument = parser.crateUnique(retrievalSet)
  const promiseFilterDocument = await Promise.all(uniqueDocument.map(async (docId) => {
    const result = await repo.selectFinishDocument(docId)
    if (result.length === 0) {
      // return docId
      return -1
    }
    return docId
  }))

  const filterDocument = promiseFilterDocument.filter((docId) => (docId !== -1))
  const relevanceScoreSet = parser.crateDicRelevance(filterDocument, retrievalSet)

  const calculateRelevanceScore = (scores, lenTokens) => {
    let sigmaScore = 0
    for (let i = 0; i < scores.length; i += 1) {
      sigmaScore += scores[i]
    }
    let sigmaSqr2Score = 0
    for (let i = 0; i < scores.length; i += 1) {
      sigmaSqr2Score += scores[i] ** 2
    }
    const sqrRootScore = Math.sqrt(sigmaSqr2Score)
    const partUnder = Math.sqrt(lenTokens * sqrRootScore)
    if (partUnder === 0) return 0
    const scoreResult = sigmaScore / partUnder
    return scoreResult
  }

  const documentRelevanceSet = relevanceScoreSet.map((element) => {
    const score = calculateRelevanceScore(element.score, lengthToken)
    return { idDocument: element.docId, relevanceScore: score }
  })

  documentRelevanceSet.sort((n1, n2) => n2.relevanceScore - n1.relevanceScore)

  const originalToken = fulltext.trim().split(' ')

  const titleSearchSet = await Promise.all(originalToken.map(async (oriToken) => repo.selectDcTitle(oriToken)))

  // const documentRelevanceResult = []
  const documentRelevanceResult = parser.mergeDocumentRelevance(titleSearchSet, documentRelevanceSet)

  const documentRelevanceResultUnique = parser.uniqueRelevance(documentRelevanceResult)

  const result = {
    foundDocument: documentRelevanceSet.length,
    documentRelevance: documentRelevanceResultUnique,
    efficiencyInputSearch: {
      fulltext,
      keywordDeepcut,
    },
  }

  return result
}

export default {}
