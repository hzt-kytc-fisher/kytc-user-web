export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}

export function getCookie(key) {
  const name = 'X-' + key + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export function setCookie(key, value, expire) {
  const d = new Date();
  d.setTime(d.getTime() + expire * 60 * 60 * 1000);
  const expires = 'expires=' + d.toGMTString();
  document.cookie = 'X-' + key + '=' + value + '; ' + expires;
}

export function clearCookie(key) {
  setCookie(key, '', -1);
}
