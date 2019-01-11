import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Games from './views/Games.vue'
import NewGame from './views/NewGame.vue'
import Game from './views/Game.vue'

Vue.use(Router)

const router = new Router({
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
        path: '/game/:gameId',
        name: 'game',
        component: Game
    },
    {
      path: '*',
      redirect: '/games'
    }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/');
  }

  if(!authRequired && loggedIn) {
      return next('/games')
  }

  next();
})

export default router;
