import { Schema, model } from 'mongoose';
import Joi from 'joi';

import { emailRegex } from '../constants/contact-constants.js';
import { handleSaveError } from './hooks.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 4,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique: true,
      minlength: 4,
      required: [true, 'Set email for contact'],
      match: emailRegex,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set password for user'],
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveError);

const registerSchema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().email().pattern(emailRegex).required(),
  password: Joi.string().min(4).required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().pattern(emailRegex).required(),
  password: Joi.string().min(4).required(),
});

const schemas = { registerSchema, loginSchema };

const User = model('user', userSchema);

export { User, schemas };
