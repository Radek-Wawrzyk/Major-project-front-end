import request from '@/api/index';

export default {
  get() {
    return request.get('/stats/dashboard');
  },
};
