import request from '@/utils/request';

export async function getStoreList() {
    return request('/store/getStoreList', {
        method: 'get',
    });
}
export async function deleteStore(data: any) {
    return request('/store/deleteStore', {
        method: 'post',
        data,
    });
}
export async function upDateStore(data: any) {
    return request('/store/upDateStore', {
        method: 'post',
        data,
    });
}
export async function addStore(data: any) {
    return request('/store/addStore', {
        method: 'post',
        data,
    });
}