import { createRouter, createWebHashHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import User from '../views/User.vue'
import Admin from '../views/Admin/Admin.vue'
import AdminEdit from '../views/Admin/AdminEditUser'
import AdminTodo from '../views/Admin/AdminNewTodo'
import AdminStore from '../views/Admin/AdminAddUser'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token")
      if (token) {
        next();
      } else {
        next({ name: 'Login'});
      }
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token")
      const user = JSON.parse(localStorage.getItem("user"))
      if (token) {
        if (user.isAdmin !== true) {
          next({ name: 'User'});
        } else {
          next();
        }
      } else {
        next({ name: 'Login'});
      }
    },
  },
  {
    path: '/admin/store',
    name: 'AdminStore',
    component: AdminStore,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token")
      const user = JSON.parse(localStorage.getItem("user"))
      if (token) {
        if (user.isAdmin !== true) {
          next({ name: 'User'});
        } else {
          next();
        }
      } else {
        next({ name: 'Login'});
      }
    },
  },
  {
    path: '/admin/update/:id',
    name: 'AdminEdit',
    component: AdminEdit,
    params: true,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token")
      const user = JSON.parse(localStorage.getItem("user"))
      if (token) {
        if (user.isAdmin !== true) {
          next({ name: 'User'});
        } else {
          next();
        }
      } else {
        next({ name: 'Login'});
      }
    },
  },
  {
    path: '/admin/create/:id',
    name: 'AdminTodo',
    component: AdminTodo,
    params: true,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token")
      const user = JSON.parse(localStorage.getItem("user"))
      if (token) {
        if (user.isAdmin !== true) {
          next({ name: 'User'});
        } else {
          next();
        }
      } else {
        next({ name: 'Login'});
      }
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
