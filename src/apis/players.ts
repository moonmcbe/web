import request from '../utils/request'

export const get = () => request({
  url: '/admin/players/get',
  method: 'post'
})

export const set = (id: number, allow: boolean, cause?: string) => request({
  url: '/admin/players/set',
  method: 'post',
  data: {
    id, allow, cause
  }
})