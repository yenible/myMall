import Toast from './Toast.vue'

const obj = {}
// 在mian.js安装插件后会执行obj.install函数
// 默认会传递一个vue
obj.install = function (Vue) {
  // Toast还未挂载，导致$el无定义
  // document.body.appendChild(Toast.$el)

  // 1.创建组件构造器
  const ToastContrustor = Vue.extend(Toast)

  // 2.new的方式根据组件构造器可以创建处理一个组件对象
  const toast = new ToastContrustor()

  // 3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4.toast.$el 对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj
