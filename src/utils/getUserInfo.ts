import getUserInfo from '@/apis/getUserInfo'
import { useStore } from '@/config/store'

export default async () => {
  const store = useStore()

  const { data: res } = await getUserInfo()

  if (res.code == 200) {
    store.set({ ...res.data, isLogin: true })
  }
}