<!-- 高校 全部 -->
<template>
  <view class="content">
    <view class="cu-item" v-for="(item, index) in teamList" :key="index">
      <view
        class="cu-card article"
        :class="isCard ? 'no-card' : ''"
        @click="
          toNext(
            item.activity_id,
            item.team_id,
            getStatusText(item.admisson_status, item.comment_status)
          )
        "
      >
        <view class="cu-item shadow">
          <view class="cu-bar bg-white">
            <view class="action">
              <text class="cuIcon-titles text-green"></text>
              <text class="text-xl text-bold">{{
                getStatusText(item.admisson_status, item.comment_status)
              }}</text>
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
      teamListName: [],
      teamListAct: [],
      searchText: "",
    };
  },
  onLoad(e) {
    this.searchText = e.searchText;
  },
  mounted() {
    if (this.searchText !== "") {
      Promise.all([this.queryTeamByName(), this.queryTeamByAct()])
        .then(() => {
          if (this.teamListName.length !== 0) this.teamList = this.teamListName;
          else this.teamList = this.teamListAct;
        })
        .catch((error) => {
          console.error("Error occurred while fetching data:", error);
        });
    } else {
      uni.request({
        url:'http://4ddfdbb6.r21.cpolar.top/community/teams',
        // url: this.$url.BASE_URL + "/4142061-0-default/community/teams",
        // url: "https://mock.apifox.com/m1/4142061-3780993-default/community/myInfo",
        header: {
          Authorization: uni.getStorageSync("token"),
        },
        method: "GET",
        data: {
          community_id: 1,
          status: 0,
        },
        success: (res) => {
          this.teamList = res.data.data;
          console.log("成功请求-查询队伍信息(全部)");
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
    getStatusText(admisson_status, comment_status) {
      if (admisson_status == 1) return "待录取";
      if (comment_status == 1) return "待评价";
      if (comment_status == 2) return "已评价";
    },
    queryTeamByName() {
      return new Promise((resolve, reject) => {
        uni.request({
          url:
            "http://4ddfdbb6.r21.cpolar.top/community/queryTeamByName",
          header: {
            Authorization: uni.getStorageSync("token"),
          },
          method: "GET",
          data: {
            community_id: 1,
            team_name: this.searchText,
          },
          success: (res) => {
            this.teamListName = res.data.data;
            console.log("成功请求-查询队伍", this.searchText);
            this.net_error = false;
            resolve(); // 请求成功，resolve Promise
          },
          fail: (res) => {
            this.net_error = true;
            reject(res); // 请求失败，reject Promise
          },
          complete: () => {},
        });
      });
    },
    queryTeamByAct() {
      return new Promise((resolve, reject) => {
        uni.request({
          url:
            "http://4ddfdbb6.r21.cpolar.top/community/queryTeamByAct",
          header: {
            Authorization: uni.getStorageSync("token"),
          },
          method: "GET",
          data: {
            community_id: 1,
            act_name: this.searchText,
          },
          success: (res) => {
            this.teamListAct = res.data.data;
            console.log("成功请求-查询队伍", this.searchText);
            this.net_error = false;
            resolve(); // 请求成功，resolve Promise
          },
          fail: (res) => {
            this.net_error = true;
            reject(res); // 请求失败，reject Promise
          },
          complete: () => {},
        });
      });
    },

    toNext(activityId, teamId, state) {
      if (state !== "已评价") {
        const urlStr =
          state === "待录取"
            ? "page_community/page/myTeam/admit"
            : "page_community/page/myTeam/evaluate";
        this.$u.route({
          url: urlStr,
          params: {
            activityId: activityId,
            teamId: teamId,
          },
        });
      }
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
