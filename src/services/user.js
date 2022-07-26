import request from 'interceptor/instance';

export function login(data) {
  return request({
    url: '/auth/login/admin',
    method: 'POST',
    data,
  });
}

export function getMe(data) {
  return request({
    url: '/auth/me-admin',
    method: 'GET',
  });
}

export function getListUser() {
  return request({
    url: '/auth/list-user',
    method: 'GET',
  });
}
