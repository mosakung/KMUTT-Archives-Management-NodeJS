import cron from 'node-cron'
import updateTfIdf from './updateTfIdf'

const cornTFIDF = cron.schedule('0 1 * * *', () => {
  console.log('Running Update TF-IDF job at 01:00 at Asia/Bangkok timezone (GMT+7)...')
  updateTfIdf().then((res) => {
    const { idfAR, tfIdfAR } = res
    console.log(`${idfAR} row update IDF score`)
    console.log(`${tfIdfAR} row update TFIDF score`)
    console.log('Update TF-IDF job Success')
  }).catch((err) => {
    console.error('Update TF-IDF job ERROR\n', err.message)
  })
}, {
  scheduled: true,
  timezone: 'Asia/Bangkok',
})

export default cornTFIDF
