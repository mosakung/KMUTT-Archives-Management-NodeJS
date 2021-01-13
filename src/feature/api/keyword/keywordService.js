import repo from './keywordRepository'

export const setStatusKeywordService = async (scoreId, status) => {
  const parseStatus = status === 'set' ? 1 : 0
  const row = await Promise.all(scoreId.map(async (id) => repo.editStatusKeyword(id, parseStatus)))
  if (row.length === 0) {
    return { status: false, message: 'update fail' }
  }
  return { status: true, message: 'update success' }
}

export default { }
