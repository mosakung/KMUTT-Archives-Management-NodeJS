import db from '../../../../../db/initializing'

const yearFilter = async (year, docIdArr) => {
  if (year.length === 0) return docIdArr

  const fulltextStartDate = `${year[0]}-01-01`
  let fulltextEndDate = `${year[0]}-12-31`

  if (year.length === 2) fulltextEndDate = `${year[1]}-12-31`

  const startDate = new Date(fulltextStartDate)
  const endDate = new Date(fulltextEndDate)

  const subQueryIssuedDate = db
    .select('indexing_issued_date_id')
    .from('indexing_issued_date_document')
    .whereBetween('issued_date', [startDate, endDate])

  const rows = await db
    .select('document_id')
    .from('document')
    .whereIn('document_id', docIdArr)
    .whereIn('index_issued_date', subQueryIssuedDate)
    .andWhere('status_process_document', 6)
    .distinct()

  const result = rows.map((row) => row.document_id)

  return result
}

export default yearFilter
