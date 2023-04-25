import * as userController from '../../Controller/user/userController'
import { authMiddleware } from '../../middleware/auth'
import express from 'express'
import JoiValidator from 'express-joi-validation'
import { deleteSchema } from '../../util/validateData'
import { userSchema } from '../../util/validateData'

const validator = JoiValidator.createValidator()

const manageRouter = express.Router()

manageRouter.get('/user',authMiddleware,userController.getUser)
manageRouter.delete('/delete-user',validator.body(deleteSchema),authMiddleware,userController.deleteUser)
manageRouter.put('/update-user',validator.body(userSchema),authMiddleware,userController.updateUser)

export default manageRouter