import db from '../../../../../db/initializing'

const contributorFilter = async (filters, docIdArr) => {
  if (filters.length === 0) return docIdArr

  const subQueryContributor = db.select('indexing_contributor_id').from('indexing_contributor_document').whereIn('contributor', filters)

  const rows = await db
    .select('index_document_id')
    .from('dc_contributors')
    .whereIn('index_document_id', docIdArr)
    .whereIn('index_contributor_id', subQueryContributor)
    .distinct()

  const result = rows.map((row) => row.index_document_id)

  return result
}

export default contributorFilter
