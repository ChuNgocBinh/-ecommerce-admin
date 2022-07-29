import request from 'interceptor/instance';

export function getListShopAccount() {
  return request({
    url: '/shop/list-shop-account',
    method: 'GET',
  });
}

export function updateShopAccount(id, data) {
  return request({
    url: '/shop/update',
    method: 'POST',
    data: {
      shop_id: id,
      data,
    },
  });
}
