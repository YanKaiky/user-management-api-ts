import express from 'express';
import ContinentsController from '../app/controllers/continents.controller';

const router = express.Router();

router.post('/', ContinentsController.create);

router.get('/', ContinentsController.getAll);

router.get('/:guid', ContinentsController.getByGuid);

router.put('/:guid', ContinentsController.update);

router.delete('/:guid', ContinentsController.delete);

export default router;

