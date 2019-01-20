export default {
  namespace: 'stafftab',
  state: {
    // 筛选条件
    filter: '',
    // 点击确定按钮，将name添加进来，有此name，让CheckBoxBar组件隐藏
    order: {
      order: 'ascend',
      field: 'id',
    },
    // 筛选结果
    staffs: [],
  },

  reducers: {
    sync_init(state, { department }) {
      return {
        ...state,
        filter: department,
      };
    },
    sync_changeDepart(state, { department }) {
      return {
        ...state,
        filter: department,
      };
    },
    sync_fetchStaffData(state, { staffs: {data : staffs} }) {
      return {
        ...state,
        staffs,
      };
    },
    // 排序
    sync_sortStaff(state, { order, field }) {
      return {
        ...state,
        order: {
          order,
          field,
        },
      };
    },
  },

  effects: {
    *init(action, { put }) {
      const department = 'development';
      yield put({ type: 'sync_init', department });
      yield put({ type: 'fetchStaffData' });
    },
    *changeDepart({ department }, { put }) {
      // 先发送同步命令更改筛选条件
      yield put({ type: 'sync_changeDepart', department });

      // 再发送异步命令拉取数据
      yield put({ type: 'fetchStaffData' });
    },

    // 修改员工数据
    *onChangeCell({ value, id, key }, { put }) {
      // 先发送同步命令改变全局
      yield put({ type: 'sync_onChangeCell', value, id, key });
      // 再改变数据库
      yield put({ type: 'changeStaffData', value, id, key });
    },

    // 排序
    *sortStaff({ order, field }, { put }) {
      // 1、修改本地排序规则
      yield put({ type: 'sync_sortStaff', order, field });
      // 2、拉取数据
      yield put({ type: 'fetchStaffData' });
    },

    // 切换部门
    *fetchStaffData(action, { put, select }) {
      const filter = yield select(state => state.stafftab.filter);
      const order = yield select(state => state.stafftab.order);
      const staffs = yield fetch('/staff/getStaffs', {
        method: 'GET',
      }).then(res => res.json());
      // 拉取数据完毕后，再次发送同步请求，更改state数据
      yield put({ type: 'sync_fetchStaffData', staffs });
    },

    // 删除数据
    *onDelete({ id }, { put }) {
      // 1、同步修改本地state
      yield put({ type: 'sync_onDelete', id });
      // 2、异步修改数据库
      const staffs = yield fetch('/staff/del', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      }).then(res => res.json());
    },

    // 添加一个员工
    *addStaff({ newStaff }, { put }) {
      /* 点击添加按钮的时候，就已经实时显示出新的数据了，
			在localstate中已经添加了新了数据了，所有在这里只需要修改数据库中的信息了 */
      yield fetch('/staff/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newStaff,
        }),
      });
    },

    // 修改数据的方法全部在在这个方法里
    *changeStaffData({ value, id, key }) {
      const data = yield fetch('/staff/changeData', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value, id, key }),
      }).then(res => res.json());
      console.log(data);
    },
  },
};
