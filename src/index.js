import app, { serverGQL } from './app'
import dotENV from './utils/setENV'

dotENV.config()

app.listen(process.env.SERVER_PORT, () => {
  console.log()
  console.log('==============================')
  console.log('\x1b[36m'
    + `server running on port (${process.env.SERVER_PORT}) `)
  console.log('\x1b[36m'
    + 'Terminate batch job (Ctrl + C)', '\x1b[0m')
  console.log('==============================')
  console.log()
  console.log('==============================')
  console.log('\x1b[36m'
    + 'GraphQL server running', '\x1b[0m')
  console.log('\x1b[36m'
    + `PATH localhost:${process.env.SERVER_PORT}${serverGQL.graphqlPath}`, '\x1b[0m')
  console.log('==============================')
  console.log()
})
