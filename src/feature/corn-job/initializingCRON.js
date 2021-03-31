import cornTFIDF from './tfidf/cron'

const initializingCRON = {
  start: () => {
    cornTFIDF.start()
  },
  stop: () => {
    cornTFIDF.stop()
  },
  destroy: () => {
    cornTFIDF.destroy()
  },
}

export default initializingCRON
