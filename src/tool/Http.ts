import Axios from 'axios'
import { message } from 'antd';

// 添加请求拦截器
Axios.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
Axios.interceptors.response.use((response) => {
    const data = response.data
    // 请求失败
    if (data.success === false) {
       message.info(data.message) 
    }
    return response;
}, (error) => {
    message.error('接口请求失败,请重试');
    return Promise.reject(error);
})

let domain = ''
domain = 'https://localhost:3333/'

interface Axios {
    [AxiosStatic:string]: any; // Add index signature
}

export default class Http {
    static get(url: string, params: object, callback: any) {
        this.baseRequest('get', domain + url, params, callback)
    }
    
    static post(url: string, params: object, callback: any) {
        this.baseRequest('post', domain + url, params, callback)
    }

    static delete(url: string, params: object, callback: any) {
        this.baseRequest('delete', domain + url, params, callback)
    }

    // 发送方法基础结构
    static baseRequest(method: string, url: string, params: object, callback: any) {
        // get和delete都用params
        const AxiosRequest = method === 'post' ? Axios.post(url, params)
            : (Axios as any)[method](url, {
                params: params
            });
        AxiosRequest.then((response: any) => {
            const data = response.data
            if (data.success === true) {
                if (callback) callback(data)
            }
        })
    }

    static request(config: object) {
        return Axios(config)
    }

}
