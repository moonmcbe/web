interface Data {
  type: 'default' | 'error' | 'primary' | 'info' | 'success' | 'warning'
  text: string
}

export const statusTypes = [
  {
    type: 'default',
    text: '未验证'
  },
  {
    type: 'success',
    text: '正常'
  },
  {
    type: 'warning',
    text: '临时封禁'
  },
  {
    type: 'error',
    text: '永久封禁'
  },
  {
    type: 'info',
    text: '其他'
  },
  {
    type: 'info',
    text: '退群'
  }
]

export default (status: number): Data => {
  return (
    (statusTypes[status as 0 | 1 | 2 | 3 | 4 | 5] as Data) || {
      type: 'default',
      text: status
    }
  )
}
