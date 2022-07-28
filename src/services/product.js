import request from 'interceptor/instance';

export function getListProductWaiting() {
  return request({
    url: '/product/list-product-waiting',
    method: 'GET',
  });
}

export function getListProductAccept() {
  return request({
    url: '/product/list-product',
    method: 'GET',
  });
}

export function getDataItemProduct(id) {
  return request({
    url: `/product/item/${id}`,
    method: 'GET',
  });
}

export function updateProductItem(id, data) {
  return request({
    url: `/product/update-product/${id}`,
    method: 'POST',
    data,
  });
}
