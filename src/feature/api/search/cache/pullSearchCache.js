const pullSearchCache = (userId) => {
  const { searchCache } = global.search_setting

  const found = searchCache.find((cache) => cache.userId === userId)
  if (found === undefined) return false

  return found
}

export default pullSearchCache
