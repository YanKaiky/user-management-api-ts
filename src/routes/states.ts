import express from 'express';
import StatesController from '../app/controllers/states.controller';

const router = express.Router();

router.post('/', StatesController.create);

router.get('/', StatesController.getAll);

router.get('/:guid', StatesController.getByGuid);

router.put('/:guid', StatesController.update);

router.delete('/:guid', StatesController.delete);

export default router;

