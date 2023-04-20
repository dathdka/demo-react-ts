import * as userController from '../../Controller/user/userController'
import { authMiddleware } from '../../middleware/auth'
import express from 'express'

const manageRouter = express.Router()

manageRouter.get('/user',userController.getUser)
manageRouter.delete('delete-user',authMiddleware,userController.deleteUser)
manageRouter.put('update-user',authMiddleware, userController.updateUser)

export default manageRouter