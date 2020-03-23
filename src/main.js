import Vue from 'vue'
import vueLazyLoad from 'vue-lazyload'

import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'

Vue.config.productionTip = false
// 添加事件总线对象
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)

// 使用懒加载lazy-load
Vue.use(vueLazyLoad, {
  // 可以用来导入等着替换的图片
  loading: require('assets/img/common/placeholder.jpg')
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
