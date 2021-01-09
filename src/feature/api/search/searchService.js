import djangoRequest from '../../django-request/djangoRequest'
import repo from './searchRepository'
import parser from './parserScore'

export const searchService = async (fulltext) => {
  const resDjango = await djangoRequest.post('deepcut/', { fulltext }, true)
  const { tokens } = resDjango.output
  const lengthToken = tokens.length

  const keySearch = tokens.filter((x) => x !== ' ')

  const retrievalTerm = await Promise.all(keySearch.map(async (element) => ({ termId: await repo.selectTermId(element), keyword: element })))
  const keywordDeepcut = retrievalTerm.map((element) => ({ keyword: element.keyword, used: element.termId !== null }))

  const keywordSet = retrievalTerm.filter((element) => element.termId)

  const retrievalScore = await Promise.all(keywordSet.map(async (element) => {
    const rowScores = await repo.selectScoreByTermId(element.termId)
    return rowScores
  }))

  const retrievalSet = parser.restructRetrievalScore(retrievalScore)
  const uniqueDocument = parser.crateUnique(retrievalSet)

  const relevanceScoreSet = parser.crateDicRelevance(uniqueDocument, retrievalSet)

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

  const result = {
    documentRelevance: documentRelevanceSet,
    efficiencyInputSearch: {
      fulltext,
      keywordDeepcut,
    },
  }

  return result
}

export default {}