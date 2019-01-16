export default {
  namespace: 'user',
  state: {
    user: {
      email: '',
      nickname: '',
      password: '',
      avata: '',
      shuoshuo: [],
    },
  },

  reducers: {
    sync_doLogin(state, { user }) {
      return {
        ...state,
        user: {
          ...state.user,
          email: user.email,
          nickname: user.name,
          avata: user.avata,
        },
      };
    },
    sync_logOut(state) {
      return {
        ...state,
        user: {
          email: '',
          nickname: '',
          password: '',
          avata: '',
          shuoshuo: [],
        },
      };
    },
    sync_refresh(state, { user }) {
      return {
        ...state,
        user: {
          ...state.user,
          email: user.email,
          nickname: user.nickname,
          avata: user.avata,
        },
      };
    },
  },

  effects: {
    *doLogin({ user }, { put }) {
      yield put({ type: 'sync_doLogin', user });
    },
    *logOut(action, { put }) {
      const { result, user } = yield fetch('/account/logOut', {
        method: 'GET',
        credentials: 'include',
      }).then(res => res.json());
      yield put({ type: 'sync_logOut' });
    },
    *refresh(action, { put }) {
      const { data } = yield fetch('/account/refresh', {
        method: 'GET',
        credentials: 'include',
      }).then(res => res.json());
      if (data.data) {
        yield put({ type: 'sync_refresh', user: data.user });
      } else {
        yield put({ type: 'sync_logOut' });
      }
    },
  },
};
