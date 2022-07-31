import request from '@/utils/request'
export default (id:string, code:string): any => {
  return request({
    method: 'POST',
    url: '/validation',
    data: {
      id, code
    }
  })
}