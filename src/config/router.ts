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
  },
  {
    path: '/validation/:id',
    name: 'Validation',
    component: () =>
      import(/* webpackChunkName: "home" */ '../pages/Validation.vue')
  },
  {
    path: '/check/:id',
    name: 'Check',
    component: () =>
      import(/* webpackChunkName: "home" */ '../pages/Check.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "home" */ '../pages/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () =>
      import(/* webpackChunkName: "home" */ '../pages/Admin/Admin.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () =>
          import(/* webpackChunkName: "home" */ '../pages/Admin/Index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((e) => {
  if (!localStorage.getItem('token')) {
    return false
  }
})

export default router