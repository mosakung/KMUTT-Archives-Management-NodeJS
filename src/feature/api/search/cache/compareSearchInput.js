const compareSearchInput = (prevInput, newInput) => {
  let result = true

  Object.keys(newInput).forEach((key) => {
    if (newInput[key].length !== prevInput[key].length) result = false

    newInput[key].sort()
    prevInput[key].sort()

    newInput[key].forEach((element, index) => {
      if (element !== prevInput[key][index]) result = false
    })
  })

  return result
}

export default compareSearchInput
