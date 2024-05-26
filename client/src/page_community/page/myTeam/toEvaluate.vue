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
    <view class="cu-item" v-for="(item, index) in teamList" :key="index">
      <view
        class="cu-card article"
        :class="isCard ? 'no-card' : ''"
        @click="toEvaluate(item.activity_id, item.team_id)"
      >
        <view class="cu-item shadow">
          <view class="cu-bar bg-white">
            <view class="action">
              <text class="cuIcon-titles text-green"></text>
              <text class="text-xl text-bold">待评价</text>
            </view>
          </view>
          <view class="title"
            ><view class="text-cut">{{ item.team_name }}</view></view
          >
          <view class="content">
            <view class="desc">
              <view class="text-content"> 活动: {{ item.activity_name }}</view>
              <view class="text-content">
                学校名称: {{ item.school_name }}</view
              >
              <view class="wordcont"> </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="teamList.length === 0" class="no-activities">
      没有符合要求的队伍
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      teamList: [],
    };
  },
  onLoad() {},
  mounted() {
    uni.request({
      url:'http://4ddfdbb6.r21.cpolar.top/community/teams',
      // url: "https://mock.apifox.com/m1/4142061-3780993-default/community/myInfo",
      header: {
        Authorization: uni.getStorageSync("token"),
      },
      method: "GET",
      data: {
        community_id: 1,
        status: 4,
      },
      success: (res) => {
        this.teamList = res.data.data;
        console.log("成功请求-查询队伍信息(待评价)");
        this.net_error = false;
      },
      fail: (res) => {
        this.net_error = true;
      },
      complete: () => {},
    });
  },
  methods: {
    toEvaluate(activityId, teamId) {
      this.$u.route({
        url: "page_community/page/myTeam/evaluate",
        params: {
          activityId: activityId,
          teamId: teamId,
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
