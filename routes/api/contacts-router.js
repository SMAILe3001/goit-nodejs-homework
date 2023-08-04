import express from 'express';

import contactControlles from '../../controllers/contact-controlles.js';
import { schemas } from '../../models/contact.js';
import { validateBody, validateQuery } from '../../decorators/index.js';
import {
  authenticate,
  isEmptyBody,
  isEmptyBodyFavorite,
  isValidId,
} from '../../middlewars/index.js';

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get(
  '/',
  validateQuery(schemas.querySchema),
  contactControlles.getAll
);

contactsRouter.get('/:id', isValidId, contactControlles.getById);

contactsRouter.post(
  '/',
  isEmptyBody,
  validateBody(schemas.contactAddSchema),
  contactControlles.add
);

contactsRouter.put(
  '/:id',
  isValidId,
  isEmptyBody,
  validateBody(schemas.contactAddSchema),
  contactControlles.updateById
);

contactsRouter.patch(
  '/:id/favorite',
  isValidId,
  isEmptyBodyFavorite,
  validateBody(schemas.updataFavoriteSchema),
  contactControlles.updateStatusContact
);

contactsRouter.delete('/:id', isValidId, contactControlles.deleteById);

export default contactsRouter;
