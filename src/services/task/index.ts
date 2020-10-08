import request from '@/utils/request';
import { stringify } from 'qs';

export interface TaskParamsType {
  id: number;
  chandaoId: number;
  title: string;
  content: string;
  menu: string;
  children: [];
  key: string;
  value: string;
  all:boolean,
  type:string,
}

export async function dropList(params: TaskParamsType) {
  return request(`/task/drop?${stringify(params)}`);
}
