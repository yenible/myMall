<template>
  <div>
    <div class="param-rule" v-if="Object.keys(paramsRule).length !== 0">
      <p class="disclaimer">{{paramsRule.disclaimer}}</p>
      <p class="key">{{paramsRule.key}}:</p>
      <table>
        <tr v-for="(item, index) in paramsRule.tables[0]"
        :key="index">
          <td v-for="(arrItem, ind) in item" :key="ind">{{arrItem}}</td>
        </tr>
        <tr>
          <td v-for="(arrItem, ind) in paramsRule.tables[1]" :key="ind">{{arrItem[1]}}</td>
        </tr>
      </table>
    </div>
    <div class="param-info">
      <p class="key">{{paramsInfo.key}}:</p>
      <table>
        <tr v-for="(item, index) in paramsInfo.set"
        :key="index">
          <td>{{item.key}}</td>
          <td>{{item.value}}</td>
          <!-- <td v-else v-for="(arrItem, ind) in item.value" :key="ind">{{arrItem}}</td> -->
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailParamsInfo',
  props: {
    paramsInfo: {
      type: Object,
      default: function () {
        return {}
      }
    },
    paramsRule: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.disclaimer{
  border-bottom: 3px solid #beb7b7;
  padding-bottom: 20px;
}
.key{
  font-size: 22px;
  margin: 10px 20px;
}
.param-rule table{
  width: 100vw;
  margin: 25px;
  border-bottom: 2px solid #c4bdbd;
}
.param-rule tr{
  /* width: 100vw; */
  display: flex;
  border-bottom: 1px solid #c4bdbd;
}
.param-rule td{
  flex:1;
  font-size: 20px;
  line-height: 30px;
  height: 30px;
}
.param-info table{
  width: 100vw;
}
.param-info tr{
  width: 100%;
}
.param-info td{
  padding: 10px 20px;
  border-bottom: 1px solid #a19d9d;
}
.param-info td:nth-child(2){
  color: rgb(238, 31, 117);
}
</style>
