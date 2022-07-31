import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "home" */ '../pages/Home.vue')
  },
  {
    path: '/submit',
    name: 'Submit',
    component: () =>
      import(/* webpackChunkName: "home" */ '../pages/Submit.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router