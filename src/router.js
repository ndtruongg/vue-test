import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import guest from './middleware/guest'
import auth from './middleware/auth'
import log from './middleware/log'
import middlewarePipeline from './middleware/middlewarePipeline'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./layouts/OpenSidebar.vue'),
    meta: {
      middleware: [log]
    },
    children: [
      {
        path: '',
        component: () => import('./pages/Home.vue')
      },
      {
        path: 'about',
        component: () => import('./pages/About.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./pages/Login.vue'),
    meta: {
      middleware: [log, guest]
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('./pages/Dashboard.vue'),
    meta: {
      middleware: [auth]
    }
  }
]

const router = new VueRouter({ mode: 'history', routes })

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }

  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    router,
    store
  }

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
