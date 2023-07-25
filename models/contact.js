import { Schema, model } from 'mongoose';
import Joi from 'joi';

import { emailRegex, phoneRegex } from '../constants/contact-constants.js';
import { handleSaveError, validationAtUpdate } from './hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
      match: emailRegex,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
      match: phoneRegex,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.pre('findOneAndUpdate', validationAtUpdate);

contactSchema.post('save', handleSaveError);
contactSchema.post('findOneAndUpdate', handleSaveError);

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().pattern(emailRegex).required(),
  phone: Joi.string().pattern(phoneRegex).required(),
  favorite: Joi.boolean(),
});

const updataFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = { contactAddSchema, updataFavoriteSchema };

const Contact = model('contact', contactSchema);

export { Contact, schemas };
