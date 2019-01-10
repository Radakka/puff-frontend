import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Games from './views/Games.vue'
import NewGame from './views/NewGame.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/games',
      name: 'games',
      component: Games
    },
    {
        path: '/game/new',
        name: 'newGame',
        component: NewGame
      },
    {
      path: '*',
      redirect: '/games'
    }
  ]
});
