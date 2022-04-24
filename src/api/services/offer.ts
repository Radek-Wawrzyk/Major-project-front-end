import request from '@/api/index';

export default {
  getAllOffers() {
    return request.get('/offers/get');
  },
  getSingleOffer(offerId: string) {
    return request.get(`/offers/get-with-details/${offerId}`)
  },
  // addToFavorites()
};
