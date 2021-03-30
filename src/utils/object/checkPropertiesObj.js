const checkPropertiesObj = (obj) => {
  const newObj = {}
  Object.keys(obj).forEach((element) => {
    if (obj[element] === '' || obj[element] === undefined) {
      newObj[element] = null
    } else {
      newObj[element] = obj[element]
    }
  })
  return newObj
}

export default checkPropertiesObj
