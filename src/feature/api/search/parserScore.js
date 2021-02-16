const parserScore = {
  restructRetrievalScore: (retrievalScore) => {
    const result = []
    retrievalScore.forEach((element) => {
      element.forEach((x) => {
        result.push(x)
      })
    })
    return result
  },
  crateUnique: (retrievalSet) => {
    const unique = [...new Set(retrievalSet.map((data) => data.index_document_id))]
    return unique
  },
  crateDicRelevance: (unique, dataSet) => {
    const dictResult = unique.map((docId) => {
      const score = dataSet.map((element) => {
        if (element.index_document_id === docId) {
          return element.score_tf_idf
        }
        return false
      })
      const cleanScore = score.filter((element) => {
        if (element === false) return false
        return true
      })
      return { docId, score: cleanScore }
    })
    return dictResult
  },
  mergeDocumentRelevance: (rowsTitle, rowsInformationRetrieval) => {
    rowsTitle.forEach((el) => {
      rowsInformationRetrieval.unshift({ idDocument: el.document_id, relevanceScore: -1 })
    })
    return rowsInformationRetrieval
  },
}

export default parserScore
