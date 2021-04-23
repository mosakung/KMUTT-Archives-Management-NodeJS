const hookDocInPage = (dr, page, limitPerPage) => {
  const docInPage = dr.slice((page - 1) * limitPerPage, page * limitPerPage)

  return docInPage
}

export default hookDocInPage
