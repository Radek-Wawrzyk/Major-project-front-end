import request from '@/api/index';

export default {
  saveFavQuestion(offerId: number) {
    return request.post(`/favorite-offers/create/${offerId}`);
  },

  getAllFavQuestions(queryParams: string) {
    return request.get(`/favorite-offers/get?${queryParams}`);
  },

  removeFavQuestion(offerId: number) {
    return request.delete(`/favorite-offers/remove/${offerId}`);
  },
};
