import { documentResolver } from '../api/document/documentSchema'
import { userKeywordResolver } from '../api/user-keyword/userKeywordSchema'
import { documentStatusResolver } from '../api/document-status/documentStatusSchema'
import { userResolver } from '../api/user/userSchema'
import { searchResolver } from '../api/search/searchSchema'
import { keywordResolver } from '../api/keyword/keywordSchema'

const resolvers = []

resolvers.push(documentResolver)
resolvers.push(userKeywordResolver)
resolvers.push(documentStatusResolver)
resolvers.push(userResolver)
resolvers.push(searchResolver)
resolvers.push(keywordResolver)

export default resolvers
