import request from '../utils/request'

export default (id: string, newName: string) => request({
  url: '/admin/edit_name',
  method: 'post',
  data: {
    id, newName
  }
})