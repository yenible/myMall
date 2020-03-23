<template>
  <div class="subject">
    <scroll class="content">
      <ul>
        <li v-for="(item, index) in subjectInfo"
         :key="index" :class="{active: index === currentIndex}"
          @click="checkIndex(index)">
          <div>{{item.title}}</div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'

export default {
  name: 'CategorySubject',
  props: {
    subjectInfo: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  components: {
    Scroll
  },
  methods: {
    checkIndex: function (index) {
      this.currentIndex = index
      this.$emit('selectSubject', this.currentIndex)
    }
  }
}
</script>

<style scoped>
  .content{
    height: calc(100vh - 44px - 49px);
    overflow: hidden;
  }
  .subject{
    height: calc(100vh - 44px - 49px);
  }
  .subject ul{
    height: 100%;
    width: 80px;
    list-style: none;
  }
  .subject ul li{
    height: 50px;
    display: flex;
    background-color: rgb(233, 227, 227);
    /* border-bottom: 1px solid #645b5b; */
  }
  .subject ul .active{
    flex: 1;
    display: flex;
    background-color: rgb(255, 255, 255);
    /* border-bottom: 1px solid #645b5b; */
    border-left: 3px solid rgb(236, 75, 151);
    box-sizing: border-box;
  }
  .subject ul li div{
    font-size: 18px;
    text-align: center;
    flex: 1;
    margin: auto auto;
    box-sizing: border-box;
    /* border: 1px solid #645b5b; */
  }
</style>
