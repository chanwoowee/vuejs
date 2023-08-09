import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Timecode from '../views/Timecode.vue'
import Sketch from '../views/Sketch.vue'
import Chat from '../views/Chat.vue'
import Lotto from '../views/Lotto.vue'
import Button from '../views/Button.vue'
import Var from '../views/Var.vue'
import NotFoundComponent from '../views/NotFoundComponent.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // redirect: {
    //   name: "Check"
    // },
    children: [
      // {
      //   path: '/check',
      //   name: 'Check',
      //   component: Check
      // }
    ]
  },
  {
    path: '/timecode',
    name: 'Timecode',
    component: Timecode
  },
  {
    path: '/sketch',
    name: 'Sketch',
    component: Sketch
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/lotto',
    name: 'Lotto',
    component: Lotto
  },
  {
    path: '/button',
    name: 'Button',
    component: Button
  },
  {
    path: '/var',
    name: 'Var',
    component: Var
  },
  {
    path: '/:pathMatch(.*)',
    component: NotFoundComponent
    // redirect: "/404"
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router