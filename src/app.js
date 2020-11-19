/* Lib */
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

/* Import File JS */
import path from './path'
import auth from './feature/midderware/auth'

/* GQL Import */
import serverGQL from './feature/apollo-server-express/server'

/* EXPRESS JSON */
const app = express()

/* Middleware use */
app.use(express.json())
app.use(cors())

/* Morgan Request */
if (app.get('env') === 'development') {
  app.use(morgan('tiny'))
}
app.use(auth)
/* GraphQL */
serverGQL.applyMiddleware({ app })

/* API */
app.use(path)

export { serverGQL }
export default app
