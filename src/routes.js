import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import notePage from './components/notePage'
import notesPage from './components/notesPage'


const routes = [
   {
      path: '/',
      redirect: '/notes'
   },
   {
      path: '/notes',
      component: notesPage
   },
   {
      path: '/notes/:id',
      component: notePage
   },
   {
      path: '*',
      redirect: '/notes'
   },

]

export const router = new VueRouter({
   routes,
   mode: 'history'
})