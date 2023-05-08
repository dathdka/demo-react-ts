import * as authController from '../../Controller/auth/authController'
import JoiValidator from 'express-joi-validation'
import { loginSchema } from '../../util/validateData'
import express from 'express'

const authRouter = express.Router()
const validator = JoiValidator.createValidator()


authRouter.post('/login', validator.body(loginSchema) ,authController.login)
authRouter.post('/forget-password', authController.forgetPassword)
authRouter.post('/set-new-password', authController.setNewPassword)

export default authRouter