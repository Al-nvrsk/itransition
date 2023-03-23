import Router from 'express';
import { userController } from '../controllers/UserController.js';
import { authMiddleware } from '../middleWare/authMiddleware.js';

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);

export default router
