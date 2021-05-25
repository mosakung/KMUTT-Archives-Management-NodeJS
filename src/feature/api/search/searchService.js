/* Search Feature */
import searchFeature from './feature/informationRetrieval'
import contributorFeature from './feature/contributor'
import contributorRoleFeature from './feature/contributorRole'
import creatorFeature from './feature/creator'
import creatorOrgNameFeature from './feature/creatorOrganizationName'
import publisherFeature from './feature/publisher'
import yearFeature from './feature/year'

/* Hook Page */
import hookDocInPage from './hookDocInPage'

/* Cache */
import pullSearchCache from './cache/pullSearchCache'
import compareSearchInput from './cache/compareSearchInput'
import setSearchCache from './cache/setSearchCache'

const mainSearchService = async (searchSet, page, context, limitPerPage = 10) => {
  const {
    search,
    contributor,
    contributorRole,
    creator,
    creatorOrganizationName,
    publisher,
    year,
  } = searchSet

  const { user } = context

  const prevSearch = pullSearchCache(user.id)

  if (prevSearch) {
    const {
      prevInput,
      foundDocument,
      totalPage,
      rawDocumentRelevance,
      efficiencyInputSearch,
    } = prevSearch

    const sameSearch = compareSearchInput(prevInput, searchSet)
    if (sameSearch) {
      return {
        foundDocument,
        totalPage,
        currPage: page,
        documentRelevance: hookDocInPage(rawDocumentRelevance, page, limitPerPage),
        efficiencyInputSearch,
        errorMessage: null,
      }
    }
  }

  const fulltextSearch = search.join(' ')

  console.log(fulltextSearch)

  const { relevance, log } = await searchFeature(fulltextSearch, search)

  const relevanceIdSet = relevance.map((element) => element.idDocument)

  const relevContributor = await contributorFeature(contributor, relevanceIdSet)

  const relevContributorRole = await contributorRoleFeature(contributorRole, relevContributor)

  const relevCreator = await creatorFeature(creator, relevContributorRole)

  const relevCreatorOrgName = await creatorOrgNameFeature(creatorOrganizationName, relevCreator)

  const relevPublisher = await publisherFeature(publisher, relevCreatorOrgName)

  const relevYear = await yearFeature(year, relevPublisher)

  const result = relevYear.map((documentId) => ({
    documentId,
    relevanceScore: relevance.find((element) => element.idDocument === documentId).relevanceScore,
  }))

  const foundDocument = result.length
  const totalPage = Math.max(1, Math.ceil(result.length / limitPerPage))
  const efficiencyInputSearch = {
    fulltext: search,
    keywordDeepcut: log,
  }

  console.log(efficiencyInputSearch)

  setSearchCache({
    userId: user.id,
    prevInput: searchSet,
    foundDocument,
    totalPage,
    rawDocumentRelevance: result,
    efficiencyInputSearch,
  })

  return {
    foundDocument,
    totalPage,
    currPage: page,
    documentRelevance: hookDocInPage(result, page, limitPerPage),
    efficiencyInputSearch,
    errorMessage: null,
  }
}
export default mainSearchService
