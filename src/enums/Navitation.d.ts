enum REDIRECT_PAGES {
  LOGIN = '/auth/login',
  REGISTER = '/auth/register',
  CREATE_OFFER = '/create-offer',
};

const enum NAVIGATION_LINKS {
  LOGIN = '/auth/login',
  REGISTER = '/auth/register',
  FORGET_PASSWORD = '/auth/forget-password',
  RESET_PASSWORD = '/auth/reset-password',
  SETTINGS = '/my-account',
  CREATE_OFFER = '/create-offer',
  EDIT_OFFER = '/edit-offer/:id',
  DASHBOARD = '/dashboard',
  QUESTIONS = '/questions',
  MY_OFFERS = '/my-offers',
  FAV_OFFERS = '/favorite-offers',
  HOME = '/',
  OFFER = '/offer/:id',
  AUTHOR = '/authors/:id',
};

export {
  REDIRECT_PAGES,
  NAVIGATION_LINKS,
};
