interface Question {
  id?: number;
  full_name: string;
  email: string;
  question: string;
  phone: string;
  userId: number;
  offerId: number;
  created_at?: Date;
  offer?: {
    name: string;
  };
}

export { Question };
