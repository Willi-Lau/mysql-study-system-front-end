import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import qs from 'qs'
// 引入echarts
// import echarts from 'echarts'
Vue.use(ElementUI);

//设置axios的基础url部分
axios.defaults.baseURL = 'http://localhost:9999/';
//将axios挂载到vue实例上，使用时就可以 this.$axios 这样使用了
Vue.prototype.$axios = axios;

Vue.prototype.$qs = qs;

Vue.config.productionTip = false


// Vue.use(echarts);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
