import request from '@/api/index';

export default {
  setAsPrimary(offerId: number, photoId: number) {
    return request.post(`/photos/set-primary`, {
      offerId,
      photoId,
    });
  },

  delete(photoId: number) {
    return request.delete(`/photos/delete/${photoId}`);
  },

  getAll(offerId: number) {
    return request.get(`/photos/get-all/${offerId}`);
  },

  get(offerId: number) {
    return request.get(`/photos/get/${offerId}`);
  },

  update(formData: FormData, offerId: number) {
    return request.put(`/photos/update/${offerId}`, formData);
  },

  upload(formData: FormData, offerId: number) {
    return request.post(`/photos/upload/${offerId}`, formData);
  }
};
