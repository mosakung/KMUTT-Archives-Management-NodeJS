import db from '../../../../../db/initializing'

const creatorOrgNameFilter = async (filters, docIdArr) => {
  if (filters.length === 0) return docIdArr

  const subQueryCreatorOrgName = db.select('indexing_creator_orgname_id').from('indexing_creator_orgname_document').whereIn('creator_orgname', filters)

  const rows = await db
    .select('document_id')
    .from('document')
    .whereIn('document_id', docIdArr)
    .whereIn('index_creator_orgname', subQueryCreatorOrgName)
    .distinct()

  const result = rows.map((row) => row.document_id)

  return result
}

export default creatorOrgNameFilter
