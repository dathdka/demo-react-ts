import * as userController from '../../Controller/user/userController'
import { authMiddleware } from '../../middleware/auth'
import express from 'express'
import JoiValidator from 'express-joi-validation'
import { insertSchema, updateSchema, deleteSchema} from '../../util/validateData'

const validator = JoiValidator.createValidator()

const manageRouter = express.Router()

manageRouter.get('/user',userController.getUser)
manageRouter.post('/add-user' ,validator.body(insertSchema),authMiddleware,userController.addUser)
manageRouter.delete('/delete-user',validator.body(deleteSchema),authMiddleware,userController.deleteUser)
manageRouter.put('/update-user',validator.body(updateSchema),authMiddleware,userController.updateUser)

export default manageRouter