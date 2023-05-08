import request from '@/utils/request';

export async function handleLogin(data: any) {
  return request('/user/login', {
    method: 'POST',
    data,

  });
}
export async function handleRegister(data: any) {
  return request('/user/register', {
    method: 'POST',
    data,

  });
}
export async function changePassword(data: any) {
  return request('/user/changePassword', {
    method: 'POST',
    data,

  });
}