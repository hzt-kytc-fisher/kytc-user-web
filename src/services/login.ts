import request from '@/utils/request';

export interface LoginParamsType {
  username: string;
  userpwd: string;
}

export async function userLogin(params: LoginParamsType) {
  return request(`/user/login?username=${params.username}&userpwd=${params.userpwd}`);
}
