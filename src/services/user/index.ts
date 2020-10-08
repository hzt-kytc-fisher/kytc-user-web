import request from '@/utils/request';
import { stringify } from 'qs';

export interface UserParamsType {
  id: number;
  username: string;
  nickName: string;
  idCard: string;
  mobile: string,
  page: number;
  size: number;
}

export async function addUser(params: UserParamsType) {
  return request('/hub/user/info', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function updateUser(params: UserParamsType) {
  return request(`/hub/user/info?${stringify(params)}`, {
    method: 'put',
    body: JSON.stringify(params),
  });
}

export async function userLogin(params: UserParamsType) {
  return request(`/hub/user/login?${stringify(params)}`, {
    method: 'get'
  });
}

export async function queryUser(params: UserParamsType) {
  return request(`/hub/user/list?${stringify(params)}`,{
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function deleteUserInfo(id:Number) {
	return request(`/hub/user/`+id, {
		method: 'delete'
	});
}

export async function getUserInfo(id:Number) {
	return request(`/hub/user/`+id, {
		method: 'get'
	});
}

