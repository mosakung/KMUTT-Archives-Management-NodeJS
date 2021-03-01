import db from '../../../db/initializing'

const updateTfIdf = async () => {
  const timestamp = db.fn.now()
  const rowCountDocRaw = await db('document').count('document_id as value').where('rec_status', 1).andWhereBetween('status_process_document', [5, 6])
  const N = rowCountDocRaw[0].value
  try {
    await db('term_word').update({ score_idf: db.raw(`?? / ${N}`, ['frequency']), rec_modified_at: timestamp })
  } catch {
    console.error('update idf error (corn-job)')
  }
  try {
    // eslint-disable-next-line max-len
    const resUpdate = await db.raw('UPDATE `score` SET`score_tf_idf` = score.score_tf * (SELECT score_idf FROM term_word tw WHERE tw.term_word_id = score.index_term_word_id)')
    return resUpdate
  } catch {
    console.error('update tfidf error (corn-job)')
  }
  return false
}

export default updateTfIdf
