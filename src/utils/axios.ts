import axios from 'axios'; // 引入axios
import * as qs from 'qs';
// 先导入vuex,因为我们要使用到里面的状态对象
// vuex的路径根据自己的路径去写

axios.defaults.baseURL = 'https://m.maizuo.com/';
axios.defaults.timeout = 1000;
// post请求头的设置
axios.defaults.headers['X-Client-Info'] = '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606190044635290087587841","bc":"310100"}'
axios.defaults.headers['X-Host'] = 'mall.film-ticket.film.list'


/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url: any, params: any) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: params
		}).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err.data)
		})
	});
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url: any, params: any) {
	return new Promise((resolve, reject) => {
		axios.post(url, qs.stringify(params))
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}
