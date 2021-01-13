import { setStatusKeywordService } from './keywordService'

export const setStatusKeywordController = async ({ scoreId, status }) => setStatusKeywordService(scoreId, status)

export default { }
