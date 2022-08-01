import request from '../utils/request'

export default (qq:string, code: string) => request({
  url: '/login',
  method: 'post',
  data: {
    qq, code
  }
})