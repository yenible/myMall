import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-type'

export default {
  // 商品在购物车中的数量加一
  [ADD_COUNTER] (state, payLoad) {
    payLoad.count++
  },
  // 在购物车中添加新的商品
  [ADD_TO_CART] (state, payLoad) {
    payLoad.checked = true
    state.cartList.push(payLoad)
  }
}
