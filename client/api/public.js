import request from 'superagent';
import { handleSuccess, handleError } from '_utils/api';

export const getResponse = (prompt) => {
  return request
    .post('/api/rl')
    .send({ prompt })
    .then(handleSuccess)
    .catch(handleError);
};
