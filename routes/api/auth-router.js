import express from 'express';

import authControlles from '../../controllers/auth-controlles.js';
import { validateBody } from '../../decorators/index.js';
import { schemas } from '../../models/user.js';
import { authenticate } from '../../middlewars/index.js';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(schemas.registerSchema),
  authControlles.regisrer
);

authRouter.post(
  '/login',
  validateBody(schemas.loginSchema),
  authControlles.login
);

authRouter.get('/current', authenticate, authControlles.getCurrent);

authRouter.post('/logout', authenticate, authControlles.logout);

authRouter.patch('/', authenticate, authControlles.subscriptionUpdate);

export default authRouter;
