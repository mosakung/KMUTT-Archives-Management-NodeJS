import upTFIDF from './updateTfIdf'

console.log('Start update TFIDF score...')

upTFIDF().then((res) => {
  const { idfAR, tfIdfAR } = res
  console.log(`${idfAR} row update IDF score`)
  console.log(`${tfIdfAR} row update TFIDF score`)
  process.exit(0)
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
