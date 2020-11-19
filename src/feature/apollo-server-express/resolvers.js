import { documentResolver } from '../api/document/documentSchema'
import { userKeywordResolver } from '../api/userKeyword/userKeywordSchema'

const resolvers = []

resolvers.push(documentResolver)
resolvers.push(userKeywordResolver)

export default resolvers
