import request from '@/api/index';

export default {
  getUser() {
    return request.get('/users/get');
  },
};
