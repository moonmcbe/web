import request from '../utils/request'

export const get = (oldPlayer = false) => request({
  url: '/admin/players/get',
  method: 'post',
  data: {
    oldPlayer
  }
})

export const set = (id: number, allow: boolean, cause?: string) => request({
  url: '/admin/players/set',
  method: 'post',
  data: {
    id, allow, cause
  }
})