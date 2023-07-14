import express from 'express';

import contactsServise from '../../models/contacts.js';
import { HttpError } from '../../utils/HttpError.js';

const contactsRouter = express.Router();

contactsRouter.get('/', async (req, res, next) => {
  try {
    const result = await contactsServise.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsServise.getContactById(contactId);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post('/', async (req, res, next) => {
  res.json({ message: 'template message' });
});

contactsRouter.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

contactsRouter.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

export default contactsRouter;
