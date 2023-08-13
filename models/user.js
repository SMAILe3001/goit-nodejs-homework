import { Schema, model } from 'mongoose';
import Joi from 'joi';

import { emailRegex } from '../constants/contact-constants.js';
import {
  subscription,
  subscriptionDefault,
} from '../constants/user-constante.js';
import { handleSaveError, validationAtUpdate } from './hooks.js';

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
      enum: subscription,
      default: subscriptionDefault,
    },
    avatarURL: String,
    token: {
      type: String,
      default: '',
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre('findOneAndUpdate', validationAtUpdate);

userSchema.post('save', handleSaveError);
userSchema.post('findOneAndUpdate', handleSaveError);

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

const emailSchema = Joi.object({
  email: Joi.string().email().pattern(emailRegex).required(),
});

const schemas = { registerSchema, loginSchema, emailSchema };

const User = model('user', userSchema);

export { User, schemas };
