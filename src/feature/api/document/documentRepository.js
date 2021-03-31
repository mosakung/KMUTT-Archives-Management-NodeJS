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
  selectDcContributors: async (pkDocument) => {
    const relationContributors = await db.select().from('dc_contributors').where('index_document_id', pkDocument)
    return relationContributors.map((element) => element.index_contributor_id)
  },
  selectIndexingContributorDocument: async (pk) => {
    if (pk === null || pk === undefined) return {}
    const result = await db.select().from('indexing_contributor_document').where('indexing_contributor_id', pk)
    return result[0].contributor
  },
  selectContributorRoleDocument: async (indexContributor) => {
    if (indexContributor === null || indexContributor === undefined) return []
    const result = await db.select().from('indexing_contributor_role_document').where('index_contributor', indexContributor)
    return result.map((el) => el.contributor_role)
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
  selectIndexingPublisherEmailDocument: async (pk) => {
    if (pk === null || pk === undefined) return {}
    const result = await db.select().from('indexing_publisher_email_document').where('indexing_publisher_email_id', pk)
    return result[0]
  },
  deleteDocumentSoft: async (pk) => db('document').where('document_id', pk).update('rec_status', -1),
  overrideTypeDocument: async (bodyTypes, documentId) => {
    await db('dc_type')
      .where('index_document_id', documentId)
      .del()
    return db('dc_type')
      .insert(bodyTypes)
  },
  overrideRelationDocument: async (bodyRelations, documentId) => {
    await db('dc_relation')
      .where('index_document_id', documentId)
      .del()
    return db('dc_relation')
      .insert(bodyRelations)
  },
  overrideCreatorDocument: async (body, documentId) => {
    const bodyFind = body.find((x) => x.indexname === 'creator')
    if (!bodyFind) return false
    const { indexTerm, newValue } = bodyFind
    if (indexTerm) {
      await db('document')
        .where('document_id', documentId)
        .andWhere('rec_status', 1)
        .update('index_creator', null)
      await db('indexing_creator_document')
        .where('indexing_creator_id', indexTerm)
        .decrement('frequency', 1)
    }
    if (newValue) {
      const rowIndex = await db
        .select()
        .from('indexing_creator_document')
        .where('creator', newValue)
      if (rowIndex.length !== 0) {
        await db('indexing_creator_document')
          .where('indexing_creator_id', rowIndex[0].indexing_creator_id)
          .increment('frequency', 1)
        await db('document')
          .where('document_id', documentId)
          .andWhere('rec_status', 1)
          .update('index_creator', rowIndex[0].indexing_creator_id)
      } else {
        const inputPk = await db('indexing_creator_document')
          .insert({ creator: newValue, frequency: 1 })
        await db('document')
          .where('document_id', documentId)
          .andWhere('rec_status', 1)
          .update('index_creator', inputPk)
      }
    }
    return true
  },
  overrideCreatorOrgnameDocument: async (body, documentId) => {
    const bodyFind = body.find((x) => x.indexname === 'creator_orgname')
    if (!bodyFind) return false
    const { indexTerm, newValue } = bodyFind
    if (indexTerm) {
      await db('document')
        .where('document_id', documentId)
        .andWhere('rec_status', 1)
        .update('index_creator_orgname', null)
      await db('indexing_creator_orgname_document')
        .where('indexing_creator_orgname_id', indexTerm)
        .decrement('frequency', 1)
    }
    if (newValue) {
      const rowIndex = await db
        .select()
        .from('indexing_creator_orgname_document')
        .where('creator_orgname', newValue)
      if (rowIndex.length !== 0) {
        await db('indexing_creator_orgname_document')
          .where('indexing_creator_orgname_id', rowIndex[0].indexing_creator_orgname_id)
          .increment('frequency', 1)
        await db('document')
          .where('document_id', documentId)
          .andWhere('rec_status', 1)
          .update('index_creator_orgname', rowIndex[0].indexing_creator_orgname_id)
      } else {
        const inputPk = await db('indexing_creator_orgname_document')
          .insert({ creator_orgname: newValue, frequency: 1 })
        await db('document')
          .where('document_id', documentId)
          .andWhere('rec_status', 1)
          .update('index_creator_orgname', inputPk)
      }
    }
    return true
  },
  overridePublisherDocument: async (body, documentId) => {
    const bodyFind = body.find((x) => x.indexname === 'publisher')
    if (!bodyFind) return false
    const { indexTerm, newValue } = bodyFind
    if (indexTerm) {
      await db('document')
        .where('document_id', documentId)
        .andWhere('rec_status', 1)
        .update('index_publisher', null)
      await db('indexing_publisher_document')
        .where('indexing_publisher_id', indexTerm)
        .decrement('frequency', 1)
    }
    if (newValue) {
      const rowIndex = await db
        .select()
        .from('indexing_publisher_document')
        .where('publisher', newValue)
      if (rowIndex.length !== 0) {
        await db('indexing_publisher_document')
          .where('indexing_publisher_id', rowIndex[0].indexing_publisher_id)
          .increment('frequency', 1)
        await db('document')
          .where('document_id', documentId)
          .andWhere('rec_status', 1)
          .update('index_publisher', rowIndex[0].indexing_publisher_id)
      } else {
        const inputPk = await db('indexing_publisher_document')
          .insert({ publisher: newValue, frequency: 1 })
        await db('document')
          .where('document_id', documentId)
          .andWhere('rec_status', 1)
          .update('index_publisher', inputPk)
      }
    }
    return true
  },
  overridePublisherEmailDocument: async (body, documentId) => {
    const bodyFind = body.find((x) => x.indexname === 'publisher_email')
    if (!bodyFind) return false
    const { indexTerm, newValue } = bodyFind
    if (indexTerm) {
      await db('document')
        .where('document_id', documentId)
        .andWhere('rec_status', 1)
        .update('index_publisher_email', null)
      await db('indexing_publisher_email_document')
        .where('indexing_publisher_email_id', indexTerm)
        .decrement('frequency', 1)
    }
    if (newValue) {
      const rowIndex = await db
        .select()
        .from('indexing_publisher_email_document')
        .where('publisher_email', newValue)
      if (rowIndex.length !== 0) {
        await db('indexing_publisher_email_document')
          .where('indexing_publisher_email_id', rowIndex[0].indexing_publisher_email_id)
          .increment('frequency', 1)
        await db('document')
          .where('document_id', documentId)
          .andWhere('rec_status', 1)
          .update('index_publisher_email', rowIndex[0].indexing_publisher_email_id)
      } else {
        const inputPk = await db('indexing_publisher_email_document')
          .insert({ publisher_email: newValue, frequency: 1 })
        await db('document')
          .where('document_id', documentId)
          .andWhere('rec_status', 1)
          .update('index_publisher_email', inputPk)
      }
    }
    return true
  },
  overrideIssuedDateDocument: async (body, documentId) => {
    const bodyFind = body.find((x) => x.indexname === 'issued_date')
    if (!bodyFind) return false
    const { indexTerm, newValue } = bodyFind
    if (indexTerm) {
      await db('document')
        .where('document_id', documentId)
        .andWhere('rec_status', 1)
        .update('index_issued_date', null)
      await db('indexing_issued_date_document')
        .where('indexing_issued_date_id', indexTerm)
        .decrement('frequency', 1)
    }
    if (newValue) {
      const rowIndex = await db
        .select()
        .from('indexing_issued_date_document')
        .where('issued_date', newValue)
      if (rowIndex.length !== 0) {
        await db('indexing_issued_date_document')
          .where('indexing_issued_date_id', rowIndex[0].indexing_issued_date_id)
          .increment('frequency', 1)
        await db('document')
          .where('document_id', documentId)
          .andWhere('rec_status', 1)
          .update('index_issued_date', rowIndex[0].indexing_issued_date_id)
      } else {
        const inputPk = await db('indexing_issued_date_document')
          .insert({ issued_date: newValue, frequency: 1 })
        await db('document')
          .where('document_id', documentId)
          .andWhere('rec_status', 1)
          .update('index_issued_date', inputPk)
      }
    }
    return true
  },
  updateDocument: async (body, documnetId) => db('document').where('document_id', documnetId).update(body),
  clearContributor: async (documentId) => {
    const subqueryContributor = db.select('index_contributor_id').from('dc_contributors').where('index_document_id', documentId)
    await db('indexing_contributor_document').whereIn('indexing_contributor_id', subqueryContributor).decrement('frequency', 1)

    const contributorFreqZero = db.select('indexing_contributor_id').from('indexing_contributor_document').where('frequency', 0)
    await db('indexing_contributor_role_document').whereIn('index_contributor', contributorFreqZero).del()

    await db('dc_contributors').where('index_document_id', documentId).del()

    await db('indexing_contributor_document').whereIn('indexing_contributor_id', contributorFreqZero).del()
  },
  overrideContributorDocument: async (contributor, role, documentId) => {
    const subqueryContributor = db
      .select('indexing_contributor_id')
      .from('indexing_contributor_document')
      .where('contributor', contributor)
      .limit(1)

    if ((await subqueryContributor).length === 0) {
      await db('indexing_contributor_document').insert({ contributor, frequency: 1 })
    } else {
      await db('indexing_contributor_document').where('indexing_contributor_id', subqueryContributor).increment('frequency', 1)
    }

    const subqueryContributorRole = db
      .select('indexing_contributor_role_id')
      .from('indexing_contributor_role_document')
      .where('contributor_role', role)
      .andWhere('index_contributor', subqueryContributor)
      .limit(1)

    if ((await subqueryContributorRole).length === 0) {
      await db('indexing_contributor_role_document')
        .insert({ contributor_role: role, index_contributor: subqueryContributor })
    }

    await db('dc_contributors').insert({
      index_contributor_id: subqueryContributor,
      index_document_id: documentId,
    })
  },
}

export default documentRepository
