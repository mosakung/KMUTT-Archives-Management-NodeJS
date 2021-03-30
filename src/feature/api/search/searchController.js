import mainSearchService from './searchService'

export const searchController = async (searchSet) => {
  const { year } = searchSet
  const modeFilterYear = year.length

  if (!(modeFilterYear >= 0 && modeFilterYear < 2)) return { foundDocument: 0, errorMessage: 'input relevanceYear worng structure' }

  const result = await mainSearchService(searchSet)

  return result
}

export default {}
