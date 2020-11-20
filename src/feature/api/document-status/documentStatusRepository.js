import db from '../../../db/initializing'

export const selectDocumentNotDone = async (userId) => {
  const result = await db
    .select('document_id', 'name', 'version', 'status_process_document')
    .from('document')
    .where('rec_create_by', userId)
  return result
}

export const selectDocumentById = async (documentId, userId) => {
  const result = await db
    .select('document_id', 'name', 'version', 'status_process_document')
    .from('document')
    .where('document_id', documentId)
    .andWhere('rec_create_by', userId)
  return result
}

export const selectPageInDocument = async (documentId) => db.select().from('page_in_document').where('index_document_id', documentId)

export const selectPretermInPage = async (pageId) => db.select().from('pre_term_in_page').where('index_page_in_document_id', pageId)

export const insertPreterm = async (newPreterm, pageId) => {
  const row = await db
    .insert({ pre_term: newPreterm, index_page_in_document_id: pageId })
    .from('pre_term_in_page')
  const id = row[0]
  const result = await db.select('pre_term_in_page_id', 'pre_term').from('pre_term_in_page').where('pre_term_in_page_id', id)
  return result
}

export const editPreterm = async (newPreterm, preTermId) => {
  await db('pre_term_in_page')
    .update('pre_term', newPreterm)
    .where('pre_term_in_page_id', preTermId)
  const result = await db.select('pre_term_in_page_id', 'pre_term').from('pre_term_in_page').where('pre_term_in_page_id', preTermId)
  return result
}

export const deletePreterm = async (preTermId) => {
  const result = await db('pre_term_in_page')
    .where('pre_term_in_page_id', preTermId)
    .del()
  return result
}

export const updatePageStatus = async (pageId, status) => {
  const result = await db('page_in_document')
    .update('rec_status_confirm', status)
    .where('page_in_document_id', pageId)
  return result
}

export default {}
