import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import wysiwyg from "vue-wysiwyg";

Vue.config.productionTip = false
Vue.use(wysiwyg, {});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
