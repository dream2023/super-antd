// 引入 axios
import axios from 'axios';

// 创建新的 axios 实例
const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/3bff4788a9dad8a803681a2bca5f9cae/api/',
});

// 创建相应拦截器
instance.interceptors.response.use(
  function ({ status, data: { code, message, data } }) {
    // 如果响应结果是 200 且 code 为 0 ，则代表请求成功
    if (status === 200 && code === 0) {
      // 直接返回请求数据，取出响应结果里的 data 数据
      return data;
    }

    // 否则是请求失败
    // 请求失败有两种返回结果
    // 第一种返回结果是 string 类型，代表错误信息
    // return Promise.reject(msg);

    // 表单错误回显
    // 第二种返回结果是 object 类型，代表其中 message 代表错误信息，errors 代表错误的详细解释
    // 这种情况主要是应对表单服务器校检回显
    return Promise.reject({
      message,
      errors: data,
    });
  },
  function (error) {
    // 一般是跨域或者网络错误
    // 我们可以直接返回 error，内部会自动获取 error.message 属性
    return Promise.reject(error);
  },
);

// 导出
export default instance;
