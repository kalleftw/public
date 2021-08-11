import express from 'express'
import { UserController } from '../controllers/user-controller.js'
import { MainController } from '../controllers/main-controller.js'

export const router = express.Router()
const mainController = new MainController()
const userController = new UserController()

router.post('/endpoint_signup', userController.cleanUp, userController.dataValidation, userController.register)
router.post('/endpoint_login', userController.cleanUp, userController.loginCheck, userController.login)
router.post('/endpoint_logout', userController.logout)
router.get('/endpoint_search', mainController.search)
router.post('/endpoint_addfav', mainController.addFavourite)
router.post('/endpoint_removefav', mainController.removeFavourite)
router.get('/endpoint_viewfav', mainController.viewFavourite)
