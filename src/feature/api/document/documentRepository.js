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
  overrideContributorDocument: async (body, documentId) => {
    const bodyFind = body.find((x) => x.indexname === 'contributor')
    const globalIndexContributor = -1
    if (!bodyFind) return false
    const { indexTerm, newValue } = bodyFind
    if (indexTerm) {
      await db('document')
        .where('document_id', documentId)
        .andWhere('rec_status', 1)
        .update('index_contributor', null)
      await db('indexing_contributor_document')
        .where('indexing_contributor_id', indexTerm)
        .decrement('frequency', 1)
    }
    if (newValue) {
      const rowIndex = await db
        .select()
        .from('indexing_contributor_document')
        .where('contributor', newValue)
      if (rowIndex.length !== 0) {
        await db('indexing_contributor_document')
          .where('indexing_contributor_id', rowIndex[0].indexing_contributor_id)
          .increment('frequency', 1)
        await db('document')
          .where('document_id', documentId)
          .andWhere('rec_status', 1)
          .update('index_contributor', rowIndex[0].indexing_contributor_id)
        return rowIndex[0].indexing_contributor_id
      }
      const inputPk = await db('indexing_contributor_document')
        .insert({ contributor: newValue, frequency: 1 })
      await db('document')
        .where('document_id', documentId)
        .andWhere('rec_status', 1)
        .update('index_contributor', inputPk)
      return inputPk[0]
    }
    return globalIndexContributor
  },
  manageContributorRole: async (body, indexContributor) => {
    const bodyFind = body.find((x) => x.indexname === 'contributor_role')
    if (!bodyFind) return false
    const { newValue } = bodyFind
    if (newValue) {
      const rows = await db
        .select()
        .from('indexing_contributor_role_document')
        .where('index_contributor', indexContributor)
      const wasRole = rows.map((row) => {
        if (row.contributor_role === newValue) return true
        return false
      })
      if (!wasRole.includes(true)) {
        await db('indexing_contributor_role_document')
          .insert({ contributor_role: newValue, index_contributor: indexContributor })
      }
    }
    return true
  },
}

export default documentRepository
