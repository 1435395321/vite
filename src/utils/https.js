import axios from 'axios'; // 引入axios
import { Toast } from 'vant'
const instace = axios.create({
    baseURL:'https://m.maizuo.com/',
    timeout:10000,
    headers:{
        'X-Client-Info':'{"a":"3000","ch":"1002","v":"5.0.4","e":"1606190044635290087587841","bc":"310100"}'
    }
})
// 拦截器
// 请求之前
instace.interceptors.request.use(function (config) {
    // Do something before request is sent
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType:'spinner',
        duration: 0
      });
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 请求之后
instace.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    Toast.clear()
    return response;
  }, function (error) {
      Toast.loading({
          message:'系统错误',
          forbidClick: true,
          loadingType:'spinner',
          duration: 3000
      })
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
export default instace