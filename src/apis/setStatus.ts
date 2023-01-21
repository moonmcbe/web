import request from '../utils/request'

export default (
  id: string,
  newStatus: number,
  duration: number | string,
  note: string,
  cause: string
) =>
  request({
    url: '/admin/set_status',
    method: 'post',
    data: {
      id,
      newStatus,
      duration: Number(duration),
      note,
      cause
    }
  })
