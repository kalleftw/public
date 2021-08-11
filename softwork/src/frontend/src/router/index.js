import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },

  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },

  {
    path: '/Favorites',
    name: 'Favorites',
    component: () => import('../views/Favorites.vue')
  },

  {
    path: '/Logout',
    name: 'Logout',
    component: () => import('../views/Logout.vue')
  },

  {
    path: '/500',
    name: '500',
    component: () => import('../views/error/500.vue')
  },

  { 
  path: '/:pathMatch(.*)*', 
  name: '404',
  component: () => import('../views/error/404.vue')
},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
