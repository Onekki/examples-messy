import axios from 'axios'
import { Message } from "element-ui";

// import store from '../store'

// 创建axios实例
const remote = axios.create({
    baseURL: "/api",
    timeout: 30000
})

//request拦截器
remote.interceptors.request.use(config => {
    return config
}, error => {
    // eslint-disable-next-line no-console
    console.error(error)
    Promise.reject(error)
})

//response拦截器
remote.interceptors.response.use(response => {
    const res = response.data;
    // eslint-disable-next-line no-console
    console.log(res)
    return res;
}, error => {
    // eslint-disable-next-line no-console
    console.log("error:" + error);
    Message({
        message: error.message,
        type: "error",
        duration: 3 * 1000
    })
    return Promise.reject(error)
})
export default remote

