export const setItemLocalStorage = (key: string, data: any) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(
      `ErrorTips:【setItemLocalStorage】-> Error occurred when storing ${key} data into localStorage`,
      error,
    );
  }
};
export const getItemLocalStorage = (key: string) => {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    console.log(
      `ErrorTips:【getItemLocalStorage】-> Error occurred when fetching ${key} data from localStorage`,
      error,
    );
    return null;
  }
};
/**
 * @function setRequestTimeToLocalStorage - 设置请求时间到LocalStorage
 * @param {string} requestTimeKey - 键名
 */
export const setRequestTimeToLocalStorage = (requestTimeKey = 'requestTime') => {
  setItemLocalStorage(requestTimeKey, new Date().getTime());
}
/**
 * @function removeToken - 移除Token
 */
export const removeToken = () => {
  localStorage.removeItem('auth');
  localStorage.removeItem('requestTime');
  // localStorage.removeItem('token');
  // localStorage.removeItem('username');
  // localStorage.removeItem('menuList');
}

export const setAuth = (auth: any, authKey = 'auth') => {
  if (auth) {
    // auth.expires_in = auth.expires_in * 1000;
    setItemLocalStorage(authKey, auth);
    // setItemLocalStorage('username', auth.username)
    // setItemLocalStorage('token', `${auth.token_type} ${auth.access_token}`)
  }
}
export const getAuth = (authKey = 'auth') => {
  const auth = getItemLocalStorage(authKey);
  if (auth) {
    return JSON.parse(auth);

  }
}
export const getRole = (role: any) => {
  const auth = getItemLocalStorage('auth');
  if (auth) {
    let parseAuth = JSON.parse(auth);
    return parseAuth.userInfo?.role === role ? true : false;
  }
}

/**
 * @function getToken - 从localStorage获取Token
 * @param {string} tokenKey - 键名
 * @returns {string} - token: string
 */
export const getToken = (tokenKey = 'auth') => {
  const auth = getItemLocalStorage(tokenKey);
  if (auth) {
    let parseAuth = JSON.parse(auth);
    return parseAuth.token || '';
  }
  return ''
}

