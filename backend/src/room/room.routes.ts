export const ROOM_ROUTES = {
  ROOT: 'room',

  PUBLIC: {
    LIST: '',
    DETAIL: 'detail/:id',
  },

  PRIVATE: {
    CREATE: '',
    MY_ROOMS: 'my',
    UPDATE: ':id',
    DELETE: ':id',
    RESTORE: ':id/restore',
    MY_INACTIVE_ROOMS: 'my/inactive',
    MY_ROOMS_IS_RENTING: 'renting',
    INACTIVE_DETAIL: 'my/inactive/:id',
  },

  ADMIN: {
    DELETE: 'admin/:id',
    ROOM_BY_USER: 'admin/user-room/:userId',
    ALL_INACTIVE: 'admin/inactive',
    USER_INACTIVE: 'admin/user-inactive/:userId',
    USER_ACTIVE: 'admin/user-active/:userId',
    ALL_RENTED: 'admin/rented',
    USER_ROOMS_IS_RENTING: 'admin/user-rented/:userId',
  },
};
