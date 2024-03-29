<!-- 高校 - 收到评价 -->
<template>
  <view>
    <view class="top_fix">
      <!-- 第一个：搜索按钮在右边 -->
      <view class="cu-bar search bg-white">
        <view class="search-form round">
          <text class="cuIcon-search"></text>
          <input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索活动"
            confirm-type="search">
        </view>
        <view class="action">
          <button class="cu-btn bg-green shadow-blur round">搜索</button>
        </view>
      </view>
      <scroll-view scroll-x class="bg-white nav">
      <view class="flex text-center">
        <view class="cu-item flex-sub" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in list" :key="index" @tap="tabSelect" :data-id="index">
          {{item.name}}
        </view>
      </view>
    </scroll-view>
    </view>
    <view class="accontent">
      <All v-if="TabCur === 0"></All>
      <WillDo v-if="TabCur === 1"></WillDo>
      <Doing v-if="TabCur === 2"></Doing>
      <Done v-if="TabCur === 3"></Done>
  
    </view>
  </view>
  
  </template>
   
  <script>
    import indexTabbar from '../../../components/top-tabbar/top-tabbar.vue';

    import All from './all.vue';
    import WillDo from './willDo.vue';
    import Doing from './doing.vue';
    import Done from './done.vue';
    // import utabsswiper from '../../uview-ui/components/u-tabs-swiper/u-tabs-swiper.vue';
  
    export default {
      components:{
        
        indexTabbar,
        All,
        WillDo,
        Doing,
        Done,
        // utabsswiper
      },
      data() {
        return {
          TabCur: 0,
          scrollLeft: 0,
  
          // 全屏组件
          list: [{
            name: '全部'
          }, {
            name: '待开展'
          }, {
            name: '开展中'
          }, {
            name: '已结束'
          }],
  
          title: 'Hello',
          tabIndex: "All",
          tabBars:[
            {
              name: "全部",
              id: "All"
            },
            {
              name:"待开展",
              id:"WillDo"
            },
            {
              name: "开展中",
              id: "KaiZhanZhong"
            },
            {
              name: "已结束",
              id: "YiJieShu"
            }
          ],
          currentTabComponent: "All"
        }
      },
      methods:{
        TarData(item){
          //设置id，来显示选中那个标签，显示下划线
          this.tabIndex = item.id;
          //显示标签对应的组件内容
          this.currentTabComponent = item.id
        },
        tabSelect(e) {
          this.TabCur = e.currentTarget.dataset.id;
          this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
                  // 切换组件时页面滚动到顶部
                  wx.pageScrollTo({
              scrollTop: 0,
              duration: 0
            });
        }
      }
    }
  </script>
   
  <style>
  .top_fix{
    background-color: white;
    position: fixed;
    top: 0; /* 或者设置为底部时使用 bottom: 0; */
    left: 0;
    width: 100%;
    z-index: 999; /* 可选：如果需要在其他元素之上显示导航栏，可以设置一个较高的 z-index 值 */
  }
  .accontent{
    margin-top: 77px;	
  }
  </style>