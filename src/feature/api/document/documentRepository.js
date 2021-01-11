import db from '../../../db/initializing'

export const selectDocuments = async () => {
  const result = await db.select().from('document').where('status_process_document', 5)

  return result
}

export const selectDocument = async (pk) => {
  const result = await db.select().from('document').where('status_process_document', 5).andWhere('document_id', pk)
  return result[0]
}

export const selectDcKeyword = async (pkDocument) => {
  const result = await db.select().from('dc_keyword').where('index_document_id', pkDocument)
  return result
}

export const selectDcRelation = async (pkDocument) => {
  const result = await db.select().from('dc_relation').where('index_document_id', pkDocument)
  return result
}

export const selectDcType = async (pkDocument) => {
  const result = await db.select().from('dc_type').where('index_document_id', pkDocument)
  return result
}

export const selectIndexingContributorDocument = async (pk) => {
  if (pk === null || pk === undefined) return {}
  const result = await db.select().from('indexing_contributor_document').where('indexing_contributor_id', pk)
  return result[0]
}
export const selectIndexingCreatorDocument = async (pk) => {
  if (pk === null || pk === undefined) return {}
  const result = await db.select().from('indexing_creator_document').where('indexing_creator_id', pk)
  return result[0]
}
export const selectIndexingCreatorOrgnameDocument = async (pk) => {
  if (pk === null || pk === undefined) return {}
  const result = await db.select().from('indexing_creator_orgname_document').where('indexing_creator_orgname_id', pk)
  return result[0]
}
export const selectIndexingIssuedDateDocument = async (pk) => {
  if (pk === null || pk === undefined) return {}
  const result = await db.select().from('indexing_issued_date_document').where('indexing_issued_date_id', pk)
  return result[0]
}
export const selectIndexingPublisherDocument = async (pk) => {
  if (pk === null || pk === undefined) return {}
  const result = await db.select().from('indexing_publisher_document').where('indexing_publisher_id', pk)
  return result[0]
}

export default {}
