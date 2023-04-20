import * as authController from '../../Controller/auth/authController'
import express from 'express'

const authRouter = express.Router()

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)

export default authRouter