import db from '../../../db/initializing'

export const generateIdfScore = async () => {
  const datetimeKnex = db.fn.now()
  const subqueryNDocument = db('document').count('document_id as value').where('rec_status', 1).andWhereBetween('status_process_document', [5, 6])
  const N = (await subqueryNDocument).value

  try {
    const responese = await db('term_word')
      .update({ score_idf: db.raw(`?? / ${N}`, ['frequency']), rec_modified_at: datetimeKnex })
    return responese.affectedRows
  } catch (err) {
    console.error('update idf error (corn-job)\nERROR LOG :', err.message)
    return false
  }
}

export const generateTfIdfScore = async () => {
  const sqlUpdateTfIdf = 'UPDATE `score`'
    + ' SET `score_tf_idf` = score.score_tf * (SELECT score_idf FROM term_word tw WHERE tw.term_word_id = score.index_term_word_id)'
    + ` WHERE \`rec_status\` = ${1}`
    + ' AND `generate_by` = \'init-system\''
    + ' AND index_document_id IN (SELECT document_id FROM `document` WHERE rec_status = 1)'

  try {
    const responeseSystem = await db.raw(sqlUpdateTfIdf)
    const responeseUser = await db('score')
      .whereIn('index_document_id', db.select('document_id').from('document').where('rec_status', 1))
      .andWhere('rec_status', 1)
      .andWhere('generate_by', 'init-user')
      .update({ score_tf_idf: (await db('score').max('score_tf_idf as value')).value })

    const affectedRows = responeseSystem.affectedRows + responeseUser.affectedRows
    return affectedRows
  } catch (err) {
    console.error('update tf-idf error (corn-job)\nERROR LOG :', err.message)
    return false
  }
}

const updateTfIdf = async () => {
  const idfAR = await generateIdfScore()
  const tfIdfAR = await generateTfIdfScore()

  return { idfAR, tfIdfAR }
}

export default updateTfIdf
