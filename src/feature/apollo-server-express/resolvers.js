import { documentResolver } from '../api/document/documentSchema'
import { userKeywordResolver } from '../api/user-keyword/userKeywordSchema'
import { documentStatusResolver } from '../api/document-status/documentStatusSchema'
import { userResolver } from '../api/user/userSchema'

const resolvers = []

resolvers.push(documentResolver)
resolvers.push(userKeywordResolver)
resolvers.push(documentStatusResolver)
resolvers.push(userResolver)

export default resolvers
