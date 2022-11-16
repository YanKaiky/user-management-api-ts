import express from 'express';
import CitiesController from '../app/controllers/cities.controller';

const router = express.Router();

router.post('/', CitiesController.create);

router.get('/', CitiesController.getAll);

router.get('/:guid', CitiesController.getByGuid);

router.put('/:guid', CitiesController.update);

router.delete('/:guid', CitiesController.delete);

export default router;

