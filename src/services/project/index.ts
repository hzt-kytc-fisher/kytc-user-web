import request from '@/utils/request';
import { stringify } from 'qs';

export interface ProjectParamsType {
  id: number;
  title: string;
  publishPlan: string;
  branchNo: string;
  crNo: string;
  branchSource: String;
  source: String;
  participants: string;
  content: string;
  serviceNames: (null | string)[];
  status: string;
  fisheyeStatus: string;
  page: number;
  size: number;
  ids: [];
  originalBranch: string;
  targetBranch: string;
  targetbranch: string;
  receivePersonArr: (null | string)[];
}

export async function addProject(params: ProjectParamsType) {
  return request('/project/info', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function updateStatus(params: ProjectParamsType) {
  return request(`/project/status?${stringify(params)}`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function createFisheye(params: ProjectParamsType) {
  return request(`/project/fisheye?${stringify(params)}`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function updateCr(params: ProjectParamsType) {
  return request(`/project/crNo?${stringify(params)}`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function merge(params: ProjectParamsType) {
  return await request(`/project/merge?${stringify(params)}`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function merge1(params: ProjectParamsType) {
  return await request(`/project/merge1?${stringify(params)}`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function deleted(params: ProjectParamsType) {
  return await request(`/project/${params.id}/info`, {
    method: 'delete',
    body: JSON.stringify(params),
  });
}

export async function mergeException(params: ProjectParamsType) {
  return request(`/project/mergeException`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function queryProject(params: ProjectParamsType) {
  return request(`/project/list?${stringify(params)}`);
}
