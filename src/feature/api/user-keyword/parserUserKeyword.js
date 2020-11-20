export const parserDebViewUserKeyword = (param) => {
  const defineParser = param.map((row) => ({
    id: row.DC_keyword_id,
    keyword: row.DC_keyword,
  }))
  return defineParser
}

export const parserBodyInsertUserKeyword = (param) => {
  const { keywords, idDocument } = param
  const defineParser = keywords.map((row) => ({
    DC_keyword: row,
    index_document_id: idDocument,
  }))
  return defineParser
}
export default {}
