import request from '@/api/index';
import { CreateOffer, Offer } from '@/types/Offer';

export default {
  getAllOffers(queryParams: string) {
    return request.get(`/offers/get?${queryParams}`);
  },

  getUserOffers(queryParams: string) {
    return request.get(`/offers/get-user-offers?${queryParams}`);
  },

  getSingleOffer(offerId: string) {
    return request.get(`/offers/get-with-details/${offerId}`);
  },

  getPlainOffer(offerId: string) {
    return request.get(`/offers/get/${offerId}`);
  },

  removeOffer(offerId: number) {
    return request.delete(`/offers/remove/${offerId}`);
  },

  edit(offer: CreateOffer) {
    // Convert string to number (elementUI & input type='number' has issue with that)
    const price = parseInt(offer.price.toString());
    const living_area = parseInt(offer.living_area.toString());
    const deposit = parseInt(offer.deposit.toString());

    return request.put(`/offers/update/${offer.id}`, {
      ...offer,
      price,
      living_area,
      deposit,
    });
  },

  create(offer: CreateOffer) {
    // Convert string to number (elementUI & input type='number' has issue with that)
    const price = parseInt(offer.price.toString());
    const living_area = parseInt(offer.living_area.toString());
    const deposit = parseInt(offer.deposit.toString());

    return request.post('/offers/create', {
      ...offer,
      price,
      living_area,
      deposit,
    });
  },
};
