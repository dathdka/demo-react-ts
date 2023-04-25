import * as authController from '../../Controller/auth/authController'
import JoiValidator from 'express-joi-validation'
import { userSchema, loginSchema } from '../../util/validateData'
import express from 'express'

const authRouter = express.Router()
const validator = JoiValidator.createValidator()

authRouter.post('/register', validator.body(userSchema) ,authController.register)
authRouter.post('/login', validator.body(loginSchema) ,authController.login)

export default authRouter