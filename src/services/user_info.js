import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryUserInfos(params) {
	return request(`/api/user_info/infos?${stringify(params)}`)
}

export async function addUserInfo(params) {
	return request(`/api/user_info/info`, {
		method: 'POST',
		body: JSON.stringify(params),
	});
}

export async function editUserInfo(params) {
	return request(`/api/user_info/info`, {
		method: 'PUT',
		body: JSON.stringify(params),
	});
}

export async function deleteUserInfo(id) {
	return request(`/api/user_info/`+id+`/info`, {
		method: 'delete'
	});
}
