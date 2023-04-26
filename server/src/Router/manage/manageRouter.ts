import * as userController from '../../Controller/user/userController'
import { authMiddleware } from '../../middleware/auth'
import express from 'express'
import JoiValidator from 'express-joi-validation'
import { deleteSchema } from '../../util/validateData'
import { userSchema } from '../../util/validateData'

const validator = JoiValidator.createValidator()

const manageRouter = express.Router()

manageRouter.get('/user',userController.getUser)
manageRouter.post('/add-user',authMiddleware ,validator.body(userSchema),userController.addUser)
manageRouter.delete('/delete-user',authMiddleware,validator.body(deleteSchema),userController.deleteUser)
manageRouter.put('/update-user',authMiddleware,validator.body(userSchema),userController.updateUser)

export default manageRouter