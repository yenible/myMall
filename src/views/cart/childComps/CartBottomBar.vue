<template>
  <div class="bottom-bar" :value='true'>
    <div class="checkAll">
      <check-button :value="isSelectAll" @click.native="checkAll" class="check-button"></check-button>
      <span>全选</span>
    </div>
    <!-- 合计 -->
    <div class="totalPrice">
      合计: {{totalPrice}}
    </div>
    <div class="amount">
      确认:数量 {{checkLength}}
    </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton'
import { mapGetters } from 'vuex'

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice: function () {
      return '￥' + this.cartList.filter(item => {
        return item.checked
        // 再用reduce汇总所有数据
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0)
    },
    checkLength () {
      return this.cartList.filter(item => {
        return item.checked
        // 再用reduce汇总所有数据
      }).length
    },
    isSelectAll () {
      // 找出是否有未被选择的商品，若有责全选按钮无效
      // 利用过滤器filter遍历所有效率不是很好
      // return !(this.cartList.filter(item => { return !item.checked }).length)
      // 使用find函数只要查到找一个未被选中的即可
      return !this.cartList.find(item => { return !item.checked })
    }
  },
  methods: {
    checkAll: function () {
      // 全部选中
      if (this.isSelectAll) {
        this.cartList.forEach(element => { element.checked = false })
      } else {
        this.cartList.forEach(element => { element.checked = true })
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background-color: rgb(224, 213, 213);
    position: relative;
    display: flex;
  }
  .checkAll{
    display: flex;
    width: 60px;
    margin: auto 2px;
    height: 40px;
    /* align-items:center; */
  }
  .checkAll span{
    /* text-align: center; */
    line-height: 40px;
  }
  .check-button{
   /* 利用 align-items:center;也可以让button居中 */
    margin: auto;
  }
  .totalPrice{
    /* right: 30px; */
    /* position: absolute; */
    margin-left: 50px;
    font-size: 20px;
    line-height: 40px;
  }
 .amount{
   line-height: 40px;
   right: 0px;
   position: absolute;
   background-color: red;
   padding: 0 10px;
   font-size: 18px;
   color: white;
 }
</style>
