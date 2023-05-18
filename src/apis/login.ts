import request from '../utils/request'

export default (qq: string, code: string, keepLogin = false) => request({
  url: '/login',
  method: 'post',
  data: {
    qq, code, keepLogin
  }
})

export const usePassword = (qq: string, password: string, keepLogin = false) => request({
  url: '/login/usePassword',
  method: 'post',
  data: {
    qq, password, keepLogin
  }
})