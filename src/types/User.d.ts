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
}

interface UserStoreState {
  user?: User;
}

export {
  User,
  UserStoreState,
};
