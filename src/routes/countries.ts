import express from 'express';
import CountriesController from '../app/controllers/countries.controller';

const router = express.Router();

router.post('/', CountriesController.create);

router.get('/', CountriesController.getAll);

router.get('/:guid', CountriesController.getByGuid);

router.put('/:guid', CountriesController.update);

router.delete('/:guid', CountriesController.delete);

export default router;

