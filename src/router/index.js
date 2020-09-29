import Vue from 'vue'
import VueRouter from 'vue-router'
import Book from '../views/Book.vue'
import Login from '../views/Login.vue'
import store from '.././store'
import Home from '../views/Home.vue'
import Loan from '../views/Loan.vue'
import Borrower from '../views/Borrower.vue'
import Category from '../views/Category.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/book',
    name: 'book',
    component: Book,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/loan',
    name: 'loan',
    component: Loan,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/borrower',
    name: 'borrower',
    component: Borrower,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/borrower/:id',
    name: 'showBorrower',
    component: () => import('../views/Borrower/showBorrower.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/category',
    name: 'category',
    component: Category,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !store.state.loggedIn) {
    next('login')
  } else {
    next()
  }
})

export default router
