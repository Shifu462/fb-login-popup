import Vue from 'vue'
import '@/styles/common.scss';
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
