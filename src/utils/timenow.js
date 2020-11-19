export const timeNow = () => {
  const currentdate = new Date()
  return `${((currentdate.getHours() < 10) ? '0' : '') + currentdate.getHours()}:${(currentdate.getMinutes() < 10) ? '0' : ''}${currentdate.getMinutes()}:${(currentdate.getSeconds() < 10) ? '0' : ''}${currentdate.getSeconds()}`
}

export const dateNow = () => {
  const currentdate = new Date()
  return `${((currentdate.getDate() < 10) ? '0' : '') + currentdate.getDate()}/${((currentdate.getMonth() + 1) < 10) ? '0' : ''}${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`
}

export default { dateNow, timeNow }
