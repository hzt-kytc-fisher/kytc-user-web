import { getUserInfo, updateUser, queryUser, userLogin, addUser, deleteUserInfo } from '@/services/user/index';
import { notification } from 'antd';

export default {
  namespace: 'userManager',
  state: {
    data: {
      rows: [],
      total: 100,
      page: 0,
      size: 10,
    },
  },

  effects: {
		*addUserInfo({payload,callback},{call,put}){
			const response = yield call(addUser,payload);
			if(response.success){
				callback && callback();
			}else{
				notification.error({
					message:"添加失败"
				})
			}
		},
    *updateUser({ payload, callback }, { call, put }) {
      const response = yield call(updateUser, payload);
      if(response.success){
				callback && callback();
			}else{
				notification.error({
					message:"修改失败"
				})
			}
    },
    *deleteUserInfo({payload,callback},{call,put}){
			const response = yield call(deleteUserInfo,payload);
			if(response.success){
				callback && callback();
			}else{
				notification.error({
					message:"删除失败"
				})
			}
    },
    *getUserInfo({ payload, callback }, { call, put }) {
      const response = yield call(getUserInfo, payload);
      if (response.success) {
        callback && callback(response.data);
      }
    },
    *userLogin({ payload, callback }, { call, get }) {
      console.log(payload)
      const response = yield call(userLogin, payload);
      
      if (response.success) {
        console.log(response.data)
        callback && callback(response.data);
      }
    },

    *listUser({ payload, callback }, { call, put }) {
      const response = yield call(queryUser, payload);
      if (response.success) {
        yield put({
          type: 'queryUserInfos',
          payload: {
            ...response.data,
            page: payload.page + 1,
          },
        });
      } else {
        notification.error({
          message: response.reason,
        });
      }
    },
  },
  reducers: {
    queryUserInfos(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};

