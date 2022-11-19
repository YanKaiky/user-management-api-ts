import express from 'express';
import StatesController from '../app/controllers/states.controller';
import auth from '../app/middlewares/auth.middleware';

const router = express.Router();

router.post('/', auth, StatesController.create);

router.get('/', auth, StatesController.getAll);

router.get('/:guid', auth, StatesController.getByGuid);

router.put('/:guid', auth, StatesController.update);

router.delete('/:guid', auth, StatesController.delete);

export default router;

