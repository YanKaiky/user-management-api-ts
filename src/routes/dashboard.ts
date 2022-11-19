import express from 'express';
import DashboardController from '../app/controllers/dashboard.controller';
import auth from '../app/middlewares/auth.middleware';

const router = express.Router();

router.get('/', auth, DashboardController.getValues);

export default router;
