import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { User } from '../models/user.js';
import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';

dotenv.config();

const { SECRET_KEY } = process.env;

const regisrer = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, `Email ${email} already in use`);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    throw HttpError(401, `Email or password invalid`);
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, `Email or password invalid`);
  }

  const payload = {
    id: user._id,
  };

  console.log(payload);

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  res.json({
    token,
  });
};

export default {
  regisrer: ctrlWrapper(regisrer),
  login: ctrlWrapper(login),
};
