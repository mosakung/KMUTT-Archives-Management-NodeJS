import db from '../../../../../db/initializing'

const retrievalDefault = async () => {
  const rows = await db.select().from('document').orderBy('rec_modified_at', 'desc').limit(50)
  const result = rows.map((element) => ({ idDocument: element.document_id, relevanceScore: 0 }))
  return result
}

export default retrievalDefault
