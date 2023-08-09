import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs/promises';
import gravatar from 'gravatar';
import Jimp from 'jimp';

import { User } from '../models/user.js';
import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';
import { subscription } from '../constants/user-constante.js';

const { SECRET_KEY } = process.env;
const avatarPath = path.resolve('public', 'avatars');

const regisrer = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `Email ${email} already in use`);
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      name: user.name,
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, name, avatarURL } = req.user;

  res.json({ user: { email, name, avatarURL } });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204).json({
    message: 'Logout success',
  });
};

const subscriptionUpdate = async (req, res) => {
  const { _id } = req.user;
  const { subscription: newSubscription } = req.body;

  if (!subscription.includes(newSubscription)) {
    throw HttpError(404, 'Subscription not update');
  }

  await User.findByIdAndUpdate(_id, { newSubscription });

  res.json({
    message: `Subscription update to ${newSubscription}`,
  });
};

const avatarUpdate = async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;

  const newPath = path.join(avatarPath, filename);

  Jimp.read(oldPath, (err, avatar) => {
    if (err) throw err;
    avatar.resize(250, 250).quality(60).write(newPath);
    // видалення не потрібної аватарки з папки темп
    // fs.unlink(oldPath);
  });

  const avatarURL = path.join('avatars', filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

export default {
  regisrer: ctrlWrapper(regisrer),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  subscriptionUpdate: ctrlWrapper(subscriptionUpdate),
  avatarUpdate: ctrlWrapper(avatarUpdate),
};
