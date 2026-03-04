export const AUTH_ROUTES = {
  ROOT: 'auth',

  PUBLIC: {
    REGISTER: 'register',
    LOGIN: 'login',
    REFRESH: 'refresh',
    // GOOGLE: 'google',
    // GOOGLE_CALLBACK: 'google/callback',
    // FACEBOOK: 'facebook',
    // FACEBOOK_CALLBACK: 'facebook/callback',
  },

  PRIVATE: {
    ME: 'me',
    LOGOUT: 'logout',
  },

  ADMIN: {
    REGISTER: 'admin',
  },
};
