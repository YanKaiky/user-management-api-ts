import express from 'express';
import CitiesController from '../app/controllers/cities.controller';
import auth from '../app/middlewares/auth.middleware';

const router = express.Router();

router.post('/', auth, CitiesController.create);

router.get('/', auth, CitiesController.getAll);

router.get('/:guid', auth, CitiesController.getByGuid);

router.put('/:guid', auth, CitiesController.update);

router.delete('/:guid', auth, CitiesController.delete);

export default router;

