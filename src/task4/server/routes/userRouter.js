import Router from 'express';
import { userController } from '../controllers/UserController.js';
import { authMiddleware } from '../middleWare/authMiddleware.js';

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.get('/getall', userController.getAll)
router.post('/changeaccess', userController.changeAccess)
router.post('/deleteusers', userController.delete)

export default router
