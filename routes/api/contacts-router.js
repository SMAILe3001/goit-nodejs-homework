import express from 'express';

import contactControlles from '../../controllers/contact-controlles.js';
import { schemas } from '../../models/contact.js';
import { validateBody } from '../../decorators/index.js';
import { isEmptyBody, isValidId } from '../../middlewars/index.js';

const contactsRouter = express.Router();

contactsRouter.get('/', contactControlles.getAll);

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
  isEmptyBody,
  validateBody(schemas.updataFavoriteSchema),
  contactControlles.updateFavorite
);

contactsRouter.delete('/:id', isValidId, contactControlles.deleteById);

export default contactsRouter;
