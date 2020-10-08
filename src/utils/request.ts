import fetch from 'dva/fetch';
import { message,Modal } from 'antd';
import * as CookieUtils from './cookie';
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  message.error(response.statusText);
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, payload) {
  const body = payload && payload.body;
  const token = CookieUtils.getCookie('token');
  const headers = {};
  headers['token'] = token;
  headers['username'] = CookieUtils.getCookie("username");
  headers['nickName'] = encodeURIComponent(CookieUtils.getCookie("nickName"));
  headers.Accept = 'application/json';

  headers['Content-Type'] = 'application/json';
  const options = {
    ...payload,
    headers,
    credentials: 'same-origin',
  };

  let response = null;
  try {
    //kytc-user-hub
    response = await fetch('/kytc-user-hub' + url, options);
  } catch (e) {
    const error = new Error('访问异常，请尝试重新登陆');
    throw error;
  }
  //checkStatus(response);
  const data = await response.json();
  console.log(data)
  if (data.success) {
    // 测试环境返回data,正式环境去掉外层data
    return data;
  } else {
    if(data.code==="5555"){
      Modal.info({
        title:"提醒",
        content:"token已失效,请重新登录",
        okText:"重新登录",
        onOk() {
          CookieUtils.clearCookie('token');
          CookieUtils.clearCookie('nickname');
          CookieUtils.clearCookie('username');
          CookieUtils.clearCookie('userid');
          window.location.href="/#/./user/login";
        }
      })
      return data;
    } else {
      message.error(data.reason);
      return data;
    }
    
  }
}
