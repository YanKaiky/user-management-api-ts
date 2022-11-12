import { Router } from 'express';
import continents from './continents';

const router = Router();

router.get('/', (_, response) => response.status(200).json({ message: `© ${new Date().getUTCFullYear()}, User Management` }));

router.use('/continents', continents);

export { router };
