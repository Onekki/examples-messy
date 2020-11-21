import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

const CODE = {
  OK: 200, // "请求成功"),
  ERROR: 0, // "操作失败"),
  ERROR_BAD_REQUEST: 400, // "客户端请求错误"),
  ERROR_UNAUTHORIZED: 401, // "未登录或权限不足"),
  ERROR_FORBIDDEN: 403, // "拒绝请求"),
  ERROR_NOT_FOUND: 404, // "资源不存在"),
  ERROR_METHOD_NOT_ALLOWED: 405, // "请求方式有误, 请检查GET/POST"),
  ERROR_NOT_ACCEPTABLE: 406, // "验证失败"),
  ERROR_PRECONDITION_FAILED: 412, // "缺少头信息或请求参数"),
  ERROR_INTERNAL_SERVER_ERROR: 500 // "服务器内部错误");
}

// 创建axios实例
const remote = axios.create({
  baseURL: '/api',
  timeout: 30000
})

// request拦截器
remote.interceptors.request.use(config => {
  console.log('req:' + config.url, config.method, config.params, config.data)
  return config
}, error => {
  console.error('req error', error)
  Promise.reject(error)
})

// response拦截器
remote.interceptors.response.use(response => {
  const res = response.data
  console.log('resp:' + response.config.url, res)
  if (res.code !== CODE.OK) {
    if (res.code === CODE.ERROR_UNAUTHORIZED) {
      Message({
        showClose: true,
        message: res.msg,
        type: 'error',
        onClose: () => {
          store.dispatch('aRemoveToken').then(() => {
            location.reload()
          })
        }
      })
    } else {
      Message.error(res.msg)
    }
  }
  return res.obj
}, error => {
  console.log('resp error:' + error)
  Message({
    message: error.message,
    type: 'error',
    duration: 3 * 1000
  })
  return Promise.reject(error)
})
export default remote
