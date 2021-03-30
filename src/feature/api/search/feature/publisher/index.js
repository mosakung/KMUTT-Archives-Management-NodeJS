import db from '../../../../../db/initializing'

const publisherFilter = async (filters, docIdArr) => {
  if (filters.length === 0) return docIdArr

  const subQueryPublisher = db.select('indexing_publisher_id').from('indexing_publisher_document').whereIn('publisher', filters)

  const rows = await db
    .select('document_id')
    .from('document')
    .whereIn('document_id', docIdArr)
    .whereIn('index_publisher', subQueryPublisher)
    .distinct()

  const result = rows.map((row) => row.document_id)

  return result
}

export default publisherFilter
