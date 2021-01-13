const parserDocumentStatus = {
  documentStatus: (rows) => {
    const defineParser = rows.map((row) => {
      const d = row.rec_create_at
      const publishs = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
      return ({
        documentId: row.document_id,
        title: row.DC_title,
        name: row.name,
        version: row.version,
        status: row.status_process_document,
        publish: publishs,
        pathImage: row.path_image,
        pageStart: row.page_start,
      })
    })
    return defineParser
  },
  page: (rows) => {
    const defineParser = rows.map((row) => ({
      pageId: row.page_in_document_id,
      index: row.page_index,
      name: row.name,
      status: row.rec_status_confirm,
    }))
    return defineParser
  },
  preterm: (rows) => {
    const defineParser = rows.map((row) => ({
      preTermId: row.pre_term_in_page_id,
      preTerm: row.pre_term,
    }))
    return defineParser
  },
  overide: (pageId, tokens) => tokens.map((token) => ({
    pre_term: token,
    index_page_in_document_id: pageId,
  })),
}

export default parserDocumentStatus
