import request from '@/api/index';

export default {
  getAllOffers(queryParams: string) {
    return request.get(`/offers/get?${queryParams}`);
  },

  getSingleOffer(offerId: string) {
    return request.get(`/offers/get-with-details/${offerId}`)
  },

  removeOffer(offerId: number) {
    return request.delete(`/offers/remove/${offerId}`)
  },
};
