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

export function getUserItem(id) {
  return request({
    url: `/auth/list-user/${id}`,
    method: 'GET',
  });
}

export function updateUser(id, data) {
  return request({
    url: `/auth/update-user/${id}`,
    method: 'POST',
    data,
  });
}

export function deleteUser(id) {
  return request({
    url: `/auth/delete-user/${id}`,
    method: 'POST',
  });
}
