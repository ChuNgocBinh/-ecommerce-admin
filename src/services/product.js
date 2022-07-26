import request from 'interceptor/instance';

export function getListProductWaiting() {
  return request({
    url: '/product/list-product-waiting',
    method: 'GET',
  });
}
