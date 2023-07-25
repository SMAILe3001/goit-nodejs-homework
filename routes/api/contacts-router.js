import express from 'express';

import contactControlles from '../../controllers/contact-controlles.js';
import { schemas } from '../../models/contact.js';
import { validateBody } from '../../decorators/index.js';
import {
  authenticate,
  isEmptyBody,
  isEmptyBodyFavorite,
  isValidId,
} from '../../middlewars/index.js';

const contactsRouter = express.Router();

contactsRouter.get('/', authenticate, contactControlles.getAll);

contactsRouter.get('/:id', authenticate, isValidId, contactControlles.getById);

contactsRouter.post(
  '/',
  authenticate,
  isEmptyBody,
  validateBody(schemas.contactAddSchema),
  contactControlles.add
);

contactsRouter.put(
  '/:id',
  authenticate,
  isValidId,
  isEmptyBody,
  validateBody(schemas.contactAddSchema),
  contactControlles.updateById
);

contactsRouter.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  isEmptyBodyFavorite,
  validateBody(schemas.updataFavoriteSchema),
  contactControlles.updateStatusContact
);

contactsRouter.delete('/:id', isValidId, contactControlles.deleteById);

export default contactsRouter;
