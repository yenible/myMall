import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-type'

export default {
  // 此时的context也可以使用解构，{state，commit}
  addCart (context, payLoad) {
    return new Promise((resolve, reject) => {
      let oldProduct = null
      // 遍历，看是否已经存在该商品
      for (const item of context.state.cartList) {
        if (item.iid === payLoad.iid) {
          oldProduct = item
        }
      }
      // 判断，若存在该商品，则数量加一
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else {
        context.commit(ADD_COUNTER, payLoad)
        context.commit(ADD_TO_CART, payLoad)
        resolve('添加购物车成功')
      }
    })
  }
}
