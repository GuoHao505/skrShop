
import { extend } from 'umi-request';
import { message } from 'antd';
import { setRequestTimeToLocalStorage, removeToken, getToken } from './mainAppBridge';

const request = extend({
  prefix: SERVICE_URL,
  errorHandler: (error: any) => error.response,
  // credentials: 'include',
});

request.interceptors.request.use((url: any, options: any) => {
  const token = getToken();
  return {
    url,
    options: {
      ...options,
      headers: { authorization: token ? token : '' },
    }
  }
});

request.interceptors.response.use(async (response: any, options: any) => {
  let result = options.responseType === 'blob' ? response.clone() : await response.clone().json();
  if (result.code === 200) {
    setRequestTimeToLocalStorage();
    return result
  }
  if (result.code === 401 || result.code === 304007 || result.code === 304020) {
    removeToken();
    message.error("验证信息失效,请重新登录", 1);
    console.log('[ApiResponse][验证信息失效,请重新登录]', result)
    let timer = setTimeout(() => {
      clearTimeout(timer)
      location.href = '/user/login';
    }, 1000)
  }
  return result;
})

export default request;
