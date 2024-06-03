<!--社区 - 活动详情 -->
<template>
  <view class="container">
    <!-- 第一块 -->
    <view>
      <view class="part first">
        <view class="de_total_title">
          <input type="text" v-model="detail.name" class="editable-field"/>
        </view>
        <view class="de_key_value">
          <view class="de_content">
            <view class="key"> 社区基层名称 </view>
            <view class="value">
              {{ detail.community_name }}
            </view>
          </view>
          <view class="de_content">
            <view class="key"> 活动编号 </view>
            <view class="value">
              {{ detail.id }}
            </view>
          </view>
          <view class="de_content">
            <view class="key"> 活动类别 </view>
            <view class="value">
              {{ detail.category_name }}
            </view>
          </view>
        </view>
        <view class="wordcont">
          <view
            class="ackeywords"
            v-for="(word, index) in detail.keywords.split(',')"
            :key="index"
          >
            <view class="cu-tag bg-red light sm round">{{ word }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="custom-container">
      <hr class="horizontal-line" />
    </view>
    <!-- 第二块 -->
    <view>
      <view class="part second">
        <view class="de_total_title sub_title"> 活动信息 </view>
        <view class="de_key_value">
          <view class="de_content">
            <view class="key"> 活动地点 </view>
            <view class="value"> {{ detail.province }} {{ detail.city }} </view>
          </view>
          <view class="de_content">
            <view class="key"> 详细地址 </view>
            <view class="value">
              {{ detail.address }}
            </view>
          </view>
          <view class="de_content">
            <view class="key"> 活动时间 </view>
            <view class="value">
              <text>{{ detail.start_time }} 开始</text><br />
              <text>{{ detail.end_time }} 结束</text>
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
          <view class="de_total_title sub_title"> 志愿者招募详情 </view>
          <view class="de_key_value">
            <view class="de_content">
              <view class="key"> 报名截止时间 </view>
              <view class="value">
                <text>{{ detail.application_deadline }}</text>
              </view>
            </view>
            <view class="de_content">
              <view class="key"> 招募队伍数 </view>
              <view class="value">
                <input type="text" v-model="detail.vacancies" class="editable-field"/>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="custom-container">
        <hr class="horizontal-line" />
      </view>

      <view class="custom-container">
        <hr class="horizontal-line" />
      </view>
    </view>

    <view>
      <view class="part">
        <view class="de_total_title sub_title"> 活动介绍 </view>
        <view class="de_key_value">
          <view class="de_content">
            <view class="last-key"> 活动内容 </view>
            <view class="value">
              <textarea v-model="detail.remark" class="editable-field"></textarea>
            </view>
          </view>
        </view>
      </view>
      <view class="button-group">
        <view class="button-item">
          <button type="primary" size="mini" @click="submit">修改</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
import bttab from "../../components/detail-btm/uni-goods-nav.vue";

export default {
  components: {
    bttab,
  },
  data() {
    return {
      activityId: "",
      mode: "",
      detail: {
        keywords: "",
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
    const mode = query.mode;
    this.mode = mode;
    uni.request({
      url: this.$url.BASE_URL + "community/activityInfo",
      // url: this.$url.BASE_URL + "/4142061-0-default/community/activityInfo",
      // url: 'https://mock.apifox.coml/m1/community/activityInfo',
      header: {
        Authorization: uni.getStorageSync("token"),
      },
      method: "GET",
      data: {
        id: activityId,
        // token: this.$userinfo.token
      },
      success: (res) => {
        this.detail = res.data.data;
        // this.detail.keywords = "服务,实践"
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
    // 	url: this.$url.BASE_URL + '/schoolteam/getactidetail',
    //

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
      uni.request({
        url: "http://4ddfdbb6.r21.cpolar.top/community/activityInfo",
        // url: this.$url.BASE_URL + '/community/activityInfo',
        // url: 'https://mock.apifox.coml/m1/community/activityInfo',
        header: {
          Authorization: uni.getStorageSync("token"),
        },
        method: "PUT",
        data: {
          id: this.activityId,
          name: this.detail.name,
          category_id: this.detail.category_id,
          province: this.detail.province,
          city: this.detail.city,
          address: this.detail.address,
          start_time: this.detail.start_time,
          end_time: this.detail.end_time,
          application_deadline: this.detail.application_deadline,
          vacancies: this.detail.vacancies,
          remark: this.detail.remark,
          keywords: this.detail.keywords,
        },
        success: (res) => {
          // this.detail.keywords = "服务,实践"
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
.editable-field {
  border: 1px solid #007bff;
  padding: 5px;
  border-radius: 4px;
  background-color: #e7f3ff;
  width: 100%; 
  height: 100%; 
  font-size: 16px; 
  box-sizing: border-box;
  overflow: hidden;
}
.button-group {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
}
</style>
