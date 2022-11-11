import { Router } from 'express';

const router = Router();

router.get('/', (_, response) => response.status(200).json({ message: `© ${new Date().getUTCFullYear()}, User Management` }));

export { router };
