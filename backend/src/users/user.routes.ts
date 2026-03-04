export const USER_ROUTES = {
  ROOT: 'user',

  PUBLIC: {
    GET_USER: ':id',
  },

  PRIVATE: {
    PROFILE: 'my-profile',
    UPDATE_PROFILE: 'update-profile',
    // AVATAR: 'avatar',
  },
};
