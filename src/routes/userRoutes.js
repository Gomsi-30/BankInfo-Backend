
import express from 'express';
import { createUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.route('/api/register').post(createUser);
router.route('/api/login').post(loginUser)

export default router;