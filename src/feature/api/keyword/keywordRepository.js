import db from '../../../db/initializing'

const keywordRepository = {
  checkStatus5Document: async (documentId) => {
    const result = await db
      .select()
      .from('document')
      .where('rec_status', 1)
      .andWhere('document_id', documentId)
      .andWhere('status_process_document', 5)
    if (result.length !== 0) return true
    return false
  },
  checkStatus6Document: async (documentId) => {
    const result = await db
      .select()
      .from('document')
      .where('rec_status', 1)
      .andWhere('document_id', documentId)
      .andWhere('status_process_document', 6)
    if (result.length !== 0) return true
    return false
  },
  selectShowTagInDocument: async (documentId) => {
    const result = await db.select().from('show_tag_in_document').where('index_document_id', documentId)
    return result
  },
  selectDcKeyword: async (documentId) => {
    const result = await db.select().from('dc_keyword').where('index_document_id', documentId)
    return result
  },
  selectTopNTag: async (pk, limit) => {
    const rowScores = await db
      .select('index_term_word_id', 'score_tf_idf', 'score_id')
      .from('score')
      .where('index_document_id', pk)
      .andWhere('generate_by', 'init-system')
      .andWhere('rec_status', 1)
      .orderBy('score_tf_idf', 'desc')
      .limit(limit)
    const result = await Promise.all(rowScores.map(async (element) => {
      const rowTerm = await db.select('term').from('term_word').where('term_word_id', element.index_term_word_id)
      return rowTerm[0].term
    }))
    return result
  },
  insertShowTag: async (body) => db('show_tag_in_document').insert(body),
  updateDocumentStatusToDone: async (documentId) => db('document').where('document_id', documentId).update('status_process_document', 6),
}

export default keywordRepository
