import { FavoriteOffer } from './Offer';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string | number;
  avatar_url: string | null;
  bio: string | null;
  created_at: Date;
  updated_at: Date;
  favOffers: FavoriteOffer[];
}

interface UserStoreState {
  user?: User;
}

interface UpdateUser {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  bio: string | null;
}

export { User, UpdateUser, UserStoreState };
