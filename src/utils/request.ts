import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_APP_ApiBaseurl

// http request 拦截器
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token && config.headers) { // 判断token是否存在
      config.headers.Authorization = 'Bearer ' + token  // 将token设置成请求头
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  config => {
    // 身份认证失败，跳转登录
    if (config?.data?.code == 401) {
      // router.push('/login')
    }

    return config
  },
  err => {
    return Promise.reject(err)
  }
)

export default axios