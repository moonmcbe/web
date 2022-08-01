import { defineStore } from 'pinia'

export const useStore = defineStore('user', {
  state: () => {
    return {
      isLogin: false,
      username: '',
      id: -1,
      permissions: 1,
      status: 1,
      qq: 0
    }
  },
  actions: {
    set(data: object) {
      for (const i in data) {
        // eslint-disable-next-line
        // @ts-ignore
        this[i] = data[i]
      }
    }
  }
})