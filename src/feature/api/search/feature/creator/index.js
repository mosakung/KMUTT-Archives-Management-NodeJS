import db from '../../../../../db/initializing'

const creatorFilter = async (filters, docIdArr) => {
  if (filters.length === 0) return docIdArr

  const subQueryCreator = db.select('indexing_creator_id').from('indexing_creator_document').whereIn('creator', filters)

  const rows = await db
    .select('document_id')
    .from('document')
    .whereIn('document_id', docIdArr)
    .whereIn('index_creator', subQueryCreator)
    .distinct()

  const result = rows.map((row) => row.document_id)

  return result
}

export default creatorFilter
