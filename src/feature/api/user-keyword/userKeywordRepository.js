import db from '../../../db/initializing'

export const viewUserKeywordRepository = async (id) => db.select('DC_keyword_id', 'DC_keyword').from('dc_keyword').where('index_document_id', id)

export const alreadyKeyword = async (keyword, docId) => db
  .select()
  .from('dc_keyword')
  .where('DC_keyword', keyword)
  .andWhere('index_document_id', docId)

export const getKeyword = async (id) => db
  .select('DC_keyword')
  .from('dc_keyword')
  .where('DC_keyword_id', id)

export const deleteKeyword = async (id) => db('dc_keyword').where('DC_keyword_id', id).del()

export const insertUserKeywordRepository = async (insertBody) => db.insert(insertBody).into('dc_keyword')

export const convertIdToUserKeyword = async (id) => db.select('DC_keyword').from('dc_keyword').where('DC_keyword_id', id)

export const alreadyTerm = async (keyword) => db.select('term_word_id').from('term_word').where('term', keyword)

export const alreadyScore = async (idTerm, idDocument) => db
  .select('score_id', 'score_tf')
  .from('score')
  .where('index_term_word_id', idTerm)
  .andWhere('index_document_id', idDocument)

export const insertTerm = async (rawTerm) => db.from('term_word').insert({ term: rawTerm, frequency: 1 })

export const increaseTerm = async (id) => db.from('term_word').increment('frequency', 1).where('term_word_id', id)

export const decreaseTerm = async (id) => {
  const result = await db.from('term_word').decrement('frequency', 1).where('term_word_id', id)
  const termRow = await db.select('frequency').from('term_word').where('term_word_id', id)
  if (termRow[0].frequency === 0) {
    await db('term_word').where('term_word_id', id).del()
  }
  return result
}

export const insertScore = async (termId, documentId) => db.insert({
  score_tf: 0,
  index_term_word_id: termId,
  index_document_id: documentId,
  generate_by: 'init-user',
}).from('score')

export const deleteScore = async (scoreId) => db('score').where('score_id', scoreId).del()

export const scoreMarkTagUser = async (id) => db('score').update('generate_by', 'init-user').where('score_id', id)
export const scoreMarkTagSystem = async (id) => db('score').update('generate_by', 'init-system').where('score_id', id)

export const updateIdfTerm = async (termId) => {
  const timestamp = db.fn.now()
  const row = await db('document').count('document_id as value')
  const N = row[0].value
  return db('term_word').update({ score_idf: db.raw(`?? / ${N}`, ['frequency']), rec_modified_at: timestamp }).where('term_word_id', termId)
}

export const updateTfdfDocument = async (documentId) => {
  const row = await db('score').max('score_tf_idf as max')
  const maxScore = row[0].max
  return db('score').update({ score_tf_idf: maxScore }).where('index_document_id', documentId)
}

export default {}
