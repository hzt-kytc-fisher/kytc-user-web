import {
  addProject,
  updateStatus,
  createFisheye,
  queryProject,
  updateCr,
  merge,
  merge1,
  deleted,
  mergeException,
} from '@/services/project/index';
import { addBranch } from '@/services/branch/index';
import { queryGitRepository } from '@/services/git/index';
import { dropList } from '@/services/task/index';
import { queryUser } from '@/services/user/index';
import { notification } from 'antd';

export default {
  namespace: 'project',
  state: {
    data: {
      rows: [],
      total: 10,
      page: 0,
      size: 10,
    },
  },

  effects: {
    *addProject({ payload, callback }, { call, put }) {
      const response = yield call(addProject, payload);
      if (response.code === '200') {
        callback && callback();
      }
    },

    *addBranch({ payload, callback }, { call, put }) {
      const response = yield call(addBranch, payload);
      if (response.code === '200') {
        callback && callback();
      }
    },
    *listGitRepository({ payload, callback }, { call, put }) {
      const response = yield call(queryGitRepository, payload);
      if (response.code === '200') {
        callback && callback(response.data);
      }
    },
    *listFisheyeUser({ payload, callback }, { call, put }) {
      const response = yield call(queryUser, payload);
      if (response.code === '200') {
        callback && callback(response.data);
      }
    },
    *taskDropList({ payload, callback }, { call, put }) {
      const response = yield call(dropList, payload);
      if (response.code === '200') {
        callback && callback(response.data);
      }
    },
    *mergeProject({ payload, callback }, { call, put }) {
      const response = yield call(merge, payload);
      if (response.code === '200') {
        callback && callback();
      }
    },
    *merge1Project({ payload, callback }, { call, put }) {
      const response = yield call(merge1, payload);
      if (response.code === '200') {
        callback && callback();
      }
    },
    *deleteProject({ payload, callback }, { call, put }) {
      const response = yield call(deleted, payload);
      if (response.code === '200') {
        callback && callback();
      }
    },
    *mergeExceptionProject({ payload, callback }, { call, put }) {
      const response = yield call(mergeException, payload);
      if (response.code === '200') {
        callback && callback();
      }
    },

    *updateStatus({ payload, callback }, { call }) {
      const response = yield call(updateStatus, payload);
      if (response.code === '200') {
        callback && callback();
      }
    },
    *updateCr({ payload, callback }, { call }) {
      const response = yield call(updateCr, payload);
      if (response.code === '200') {
        callback && callback();
      }
    },
    *createFisheye({ payload, callback }, { call }) {
      const response = yield call(createFisheye, payload);
      if (response.code === '200') {
        callback && callback();
      }
    },
    *listProject({ payload, callback }, { call, put }) {
      const response = yield call(queryProject, payload);
      if (response.code === '200') {
        yield put({
          type: 'queryProjectInfos',
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
    queryProjectInfos(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
