import request from '@/utils/request';

export async function getUser() {
    return request('/user/getUserInfo', {
        method: 'get',
    });
}

export async function deleteUser(data: any) {
    return request('/user/deleteUserInfo', {
        method: 'post',
        data,
    });
}
export async function updateUser(data: any) {
    return request('/user/updateUserInfo', {
        method: 'post',
        data,
    });
}
export async function addUserInfo(data: any) {
    return request('/user/addUserInfo', {
        method: 'post',
        data,
    });
}