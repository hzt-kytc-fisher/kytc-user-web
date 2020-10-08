import request from '@/utils/request';
import { stringify } from 'qs';

export interface BranchParamsType {
  id: number;
  serviceName: string;
  branchNo: string;
  branchSource: string;
  mergeBranch: string;
  mergeTime: Date;
  mergeStatus: string;
  mergePerson: string;
  projectId: string;
  serviceNames: (null | string)[];
  page: number;
  size: number;
}

export async function addBranch(params: ProjectParamsType) {
  return request(`/branch/info?${stringify(params)}`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function queryProject(params: ProjectParamsType) {
  return request(`/branch/${params}/list`);
}
