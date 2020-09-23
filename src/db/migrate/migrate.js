import setENV from '../../utils/setENV'
import db from '../initializing'

setENV.config()

const config = { directory: 'src/db/migrate/migrations' }
const command = process.argv[2] || 'latest'
let promise
if (command === 'make') {
  promise = db.migrate.make(process.argv[3], config)
} else {
  promise = db.migrate[command](config)
}
promise.then((result) => {
  switch (command) {
    case 'up':
    case 'latest':
      console.log(`Batch ${result[0]} ran: ${result[1].length} migrations:`)
      return console.log(result[1].join('\n'))
    case 'down':
    case 'rollback':
      console.log(`Batch ${result[0]} rolled back the following migrations:`)
      return console.log(result[1].join('\n'))
    default:
      return console.log(command, result)
  }
})
  .then(
    () => db.destroy(),
    (error) => {
      console.error(error)
      process.exit(1)
    },
  )
