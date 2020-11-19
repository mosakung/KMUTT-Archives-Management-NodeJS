import express from 'express'

import { loginController, registerController } from './loginController'

const router = express.Router()

router.get('/login', loginController)
router.post('/register', registerController)

export default router
