export default {
  namespace: 'talk',
  state: {
    talks: [],
  },

  reducers: {
    sync_submitShuoShuo(state, { talk }) {
      let date = talk.date;

      date = new Date(date);
      let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();

      // month = `${month>9?'0':''}${month}`;
      // day = `${day>9?'0':''}${day}`;

      // console.log(`${year}-${month}-${day}`);
      talk.date = `${year}-${month}-${day}`;

      return {
        ...state,
        talks: [...state.talks, talk],
      };
    },
    sync_init(state, { talks }) {
      return {
        ...state,
        talks: [...talks],
      };
    },
    sync_removeTalk(state, { id }) {
      console.log(id);
      return {
        ...state,
        talks: state.talks.filter((item, index) => item._id != id),
      };
    },
  },

  effects: {
    *submitShuoShuo({ email, text, pathArr }, { put }) {
      const { talk } = yield fetch('/community/submitShuoShuo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          text,
          pathArr: JSON.stringify(pathArr),
        }),
      }).then(talk => talk.json());
      yield put({ type: 'sync_submitShuoShuo', talk });
      // yield put({"type":"init"});
    },

    // 拉取初始数据
    *init(action, { put }) {
      const { talks } = yield fetch('/community/init', {
        method: 'GET',
      }).then(talks => talks.json());
      yield put({ type: 'sync_init', talks });
    },

    // 删除说说
    *removeTalk({ id }, { put }) {
      // 删除本地的
      // console.log(id);
      yield put({ type: 'sync_removeTalk', id });
      // 删除服务器的
      const { result } = yield fetch('/community/removeTalk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      }).then(res => res.json());
      console.log(result);
    },
  },
};
