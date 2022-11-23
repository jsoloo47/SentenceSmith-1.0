import request from 'superagent';
import { handleSuccess, handleError } from '_utils/api';

export const getResponse = (prompt, id) => {
  return request
    .post('/api/gpt3')
    .send({ prompt, id })
    .then(handleSuccess)
    .catch(handleError);
};
