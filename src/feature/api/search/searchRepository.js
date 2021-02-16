import db from '../../../db/initializing'

const searchRepository = {
  selectTermId: async (keyword) => {
    const rows = await db
      .select()
      .from('term_word')
      .where('term', keyword)
    if (rows.length === 0) return null
    if (rows.length !== 1) return false
    const termId = rows[0].term_word_id
    return termId
  },
  selectScoreByTermId: async (termId) => {
    const rows = await db
      .select()
      .from('score')
      .where('index_term_word_id', termId)
    return rows
  },
  selectFinishDocument: async (docId) => {
    const row = await db
      .select('document_id')
      .from('document')
      .where('document_id', docId)
      .andWhere('status_process_document', 6)
      .andWhere('rec_status', 1)
    return row
  },
  selectDcTitle: async (word) => {
    const rows = await db
      .select('document_id', 'DC_title')
      .from('document')
      .where('DC_title', 'like', `%${word}%`)

    return rows
  },
}

export default searchRepository
