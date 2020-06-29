import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'news',
        component: () => import(/* webpackChunkName: "news" */ '../views/News.vue'),
        children: [
          {
            path: 'detail',
            component: () => import(/* webpackChunkName */ '../views/Detail.vue')
          }
        ]
      },
      {
        path: 'messages',
        component: () => import(/* webpackChunkName: "messages" */ '../views/Messages.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
