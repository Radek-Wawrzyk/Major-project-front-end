import request from '@/api/index';

export default {
  getUser() {
    return request.get('/users/get');
  },
  getUserWithOffers(userId: string) {
    return request.get(`/users/get-with-offers/${userId}`);
  },
};
