import { HttpError } from '../helpers/index.js';
import contactsServise from '../models/contacts.js';

function handlerForId(metod, req) {
  const { id } = req.params;
  let result = null;

  switch (metod) {
    case 'getContactById':
      result = contactsServise.getContactById(id);
      break;

    case 'updateContact':
      result = contactsServise.updateContact(id, req.body);
      break;

    case 'removeContact':
      result = contactsServise.removeContact(id);
      break;

    default:
      console.log('Sorry, unknown command');
  }

  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  return result;
}

export default handlerForId;
