export const parserDocumentStatus = (rows) => {
  const defineParser = rows.map((row) => ({
    documentId: row.document_id,
    name: row.name,
    version: row.version,
    status: row.status_process_document,
  }))
  return defineParser
}

export const parserPage = (rows) => {
  const defineParser = rows.map((row) => ({
    pageId: row.page_in_document_id,
    index: row.page_index,
    name: row.name,
    status: row.rec_status_confirm,
  }))
  return defineParser
}

export const parserPreterm = (rows) => {
  const defineParser = rows.map((row) => ({
    preTermId: row.pre_term_in_page_id,
    preTerm: row.pre_term,
  }))
  return defineParser
}

export default {}
