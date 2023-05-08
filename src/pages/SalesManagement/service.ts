import request from '@/utils/request';

export async function getShopSales(data: any) {
    return request('/shop/getShopSales', {
        method: 'post',
        data,
    });
}
export async function getShopCategory() {
    return request('/shop/getShopCategory', {
        method: 'get',
    });
}
