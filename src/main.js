import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import './plugins/socketPlugin';
//import Directives from './plugins/directives';
import router from './router';
import store from './store';

import './assets/_common.scss';

Vue.config.productionTip = false;
//Vue.use(Directives);

new Vue({
  router,
  store, // 모든 하위 컴포넌트에 저장소 인스턴스가 삽입 된다. this.$store로 사용 가능
  render: h => h(App),
}).$mount('#app');
