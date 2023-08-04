import { HttpError } from '../helpers/index.js';

const isEmptyBodyFavorite = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    next(HttpError(400, 'Missing field favorite'));
  }
  next();
};

export default isEmptyBodyFavorite;
