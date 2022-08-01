import request from '../utils/request'

export default () => request({
  url: '/getUserInfo',
  method: 'post'
})