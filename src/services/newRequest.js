/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */

/*
 *  接口请求封装
 * @Author: nowThen
 * @Date: 2019-08-14 12:00:02
 */
import axios from 'axios'; // 引入axios
import { message } from 'antd'; // 提示框
import { autoMatch, checkStatus } from '../utils/index'; // 附近处理函数

let inError = false;
// 创建axios实例
const instance = axios.create({
  baseURL: '/app',
  timeout: 15000, // 请求超时时间
  headers: {
    authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbiI6ZmFsc2UsImF1ZCI6ImhzamEtYXJjLXJlYWN0b3ItdXNlciIsImV4cCI6MTczMzMwNTgwMTQ3NSwiaWF0IjoxNzMzMjk4NjAxNDc1LCJpc3MiOiJoc2phLWRldiIsImp0aSI6ImE1OGE5NTg3LTAwNjQtNGU1MS1iNjk2LWY4NDllZmFjNmEyYiIsIm5hbWUiOiLokaPkuovplb8iLCJuYmYiOjE3MzMyOTg2MDE0NzUsIm9yZ3MiOlsxLDE1XSwicm9sZXMiOls1LDIsOCwxMiwzXSwic3ViIjoiYXJjLXJlYWN0b3IiLCJ1c2VySWQiOjIsInVzZXJuYW1lIjoiYmlnYm9zcyJ9.T5pDQaZAHHjGiqm6DgvLV0jX5v5A69aORdVFcbSFZXU',
  },
});

// 实例添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    if (config.header) {
      config.headers = { ...config.headers, ...config.header };
    }
    if (config.method == 'post') {
      config.data = {
        ...config.data,
      };
      config.params = {
        _t: Date.parse(new Date()),
      };
    } else if (config.method == 'get') {
      config.params = {
        _t: Date.parse(new Date()),
        ...config.params,
      };
    }
    return config;
  },
  (error) =>
    // 对请求错误做处理...
    Promise.reject(error),
);

// 实例添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做处理，以下根据实际数据结构改动！！...
    const { code } = response.data || {};
    if (code === 109 || code === 108) {
      // 请求超时，跳转登录页
      if (!inError) {
        message.warning('登录超时，即将跳转到登录页面...');
        inError = true;
        setTimeout(() => {
          message.destroy();
          window.location.href = '/login';
          inError = false;
        }, 2000);
      }

      return Promise.resolve({});
    } else if (response) {
      return Promise.resolve(checkStatus(response));
    }
  },
  (error) => {
    // 对响应错误做处理...
    // console.log(error);
    if (error.response) {
      return Promise.reject(checkStatus(error.response));
    } else if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      return Promise.reject({ msg: '请求超时' });
    } else {
      return Promise.reject({});
    }
  },
);

// const request = async (opt) => {
//   const options = {
//     method: 'get',
//     ifHandleError: true, // 是否统一处理接口失败(提示)

//     ...opt,
//   };
//   // 匹配接口前缀 开发环境则通过proxy配置转发请求； 生产环境根据实际配置
//   options.baseURL = autoMatch(options.prefix);
//   try {
//     const res = await instance(options);
//     // console.log(res);
//     if (!res.success && options.ifHandleError) {
//       // 自定义参数，是否允许全局提示错误信息
//       message.error(res.message || '请求处理失败！');
//     }
//     return res;
//   } catch (err) {
//     if (options.ifHandleError) {
//       // 自定义参数，是否允许全局提示错误信息
//       message.error(err.message || err.msg || '请求处理失败！');
//     }
//     return err;
//   }
// };

export default instance;
