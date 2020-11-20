import { documentResolver } from '../api/document/documentSchema'
import { userKeywordResolver } from '../api/user-keyword/userKeywordSchema'
import { documentStatusResolver } from '../api/document-status/documentStatusSchema'

const resolvers = []

resolvers.push(documentResolver)
resolvers.push(userKeywordResolver)
resolvers.push(documentStatusResolver)

export default resolvers
