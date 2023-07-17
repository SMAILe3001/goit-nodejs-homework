import contactsServise from '../models/contacts.js';

import { ctrlWrapper } from '../decorators/index.js';
import handlerForId from './handlerForId.js';

const getAll = async (req, res) => {
  const result = await contactsServise.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const result = await handlerForId('getContactById', req);
  res.json(result);
};

const add = async (req, res) => {
  const result = await contactsServise.addContact(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const result = await handlerForId('updateContact', req);
  res.json(result);
};

const deleteById = async (req, res) => {
  const result = await handlerForId('updateContact', req);
  res.json({ message: 'Delete succes', result });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
