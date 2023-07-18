import { Schema, model } from 'mongoose';
import Joi from 'joi';

import { handleMongooseError } from '../helpers/index.js';

const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
// RegEx for RFC 2822 compliant email address(Simpler version).
const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

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
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().pattern(emailRegex).required(),
  phone: Joi.string().pattern(phoneRegex).required(),
  favorite: Joi.boolean(),
});

const updataFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const shemas = { contactAddSchema, updataFavoriteSchema };

const Contact = model('contact', contactSchema);

export { Contact, shemas };
