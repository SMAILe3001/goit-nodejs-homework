import express from 'express';

import contactsServise from '../../models/contacts.js';

const contactsRouter = express.Router();

contactsRouter.get('/', async (req, res, next) => {
  const data = await contactsServise.listContacts();
  res.json(data);
});

contactsRouter.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
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
