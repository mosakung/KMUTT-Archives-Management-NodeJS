import db from '../../../../../db/initializing'

const contributorRoleFilter = async (filters, docIdArr) => {
  if (filters.length === 0) return docIdArr

  const subqueryRole = db
    .select('index_contributor')
    .from('indexing_contributor_role_document')
    .whereIn('contributor_role', filters)
  const rows = await db
    .select('index_document_id')
    .from('dc_contributors')
    .whereIn('index_document_id', docIdArr)
    .whereIn('index_contributor_id', subqueryRole)
    .distinct()

  const result = rows.map((row) => row.index_document_id)

  return result
}

export default contributorRoleFilter
