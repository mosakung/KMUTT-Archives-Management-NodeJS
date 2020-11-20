import { viewUserKeywordService, insertUserKeywordService, DeleteUserKeywordService } from './userKeywordService'

// export const viewUserKeywordController = ({ idDocument }) => viewUserKeywordService(idDocument)
export const viewUserKeywordController = ({ idDocument }, context) => {
  console.log(context)
  return viewUserKeywordService(idDocument)
}

export const insertUserKeywordController = async (req) => {
  const body = { ...req }
  return insertUserKeywordService(body)
}

export const DeleteUserKeywordController = (req) => {
  const body = { ...req }
  return DeleteUserKeywordService(body)
}

export default {}
