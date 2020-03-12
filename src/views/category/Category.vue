<template>
  <div class="category">
    <div class="wrapper">
      <ul class="content">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
        <li>21</li>
        <li>22</li>
        <li>23</li>
        <li>24</li>
        <li>25</li>
        <li>26</li>
        <li>27</li>
        <li>28</li>
        <li>29</li>
        <li>30</li>
        <li>31</li>
        <li>32</li>
        <li>33</li>
        <li>34</li>
        <li>35</li>
        <li>36</li>
        <li>37</li>
        <li>38</li>
        <li>39</li>
        <li>40</li>
        <li>41</li>
        <li>42</li>
        <li>43</li>
        <li>44</li>
        <li>45</li>
        <li>46</li>
        <li>47</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

/* eslint-disable no-new */
export default {
  name: 'Category',
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    // console.log(document.querySelector('.wrapper'))
    // console.log(this.$refs.aaa)
    this.scroll = new BScroll('.wrapper', {
      // 值为1 的时候不触发监听
      // 值为2的时候在滚动时期触发实时监听,即滑动松手后继续滑动的动画期间不监听
      // 值为3的时候在滚动时期以及在动量和弹跳动画期间也实时触发
      // 监听scroll事件
      probeType: 1,
      // 默认是禁止点击事件监听触发
      click: true,
      // 上拉到底事件触发，见天给pullingUp事件
      pullUpLoad: true
    })
    // 监听位置
    this.scroll.on('scroll', (position) => {
      // console.log(position)
    })

    this.scroll.on('pullingUp', () => {
      console.log('daodi')
      setTimeout(() => {
        // 用于结束一次的pullup好再一次触发？但是目前好像....
        this.scroll.finishPullUp()
      }, 2000)
    })
  }
}
</script>

<style scoped>
.wrapper{
  height: 250px;
  background: aqua;
  /* width: 100%; */

  overflow: hidden;
  /* overflow-y: scroll; */
}
</style>
