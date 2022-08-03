import request from '../utils/request'

export const get = () => request({
  url: '/admin/audit/get',
  method: 'post'
})

export const set = (id: number, allow: boolean) => request({
  url: '/admin/audit/set',
  method: 'post',
  data: {
    id, allow
  }
})