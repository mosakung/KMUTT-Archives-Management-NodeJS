import db from '../../../db/initializing'

const keywordRepository = {
  editStatusKeyword: async (scoreId, status) => {
    await db('score')
      .update('rec_status', status)
      .where('score_id', scoreId)
    return db.select('rec_status', 'score_id')
      .from('score')
      .where('score_id', scoreId)
  },
}

export default keywordRepository
