import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "home" */ '../pages/Home.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () =>
      import(/* webpackChunkName: "search" */ '../pages/Search.vue')
  },
  {
    path: '/submit',
    name: 'Submit',
    component: () =>
      import(/* webpackChunkName: "submit" */ '../pages/Submit.vue')
  },
  {
    path: '/validation/:id',
    name: 'Validation',
    component: () =>
      import(/* webpackChunkName: "validation" */ '../pages/Validation.vue')
  },
  {
    path: '/check/:id',
    name: 'Check',
    component: () =>
      import(/* webpackChunkName: "check" */ '../pages/Check.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../pages/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () =>
      import(/* webpackChunkName: "admin" */ '../pages/Admin/Admin.vue'),
    children: [
      {
        path: '',
        name: 'Overview',
        component: () =>
          import(/* webpackChunkName: "adminOverview" */ '../pages/Admin/Overview.vue')
      },
      {
        path: 'audit',
        name: 'Audit',
        component: () =>
          import(/* webpackChunkName: "adminAudit" */ '../pages/Admin/Audit.vue')
      },
      {
        path: 'players',
        name: 'Players',
        component: () =>
          import(/* webpackChunkName: "players" */ '../pages/Admin/Players.vue')
      }

    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((e) => {
  if (e.path.indexOf('/admin') != -1) {
    if (!localStorage.getItem('token')) {
      return '/login'
    }
  }
})

export default router