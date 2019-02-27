import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import ChatRoom from './views/ChatRoom.vue';
import VueYoutube from 'vue-youtube';

Vue.use(Router);
Vue.use(VueYoutube)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/char-room/:username',
      name: 'ChatRoom',
      component: ChatRoom,
    },
  ],
});