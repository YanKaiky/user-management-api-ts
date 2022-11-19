import express from 'express';
import ContinentsController from '../app/controllers/continents.controller';
import auth from '../app/middlewares/auth.middleware';

const router = express.Router();

router.post('/', auth, ContinentsController.create);

router.get('/', auth, ContinentsController.getAll);

router.get('/:guid', auth, ContinentsController.getByGuid);

router.put('/:guid', auth, ContinentsController.update);

router.delete('/:guid', auth, ContinentsController.delete);

export default router;

