import request from '@/api/index';
import { Question } from '@/types/Question';

export default {
  getQuestion(questionId: number) {
    return request.get(`/questions/get/${questionId}`);
  },
  getAllQuestions() {
    return request.get(`/questions/get`);
  },
  removeQuestion(questionId: number) {
    return request.delete(`/questions/remove/${questionId}`);
  },
  askQuestion(questionDetails: Question) {
    return request.post('/questions/create', questionDetails);
  },
};
