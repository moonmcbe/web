import request from '../utils/request'

export default (name?:string, qq?:string) => request({
  url: '/query',
  method: 'post',
  data: {
    name, qq
  }
})