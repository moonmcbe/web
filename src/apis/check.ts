import request from '../utils/request'

export default (id:string) => request({
  url: '/validation/check',
  method: 'post',
  data: {
    id
  }
})