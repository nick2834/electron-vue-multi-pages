import http from "axios";
import qs from "qs";
const Token = sessionStorage.Authorization || null
// http 配置
http.defaults.timeout = 50000;
// http.defaults.baseURL = process.env.DEV_SERVER;
http.defaults.baseURL = '';
http.defaults.headers.common['Authorization'] = Token;
http.defaults.headers.common['ContentType'] = 'application/json;Charset=UTF-8';
// http request 拦截器
http.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default http;
