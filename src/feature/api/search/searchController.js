import mainSearchService from './searchService'

export const searchController = async (searchSet, page, context) => {
  const { year } = searchSet

  const yearInt = year.map((el) => parseInt(el, 10))

  const modeFilterYear = yearInt.length

  if (!(modeFilterYear >= 0 && modeFilterYear <= 2)) return { foundDocument: 0, errorMessage: 'input relevanceYear worng structure' }

  const newBodySearchSet = { ...searchSet, year: yearInt }

  const result = await mainSearchService(newBodySearchSet, page, context)

  return result
}

export default {}
