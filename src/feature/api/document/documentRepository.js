import db from '../../../db/initializing'

const documentRepository = {
  selectDocument: async (pk) => {
    const result = await db
      .select()
      .from('document')
      .andWhere('rec_status', 1)
      .andWhere('document_id', pk)
    return result[0]
  },
  selectDcKeyword: async (pkDocument) => {
    const result = await db.select().from('dc_keyword').where('index_document_id', pkDocument)
    return result
  },
  selectDcRelation: async (pkDocument) => {
    const result = await db.select().from('dc_relation').where('index_document_id', pkDocument)
    return result
  },
  selectDcType: async (pkDocument) => {
    const result = await db.select().from('dc_type').where('index_document_id', pkDocument)
    return result
  },
  selectIndexingContributorDocument: async (pk) => {
    if (pk === null || pk === undefined) return {}
    const result = await db.select().from('indexing_contributor_document').where('indexing_contributor_id', pk)
    return result[0]
  },
  selectIndexingCreatorDocument: async (pk) => {
    if (pk === null || pk === undefined) return {}
    const result = await db.select().from('indexing_creator_document').where('indexing_creator_id', pk)
    return result[0]
  },
  selectIndexingCreatorOrgnameDocument: async (pk) => {
    if (pk === null || pk === undefined) return {}
    const result = await db.select().from('indexing_creator_orgname_document').where('indexing_creator_orgname_id', pk)
    return result[0]
  },
  selectIndexingIssuedDateDocument: async (pk) => {
    if (pk === null || pk === undefined) return {}
    const result = await db.select().from('indexing_issued_date_document').where('indexing_issued_date_id', pk)
    return result[0]
  },
  selectIndexingPublisherDocument: async (pk) => {
    if (pk === null || pk === undefined) return {}
    const result = await db.select().from('indexing_publisher_document').where('indexing_publisher_id', pk)
    return result[0]
  },
  deleteDocumentSoft: async (pk) => db('document').where('document_id', pk).update('rec_status', -1),
}

export default documentRepository
