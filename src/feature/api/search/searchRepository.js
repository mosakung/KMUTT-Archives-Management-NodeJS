import db from '../../../db/initializing'

const searchRepository = {
  selectTermId: async (keyword) => {
    const rows = await db.select().from('term_word').where('term', keyword)
    if (rows.length === 0) return null
    if (rows.length !== 1) return false
    const termId = rows[0].term_word_id
    return termId
  },
  selectScoreByTermId: async (termId) => {
    const rows = await db.select().from('score').where('index_term_word_id', termId)
    return rows
  },
}

export default searchRepository
