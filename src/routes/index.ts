import { Router } from 'express';
import auth from './auth';
import dashboard from './dashboard';
import continents from './continents';
import countries from './countries';
import states from './states';
import cities from './cities';
import users from './users';

const router = Router();

router.get('/', (_, response) => response.status(200).json({ message: `© ${new Date().getUTCFullYear()}, User Management` }));

router.use('/login', auth);

router.use('/dashboard', dashboard);

router.use('/continents', continents);

router.use('/countries', countries);

router.use('/states', states);

router.use('/cities', cities);

router.use('/users', users);

export { router };
