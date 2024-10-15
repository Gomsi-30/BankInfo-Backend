import express from 'express';

import { adminLogin, allUsers } from '../controllers/adminController.js';
import { isAdmin } from '../features/isAdmin.js';
import {isAuthenticated} from '../features/isAuthenticated.js';

const router = express.Router();

router.route('/api/allusers').get(isAuthenticated,isAdmin,allUsers);
router.route('/api/loginadmin').post(adminLogin);

export default router;
