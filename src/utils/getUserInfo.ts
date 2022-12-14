import getUserInfo from '@/apis/getUserInfo'
import { useStore } from '@/config/store'
import VConsole from 'vconsole'

export default async () => {
  const store = useStore()

  if (localStorage.token) {
    const { data: res } = await getUserInfo()
    if (res.code == 200) {
      store.set({ ...res.data, isLogin: true })
    }

    if (store.isLogin && store.permissions >= 5) {
      const vConsole = new VConsole()
      vConsole.setSwitchPosition(document.body.clientWidth - 100, 0)
    }
  }

}