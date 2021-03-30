const parserInformationRetrieval = {
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
  mergeDocumentRelevance: (rowsTitleSet, rowsInformationRetrieval) => {
    rowsTitleSet.forEach((set) => {
      set.forEach((el) => {
        rowsInformationRetrieval.unshift({ idDocument: el.document_id, relevanceScore: -1 })
      })
    })
    return rowsInformationRetrieval
  },
  extendSimilarWord: (mainToken, similarToken, size, thershold) => {
    const resultToken = []
    similarToken.forEach((elSimilar) => {
      const valueElement = []
      elSimilar.value.sort((n1, n2) => n2.score - n1.score)
      elSimilar.value.forEach((elValue) => {
        if (valueElement.length < size && elValue.score >= thershold) {
          valueElement.push(elValue.token)
        }
      })
      resultToken.push(...valueElement)
    })
    return [...mainToken, ...resultToken]
  },
  uniqueRelevance: (arrObj) => {
    const unique = []
    const result = []
    arrObj.forEach((element) => {
      const { idDocument } = element
      if (!unique.includes(idDocument)) {
        unique.push(idDocument)
        result.push(element)
      }
    })
    return result
  },
}

export default parserInformationRetrieval
