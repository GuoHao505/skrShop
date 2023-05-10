import request from '@/utils/request';

export async function getShopTotal(data: any) {
    return request('/shop/getShopTotal', {
        method: 'post',
        data,
    });
}
export async function getChartsList() {
    return request('/shop/getChartsList', {
        method: 'post',
    });
}
export async function getRanking() {
    return request('/shop/getRanking', {
        method: 'post',
    });
}
export async function getShopList(data: any) {
    return request('/shop/getShopList', {
        method: 'post',
        data,
    });
}
export async function getSalesProportion() {
    return request('/shop/getSalesProportion', {
        method: 'post',
    });
}