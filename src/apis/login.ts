import request from '../utils/request'

export default (qq: string, code: string, keepLogin = false) => request({
  url: '/login',
  method: 'post',
  data: {
    qq, code, keepLogin
  }
})