import request from '@/utils/request';

export async function getBrandList() {
    return request('/brand/getBrandList', {
        method: 'get',
    });
}
export async function deleteBrand(data: any) {
    return request('/brand/deleteBrand', {
        method: 'post',
        data,
    });
}
export async function upDateBrand(data: any) {
    return request('/brand/upDateBrand', {
        method: 'post',
        data,
    });
}
export async function addBrand(data: any) {
    return request('/brand/addBrand', {
        method: 'post',
        data,
    });
}