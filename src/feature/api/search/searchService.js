import searchFeature from './feature/informationRetrieval'

import contributorFeature from './feature/contributor'
import contributorRoleFeature from './feature/contributorRole'
import creatorFeature from './feature/creator'
import creatorOrgNameFeature from './feature/creatorOrganizationName'
import publisherFeature from './feature/publisher'
import yearFeature from './feature/year'

const mainSearchService = async (searchSet) => {
  const {
    search,
    contributor,
    contributorRole,
    creator,
    creatorOrganizationName,
    publisher,
    year,
  } = searchSet

  const { relevance, log } = await searchFeature(search)

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

  return {
    foundDocument: result.length,
    documentRelevance: result,
    efficiencyInputSearch: {
      fulltext: search,
      keywordDeepcut: log,
    },
    errorMessage: null,
  }
}
export default mainSearchService
