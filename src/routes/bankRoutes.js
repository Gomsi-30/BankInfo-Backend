
import express from 'express';
import { isAuthenticated } from '../features/isAuthenticated.js';
import { createBank, deleteBank, updateBank, viewBanks, viewSingleBank } from '../controllers/bankController.js';

const router = express.Router();

router.route('/api/createbank').post(isAuthenticated,createBank);
router.route('/api/viewbanks').get(isAuthenticated,viewBanks);
router.route('/api/viewsinglebank/:bankId').get(isAuthenticated,viewSingleBank);
router.route('/api/updatebank/:bankId').put(isAuthenticated,updateBank);
router.route('/api/deletebank/:bankId').delete(isAuthenticated,deleteBank);
export default router;