import { Router } from 'express'

import authMiddleware from '../middlewares/authMiddleware';

import UserController from '../controllers/UsersController'
import AuthController from '../controllers/AuthController';

const router = Router();

router.post( '/user', UserController.store );
router.get( '/user', authMiddleware, UserController.index );
router.post( '/login', AuthController.authenticate );

export default router;
