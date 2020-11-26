import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

var islogged = false;

new Vue({
  router,
  vuetify,
  islogged,
  render: h => h(App)
}).$mount('#app')
