import axios from 'axios'
const baseURL = 'http://127.0.0.1:5555'
axios.defaults.baseURL = baseURL
axios.default.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json'
const instance = axios.create()
instance.defaults.headers.post['Content-Type'] = 'application/json'
axios.interceptors.request.use = instance.interceptors.request.use
instance.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = `token ${localStorage.getItem('token')}`
      .replace(/(^")|("$)/g, '')
  }
  return config
}, err => {
  return Promise.reject(err)
})
// axios拦截响应
instance.interceptors.response.use(response => {
  return response
}, err => {
  return Promise.reject(err)
})

export default {
  // 用户注册
  userRegister (data) {
    return instance.post('/api/register', data)
  },
  // 用户登录
  UserLogin (data) {
    return instance.post('/api/login', data)
  },
  // 获取用户
  getUser () {
    return instance.get('/api/user')
  }
}
