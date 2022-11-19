import express from 'express';
import UsersController from '../app/controllers/users.controller';

const router = express.Router();

router.post('/', UsersController.create);

router.get('/', UsersController.getAll);

router.get('/:guid', UsersController.getByGuid);

router.put('/:guid', UsersController.update);

router.delete('/:guid', UsersController.delete);

export default router;

