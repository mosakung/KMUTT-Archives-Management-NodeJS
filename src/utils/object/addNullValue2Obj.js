const addNullValue2Obj = (obj, keyArr) => {
  const newObj = {}
  keyArr.forEach((key) => {
    newObj[key] = null
  })
  return { ...obj, ...newObj }
}

export default addNullValue2Obj
