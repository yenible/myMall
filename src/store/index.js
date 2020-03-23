import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.使用插件
Vue.use(Vuex)

// 2.创建store对象
const store = new Vuex.Store({
  state: {
    // 用于存放放入购物车的商品
    cartList: []
  },
  // mutation目的是修改state中的状态
  // 同时mutation尽量完成的东西单一，方便阅读
  mutations,
  // actions用于异步调用，但是假如操作比较复杂一般也放到action中
  actions,
  getters
})

// 3.挂载Vue实例上
export default store
