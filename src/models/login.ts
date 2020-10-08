import { Reducer } from 'redux';
import { routerRedux } from 'dva/router';
import { Effect } from 'dva';
import { stringify } from 'querystring';

import { userLogin } from '@/services/login';
import * as CookieUtils from '@/utils/cookie';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    getCaptcha: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload, callback }, { call, put }) {
      const response = yield call(userLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (callback && typeof callback === 'function') {
        if (response.success) {
          yield put(
            routerRedux.replace({
              pathname: '/index',
              search: stringify({
                redirect: window.location.href,
              }),
            }),
          );
        } else {
          callback(response);
        }
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
    *logout(_, { put }) {
      // redirect
      CookieUtils.clearCookie('token');
      CookieUtils.clearCookie('nickname');
      CookieUtils.clearCookie('username');
      CookieUtils.clearCookie('userid');
      if (window.location.pathname !== '/user/login') {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      if (payload.code === '200') {
        CookieUtils.setCookie('token', payload.data.token, 2);
        CookieUtils.setCookie('nickname', payload.data.nickName, 2);
        CookieUtils.setCookie('username', payload.data.username, 2);
        CookieUtils.setCookie('id', 1, 2);
      }
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
