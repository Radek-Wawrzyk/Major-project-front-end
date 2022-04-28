import request from '@/api/index';
import { UpdateUser } from '@/types/User';

export default {
  getUser() {
    return request.get('/users/get');
  },

  getUserWithOffers(userId: string) {
    return request.get(`/users/get-with-offers/${userId}`);
  },

  changePassword(newPassword: string) {
    return request.post('/users/change-password', {
      password: newPassword,
    });
  },

  deleteAccount() {
    return request.delete('/users/remove');
  },

  updateUser(userDetails: UpdateUser) {
    return request.put('/users/edit', userDetails);
  },

  updateAvatar(formData: FormData) {
    return request.put('/users/edit-avatar', formData);
  },

  uploadAvatar(formData: FormData) {
    return request.post('/users/upload-avatar', formData);
  },

  deleteAvatar() {
    return request.delete('/users/remove-avatar');
  },
};
