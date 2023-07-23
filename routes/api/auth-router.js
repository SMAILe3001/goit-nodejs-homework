import express from 'express';

import authControlles from '../../controllers/auth-controlles.js';
import { validateBody } from '../../decorators/index.js';
import { schemas } from '../../models/user.js';

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

export default authRouter;
