import request from '../utils/request'

export const get = () => request({
  url: '/admin/audit/get',
  method: 'post'
})