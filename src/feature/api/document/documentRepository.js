import db from '../../../db/initializing'

const documentRepository = {
  selectDocuments: async () => {
    const result = await db.select().from('document').where('status_process_document', 6)

    return result
  },
  selectDocument: async (pk) => {
    const result = await db.select().from('document').where('status_process_document', 6).andWhere('document_id', pk)
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
  selectTopNTag: async (pk, limit) => {
    const rowScores = await db
      .select('index_term_word_id', 'score_tf_idf', 'score_id')
      .from('score')
      .where('index_document_id', pk)
      .andWhere('rec_status', 1)
      .orderBy('score_tf_idf', 'desc')
      .limit(limit)
    const result = await Promise.all(rowScores.map(async (element) => {
      const rowTerm = await db.select('term').from('term_word').where('term_word_id', element.index_term_word_id)
      return { tag: rowTerm[0].term, scoreId: element.score_id }
    }))
    return result
  },
}

export default documentRepository
