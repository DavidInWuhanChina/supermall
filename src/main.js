import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import vueSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import toast from 'components/common/toast'
// import FastClick from 'fastclick'
import LazyLoad from 'vue-lazyload'
import VueKinesis from 'vue-kinesis'


Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)

Vue.use(vueSwiper)

Vue.use(VueKinesis)

//解决移动端300ms延迟
// FastClick.attach(document.body)

// Vue.use(LazyLoad, {
//   loading:require('./assets/img/common/placeholder.png')
// })

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
