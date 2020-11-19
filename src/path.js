import express from 'express'

import userRouter from './feature/api/login/loginRouter'

const path = express.Router()

path.use(userRouter)

export default path
