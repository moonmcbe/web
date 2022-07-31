import request from '@/utils/request'
export default (data:any): any => {
  return request({
    method: 'POST',
    url: '/submit',
    data: data
  })
}