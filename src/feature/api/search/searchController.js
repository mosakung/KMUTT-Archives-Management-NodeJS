import { searchService } from './searchService'

export const searchController = async (fulltext) => searchService(fulltext)

export default {}
