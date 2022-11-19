import express from 'express';
import UsersController from '../app/controllers/users.controller';
import auth from '../app/middlewares/auth.middleware';

const router = express.Router();

router.post('/', UsersController.create);

router.get('/', auth, UsersController.getAll);

router.get('/:guid', auth, UsersController.getByGuid);

router.put('/:guid', auth, UsersController.update);

router.delete('/:guid', auth, UsersController.delete);

export default router;

