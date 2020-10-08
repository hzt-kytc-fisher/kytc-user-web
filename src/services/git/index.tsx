import request from '@/utils/request';

export interface GitRepositoryParamsType {
  displayName: string;
  name: string;
  serviceName: string;
}

export async function queryGitRepository(params: GitRepositoryParamsType) {
  return request('/git/project');
}

export async function queryBranch(params: GitRepositoryParamsType) {
  return request(`/git/${params.serviceName}/branch`);
}
