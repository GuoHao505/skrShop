import request from '@/utils/request';

export async function getShopTotal(data: any) {
    return request('/shop/getShopTotal', {
        method: 'post',
        data,
    });
}
export async function getChartsList(data: any) {
    return request('/shop/getChartsList', {
        method: 'post',
        data,
    });
}
export async function getRanking(data: any) {
    return request('/shop/getRanking', {
        method: 'post',
        data,
    });
}