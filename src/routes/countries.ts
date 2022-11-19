import express from 'express';
import CountriesController from '../app/controllers/countries.controller';
import auth from '../app/middlewares/auth.middleware';

const router = express.Router();

router.post('/', auth, CountriesController.create);

router.get('/', auth, CountriesController.getAll);

router.get('/:guid', auth, CountriesController.getByGuid);

router.put('/:guid', auth, CountriesController.update);

router.delete('/:guid', auth, CountriesController.delete);

export default router;

