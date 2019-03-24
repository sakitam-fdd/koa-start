import axios from 'axios';

axios.default.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.request.use = instance.interceptors.request.use;
instance.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = `token ${localStorage.getItem('token')}`
      .replace(/(^")|("$)/g, '');
  }
  return config;
}, err => Promise.reject(err));
// axios拦截响应
instance.interceptors.response.use(response => response, err => Promise.reject(err));

export default {
  // 用户注册
  userRegister(data) {
    return instance.post('/register', data, {
      baseURL: 'http://localhost:8888',
    });
  },
  // 用户登录
  UserLogin(data) {
    return instance.post('/login', data, {
      baseURL: 'http://localhost:8888',
    });
  },
  // 获取用户
  getUser() {
    return instance.get('/user', {
      baseURL: 'http://localhost:8888',
    });
  },
  wallpaper() {
    return instance.get('/wallpaper', {
      params: {
        format: 'js',
        idx: parseInt(Math.random() * 10, 10),
        n: 1,
        nc: (new Date()).getTime(),
        pid: 'hp',
      },
      baseURL: 'http://localhost:8888',
    });
  },
};
