const parserKeyword = {
  keyword: (keywordSet) => keywordSet.map((set) => set.tag),
  userKeyword: (keywordSet) => keywordSet.map((set) => set.DC_keyword),
  insertShowKeyword: (keywords, documentId) => keywords.map((keyword) => ({ tag: keyword, index_document_id: documentId })),
}

export default parserKeyword
