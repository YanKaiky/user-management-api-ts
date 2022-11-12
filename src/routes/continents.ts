import express from 'express';
import ContinentsController from '../app/controllers/continents.controller';

const router = express.Router();

router.post('/', ContinentsController.create);

// router.get('/', ContinentsController.getAllContinents);

// router.get('/:guid', ContinentsController.getContinentByGuid);

// router.put('/:guid', ContinentsController.updateContinent);

// router.delete('/:guid', ContinentsController.deleteContinent);

export default router;

