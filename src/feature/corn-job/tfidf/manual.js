import upTFIDF from './updateTfIdf'

console.log('Start update TFIDF score...')

upTFIDF().then((res) => {
  console.log(`${res[0].affectedRows} row update TFIDF score`)
  process.exit(0)
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
