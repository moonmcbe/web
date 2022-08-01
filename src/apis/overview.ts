import request from '../utils/request'

export default () => request({
  url: '/admin/overview',
  method: 'post'
})