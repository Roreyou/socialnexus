<!-- 高校 - 收到评价 -->
<template>
  <view>
    <view class="top_fix">
      <!-- 第一个：搜索按钮在右边 -->
      <view class="cu-bar search bg-white">
        <view class="search-form round">
          <text class="cuIcon-search"></text>
          <input
            @focus="InputFocus"
            @blur="InputBlur"
            :adjust-position="false"
            type="text"
            placeholder="搜索队伍"
            confirm-type="search"
            v-model="searchText"
          />
        </view>
        <view class="action">
          <button class="cu-btn bg-green shadow-blur round" @click="search">搜索</button>
        </view>
      </view>
      <scroll-view scroll-x class="bg-white nav">
        <view class="flex text-center">
          <view
            class="cu-item flex-sub"
            :class="index == TabCur ? 'text-green cur' : ''"
            v-for="(item, index) in list"
            :key="index"
            @tap="tabSelect"
            :data-id="index"
          >
            {{ item.name }}
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="accontent">
      <All v-if="TabCur === 0"></All>
      <ToAdmit v-if="TabCur === 1"></ToAdmit>
      <ToEvaluate v-if="TabCur === 2"></ToEvaluate>
      <Evaluated v-if="TabCur === 3"></Evaluated>
    </view>
  </view>
</template>

<script>
import indexTabbar from "../../../components/top-tabbar/top-tabbar.vue";

import All from "./all.vue";
import ToAdmit from "./toAdmit.vue";
import ToEvaluate from "./toEvaluate.vue";
import Evaluated from "./evaluated.vue";
// import utabsswiper from '../../uview-ui/components/u-tabs-swiper/u-tabs-swiper.vue';

export default {
  components: {
    indexTabbar,
    All,
    ToAdmit,
    ToEvaluate,
    Evaluated,
    // utabsswiper
  },
  data() {
    return {
      TabCur: 0,
      scrollLeft: 0,
      searchText:'',
      // 全屏组件
      list: [
        {
          name: "全部",
        },
        {
          name: "待录取",
        },
        {
          name: "待评价",
        },
        {
          name: "已评价",
        },
      ],

      title: "Hello",
      tabIndex: "All",
      tabBars: [
        {
          name: "全部",
          id: "All",
        },
        {
          name: "待录取",
          id: "ToAdmit",
        },
        {
          name: "待录取",
          id: "ToEvaluate",
        },
        {
          name: "已评价",
          id: "Evaluated",
        },
      ],
      currentTabComponent: "All",
    };
  },
  methods: {
    InputBlur() {
      console.log("Input blurred");
    },
    InputFocus() {
      console.log("Input focused");
    },
    search() {
      uni.navigateTo({
        url:
          "/page_community/page/myTeam/all?searchText=" + this.searchText,
      });
    },
    TarData(item) {
      //设置id，来显示选中那个标签，显示下划线
      this.tabIndex = item.id;
      //显示标签对应的组件内容
      this.currentTabComponent = item.id;
    },
    tabSelect(e) {
      this.TabCur = e.currentTarget.dataset.id;
      this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
      // 切换组件时页面滚动到顶部
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0,
      });
    },
  },
};
</script>

<style>
.top_fix {
  background-color: white;
  position: fixed;
  top: 0; /* 或者设置为底部时使用 bottom: 0; */
  left: 0;
  width: 100%;
  z-index: 999; /* 可选：如果需要在其他元素之上显示导航栏，可以设置一个较高的 z-index 值 */
}
.accontent {
  margin-top: 77px;
}
</style>
