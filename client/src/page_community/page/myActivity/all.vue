<!-- 高校 全部 -->
<template>
  <view class="content">
    <!-- <image class="logo" src="/static/logo.png"></image>
		<image class="logo" src="/static/logo.png"></image>
		<image class="logo" src="/static/logo.png"></image>
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view> -->
    <view class="cu-item" v-for="(item, index) in acList" :key="index">
      <view
        class="cu-card article"
        :class="isCard ? 'no-card' : ''"
        @click="todetail(item.id, item.state)"
      >
        <view class="cu-item shadow">
          <view class="cu-bar bg-white">
            <view class="action">
              <text class="cuIcon-titles text-green"></text>
              <text class="text-xl text-bold">{{
                getStatusText(item.activity_status)
              }}</text>
            </view>
          </view>
          <view class="title"
            ><view class="text-cut">{{ item.name }}</view></view
          >
          <view class="content">
            <view class="desc">
              <view class="text-content"> 开始时间: {{ item.start_time }}</view>
              <view class="text-content"> 结束时间: {{ item.end_time }}</view>
              <view class="text-content"> 活动地点: {{ item.address }}</view>
              <view class="wordcont">
                <view
                  class="ackeywords"
                  v-for="(word, index) in item.keywords.split(',')"
                  :key="index"
                >
                  <view class="cu-tag bg-red light sm round">{{ word }}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="acList.length === 0" class="no-activities">
      没有符合要求的活动
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      acList: [],
	    searchText:''
    };
  },
  computed: {
    ...mapState([
      "user_id"
    ]),
  },
  onLoad(e) {
    this.searchText = e.searchText;
  },
  mounted() {
    if (this.searchText !== '') {
		uni.request({
        url: this.$url.BASE_URL + "/community/queryActivity",
        header: {
          Authorization: uni.getStorageSync("token"),
        },
        method: "GET",
        data: {
          community_id: this.user_id,
          name: this.searchText
        },
        success: (res) => {
          this.acList = res.data.data;
          console.log("成功请求-查询活动",this.searchText);
          this.net_error = false;
        },
        fail: (res) => {
          this.net_error = true;
        },
        complete: () => {},
      });
    } else {
      uni.request({
        url: this.$url.BASE_URL + "/community/activities",
        header: {
          Authorization: uni.getStorageSync("token"),
        },
        method: "GET",
        data: {
          community_id: this.user_id,
          status: 0,
        },
        success: (res) => {
          this.acList = res.data.data;
          console.log("成功请求-查询活动信息(全部)");
          this.net_error = false;
        },
        fail: (res) => {
          this.net_error = true;
        },
        complete: () => {},
      });
    }
  },
  methods: {
    getStatusText(status) {
      switch (status) {
        case 1:
          return "待开展";
        case 2:
          return "开展中";
        case 3:
          return "已结束";
        default:
          return "未知状态";
      }
    },
    todetail(activityId, modeString) {
      const mode = modeString == "待开展" ? "recruiting" : "recruited";
      this.$u.route({
        url: "page_community/page/activityDetail",
        params: {
          activityId: activityId,
          mode: mode,
        },
      });
    },
  },
};
</script>
<style scoped>
.no-activitis {
  text-align: center;
  line-height: 100rpx;
}

.text-cut {
  margin-top: -15rpx;
  line-height: 60rpx;
}
.cu-bar .action:first-child {
  margin-left: 24rpx;
}

.cu-item .shadow {
  margin: 0;
  margin-top: 10rpx;
}
.text-content {
  height: auto;
}
.wordcont {
  margin-top: 10rpx;
}
.wordcont .ackeywords {
  display: inline-block;
  margin-right: 10rpx; /* 可以调整标签之间的水平间距 */
}
</style>
