<!-- 高校 开展中 -->
<template>
  <view class="content">
    <view class="cu-item" v-for="(item, index) in acList" :key="index">
      <view
        class="cu-card article"
        :class="isCard ? 'no-card' : ''"
        @click="todetail(item.id, 'recruited')"
      >
        <view class="cu-item shadow">
          <view class="cu-bar bg-white">
            <view class="action">
              <text class="cuIcon-titles text-green"></text>
              <text class="text-xl text-bold">开展中</text>
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
export default {
  data() {
    return {
      acList: [],
    };
  },
  onLoad() {},
  mounted() {
    uni.request({
      url: " http://4ddfdbb6.r21.cpolar.top/community/activities",
      // url: "https://mock.apifox.com/m1/4142061-3780993-default/community/myInfo",
      header: {
        Authorization: uni.getStorageSync("token"),
      },
      method: "GET",
      data: {
        community_id: "0",
        status: 2,
      },
      success: (res) => {
        this.acList = res.data.data;
        console.log("成功请求-查询活动信息(开展中)");
        this.net_error = false;
      },
      fail: (res) => {
        this.net_error = true;
      },
      complete: () => {},
    });
  },
  methods: {
    todetail(activityId, mode) {
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
