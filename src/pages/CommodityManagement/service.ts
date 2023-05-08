import request from '@/utils/request';

export async function getShopList(data:any) {
    return request('/shop/getShopList', {
        method: 'post',
        data,
    });
}
export async function deleteShop(data: any) {
    return request('/shop/deleteShop', {
        method: 'post',
        data,
    });
}
export async function upDateShop(data: any) {
    return request('/shop/upDateShop', {
        method: 'post',
        data,
    });
}
export async function addShop(data: any) {
    return request('/shop/addShop', {
        method: 'post',
        data,
    });
}