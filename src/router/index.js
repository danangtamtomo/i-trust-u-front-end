import Vue from 'vue'
import VueRouter from 'vue-router'

// layout
import HomepageLayout from '../components/Layout/Homepage'

import HomepageIndex from '../components/Home/HomepageIndex'
import Login from '../components/Auth/Signin'
import ForgotPassword from '../components/Auth/ForgotPassword'

// Dashboard
import DashboardStart from '../components/Dashboard'
import Dashboard from '../components/Dashboard/layout'

import { requireAuth } from '../utils/auth'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomepageLayout,
      children: [
        {
          path: '',
          name: 'HomepageIndex',
          component: HomepageIndex
        },
        {
          path: '/login',
          name: 'Login',
          component: Login
        },
        {
          path: '/forgot-password',
          name: 'ForgotPassword',
          component: ForgotPassword
        }
      ]
    },
    {
      path: '/dashboard',
      beforeEnter: requireAuth,
      component: Dashboard,
      children: [
        {
          path: '',
          name: 'DashboardStart',
          component: DashboardStart
        },
        {
          path: 'users',
          component: UserLayout,
          children: [
            {
              path: '',
              name: 'UserIndex',
              component: UserIndex
            },
            {
              path: 'create',
              name: 'CreateUser',
              component: CreateUser
            },
            {
              path: ':id',
              name: 'DetailUser',
              component: DetailUser
            }
          ]
        }
      ]
    }
  ]
})
