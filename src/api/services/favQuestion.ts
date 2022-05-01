import request from '@/api/index';

export default {
  save(offerId: number) {
    return request.post(`/favorite-offers/create/${offerId}`);
  },

  get(queryParams: string) {
    return request.get(`/favorite-offers/get?${queryParams}`);
  },

  remove(offerId: number) {
    return request.delete(`/favorite-offers/remove/${offerId}`);
  },
};
