const parserUserKeyword = {
  debViewUserKeyword: (param) => param.map((element) => element.DC_keyword),
  bodyInsertUserKeyword: (keywords, documentId) => {
    const defineParser = keywords.map((row) => ({
      DC_keyword: row,
      index_document_id: documentId,
    }))
    return defineParser
  },
  mergeLog: (norTag, logAddTag, logDelTag) => {
    const logNor = norTag.map((el) => ({ keyword: el, status: true, message: 'normal tag not change' }))
    const mergeLog = [...logNor, ...logAddTag, ...logDelTag]
    return mergeLog
  },
}

export default parserUserKeyword
