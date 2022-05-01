import request from '@/api/index';
import { Question } from '@/types/Question';

export default {
  get(questionId: number) {
    return request.get(`/questions/get/${questionId}`);
  },

  getAll(queryParams: string) {
    return request.get(`/questions/get?${queryParams}`);
  },

  remove(questionId: number) {
    return request.delete(`/questions/remove/${questionId}`);
  },

  create(questionDetails: Question) {
    return request.post('/questions/create', questionDetails);
  },
};
