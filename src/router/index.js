import Vue from 'vue'
import Router from 'vue-router'
const HelloWorld = _ => import('@/components/HelloWorld')
const Login = _ => import('@/pages/login')
const Register = _ => import('@/pages/register')
const DashBoard = _ => import('@/pages/Dashboard')
const AddItem = _ => import('@/pages/AddItem')
const SetBudget = _ => import('@/pages/SetBudget')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashBoard,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('budget')) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/add-item',
      name: 'AddItem',
      component: AddItem,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('budget')) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/set-budget',
      name: 'SetBudget',
      component: SetBudget,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('budget')) {
          next()
        } else {
          next('/')
        }
      }
    }
  ]
})
