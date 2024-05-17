<!--社区 - 评价队伍 -->
<template>
  <view class="container">
    <!-- 第一块 -->
    <view>
      <view class="part first">
        <view class="de_total_title">
          {{ detail.activity.name }}
        </view>
        <view class="de_key_value">
          <view class="de_content">
            <view class="key"> 活动编号 </view>
            <view class="value">
              {{ activityId }}
            </view>
          </view>
          <view class="de_content">
            <view class="key"> 活动类别 </view>
            <view class="value">
              {{ detail.activity.category_name }}
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="custom-container">
      <hr class="horizontal-line" />
    </view>

    <view>
      <view>
        <view class="part second">
          <view class="de_total_title sub_title"> 高校队伍 </view>
          <view class="de_key_value">
            <view class="de_content">
              <view class="key"> 队伍名称 </view>
              <view class="value">
                <text>{{ detail.team.team_name }}</text
                ><br />
              </view>
            </view>
            <view class="de_content">
              <view class="key"> 所属学校 </view>
              <view class="value">
                <text>{{ detail.team.school_name }}</text
                ><br />
              </view>
            </view>
            <view class="de_content">
              <view class="key"> 队伍简介 </view>
              <view class="value">
                <text>{{ detail.team.remark }}</text
                ><br />
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="custom-container">
        <hr class="horizontal-line" />
      </view>
    </view>

    <view class="comment">
      <uni-forms ref="commentForm" :model="commentForm" :rules="rules">
        <uni-forms-item label="评价" name="comment">
          <uni-easyinput
            type="textarea"
            v-model="commentForm.comment"
            placeholder="请输入评价"
          />
        </uni-forms-item>
      </uni-forms>
      <view class="custom-container">
        <hr class="horizontal-line" />
      </view>
    </view>

    <view class="button-group">
      <view class="button-item">
        <button type="primary" size="mini" @click="submit">提交</button>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
import bttab from "../../../components/detail-btm/uni-goods-nav.vue";

export default {
  components: {
    bttab,
  },
  data() {
    return {
      activityId: "",
      teamId: "",
      detail: {
        activity: {},
        team: {},
      },
      commentForm: {
        comment: "",
      },
      rules: {
        comment: {
          rules: [
            {
              required: true,
              errorMessage: "请输入评价",
            },
          ],
        },
      },
    };
  },
  computed: {
    ...mapState(["hasLogin", "forcedLogin", "user_id"]),
  },
  mounted() {
    // 获取query对象
    const query = this.$mp.query;
    // const query = this.$route.query;
    const activityId = query.activityId;
    this.activityId = activityId;
    const teamId = query.teamId;
    this.teamId = teamId;
    uni.request({
      url: this.$url.BASE_URL + "/4142061-0-default/community/activityInfo",
      // url: 'https://mock.apifox.coml/m1/4142061-3780993-default/community/admit',
      header: {
        Authorization: uni.getStorageSync("token"),
      },
      method: "GET",
      data: {
        id: activityId,
        // token: this.$userinfo.token
      },
      success: (res) => {
        this.detail.activity = res.data.data;
        this.net_error = false;
      },
      fail: (res) => {
        this.net_error = true;
      },
      complete: () => {},
    });
    uni.request({
      url: this.$url.BASE_URL + "/4142061-0-default/community/teamInfo",
      // url: 'https://mock.apifox.coml/m1/4142061-3780993-default/community/admit',
      header: {
        Authorization: uni.getStorageSync("token"),
      },
      method: "GET",
      data: {
        id: teamId,
        // token: this.$userinfo.token
      },
      success: (res) => {
        this.detail.team = res.data.data;
        this.net_error = false;
      },
      fail: (res) => {
        this.net_error = true;
      },
      complete: () => {},
    });
  },
  onload(option) {
    console.log("onload");
    const id = option.id;
    // uni.request({
    // 	url: this.$url.BASE_URL + '/4142061-0-default/schoolteam/getactidetail',
    // 	// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',

    // 	method: 'GET',
    // 	data: {
    // 		acti_id: id,
    // 		// token: this.$userinfo.token
    // 	},
    // 	success: res => {
    // 		this.detail = res.data.data.detail;
    // 		this.detail.keywords = "服务,实践"
    // 		this.net_error = false;
    // 	},
    // 	fail: res => {
    // 		this.net_error = true;
    // 	},
    // 	complete: () => {
    // 	}
    // })
  },
  methods: {
    submit() {
      this.$refs.commentForm
        .validate()
        .then((res) => {
          this.evaluate();
        })
        .catch((err) => {});
    },
    evaluate() {
      uni.request({
        url: this.$url.BASE_URL + "/4142061-0-default/community/commentTeam",
        // url: 'https://mock.apifox.coml/m1/4142061-3780993-default/community/admit',
        header: {
          Authorization: uni.getStorageSync("token"),
        },
        method: "POST",
        data: {
          team_id: this.teamId,
          activity_id: this.activityId,
          comment: this.commentForm.comment,
          // token: this.$userinfo.token
        },
        success: (res) => {
          console.log("成功评价", res.data.data.status);
          this.net_error = false;
        },
        fail: (res) => {
          this.net_error = true;
        },
        complete: () => {},
      });
    },
  },
};
</script>

<style>
page {
  background: #f8f8f8;
  padding-bottom: 160rpx;
}

.container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.part {
  padding-left: 25rpx;
}

.de_total_title {
  font-size: 42rpx;
  font-weight: 900;
  color: #333333;
  margin-top: 30rpx;
  margin-bottom: 20rpx;
}

.sub_title {
  font-size: 36rpx;
  font-weight: 600;
}

.de_key_value {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20rpx;
  color: gray;
  line-height: 20rpx;
}
.de_content {
  display: flex;
  line-height: 60rpx;
  font-size: larger;
  /* justify-content: space-between;  */
}
.keywords {
  display: inline-block;
  margin-right: 10px; /* 可根据需求调整按钮之间的间距 */
  margin-bottom: 10px;
  padding: 0 8px; /* 调整内边距来控制块的大小 */
}

/* 灰线 */
.custom-container {
  text-align: center; /* 可根据需要调整水平对齐方式 */
  margin: 0 25rpx;
}

.horizontal-line {
  border: none; /* 移除默认的边框样式 */
  border-top: 1px solid #ccc; /* 设置上边框为 1px 灰色实线 */
  width: 100%; /* 设置水平线的宽度为容器的宽度 */
}

.key {
  display: inline-block;
  width: 600rpx;
}
.value {
  display: inline-block;
  /* margin-left: 30rpx; */
  color: black;
  /* flex-grow: 1; */
  padding-right: 25rpx;
  width: 1200rpx;
}

/* 活动简介的样式，比较特殊 */
.last-key {
  display: inline-block;
  width: 600rpx;
}

/* tag */
.wordcont {
  margin-top: 10rpx;
}
.wordcont .ackeywords {
  display: inline-block;
  margin-right: 10rpx; /* 可以调整标签之间的水平间距 */
}
.button-group {
  display: flex;
  margin-top: 50px;
  justify-content: center;
}

.button-item {
  margin-right: 10px; /* 设置按钮之间的右侧间隔 */
}

.comment {
  margin-top: 20px;
}
</style>
