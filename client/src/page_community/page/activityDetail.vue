<template>
  <view class="container">
    <view class="img">
      <image :src="detail.picture" mode="aspectFill" v-if="!isPictureChanged"></image>
      <view class="container" v-if="isModify">
        <u-upload
          :class="{ banner: detail.picture === '' || !isPictureChanged }"
          @on-success="handleSuccess"
          @on-remove="handleRemove"
          :custom-btn="true"
          :max-count="1"
          ref="uUpload"
          :action="action"
          :file-list="avatarList"
          :auto-upload="true"
          style="display: flex; align-items: center"
        >
          <view
            slot="addBtn"
            class="slot-btn"
            hover-class="slot-btn__hover"
            hover-stay-time="150"
          >
            <image
              :class="{ banner: detail.picture === '' || !isPictureChanged }"
              src="https://socialnexus.oss-cn-shenzhen.aliyuncs.com/app/images/upload.png"
            ></image>
          </view>
        </u-upload>
      </view>
    </view>
    <!-- 第一块 -->
    <view>
      <view class="part first">
        <view class="de_total_title">
          <view v-if="isModify">
            <input v-model="detail.name" class="editable" />
          </view>
          <view v-else>
            <span class="editable">{{ detail.name }}</span>
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
              {{ activityId }}
            </view>
          </view>
          <view class="de_content">
            <view class="key"> 活动类别 </view>
            <view class="value">
              {{ detail.category_name }}
            </view>
          </view>
        </view>
        <!-- <view class="wordcont">
					<view class="ackeywords" v-for="(word,index) in detail.keywords.split(',')" :key="index">
						<view class="cu-tag bg-red light sm round">{{word}}</view>
					</view>
				</view> -->
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
        </view>
      </view>
    </view>
    <view class="custom-container">
      <hr class="horizontal-line" />
    </view>
    <!-- 第三块 -->
    <view>
      <view class="part second">
        <view class="de_total_title sub_title"> 志愿者招募详情 </view>
        <view class="de_key_value">
          <view class="de_content">
            <view class="key"> 时间段 </view>
            <view class="value">
              <text>{{ detail.start_time }} 开始</text><br />
              <text>{{ detail.end_time }} 结束</text>
            </view>
          </view>
          <view class="de_content">
            <view class="key">招募队伍数</view>
            <view class="value">
              <view v-if="isModify">
                <input v-model="detail.vacancies" class="editable" />
              </view>
              <view v-else>
                <span class="editable">{{ detail.vacancies }}</span>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="custom-container">
      <hr class="horizontal-line" />
    </view>
    <!-- 第四块 -->
    <view>
      <view class="part">
        <view class="de_total_title sub_title"> 报名须知 </view>
        <view class="de_key_value">
          <view class="de_content">
            <view class="key"> 报名限制 </view>
            <view class="value"> 无限制 </view>
          </view>
          <view class="de_content">
            <view class="key"> 报名截止时间： </view>
            <view class="value">
              {{ detail.application_deadline }}
            </view>
          </view>

          <view class="index" style="margin-left: 240rpx" v-if="isModify">
            <view class="form-item" @click="showDDLDate">
              <view
                bindtap="goCnCollege"
                class="form-field"
                hoverClass="form-field-hover"
              >
                <view class="form-field-input">
                  <view style="color: #009688" size="30"
                    >选择时间
                    <u-icon
                      name="arrow-down-fill"
                      color="#009688"
                      size="30"
                      style="margin-left: 10rpx"
                    ></u-icon>
                  </view>
                  <view></view>
                </view>
              </view>
            </view>
            <datePicker ref="datePicker" @confirm="getDDLDateTime"></datePicker>
          </view>
        </view>
      </view>
    </view>
    <view class="custom-container">
      <hr class="horizontal-line" />
    </view>
    <view>
      <view class="part">
        <view class="de_total_title sub_title"> 活动介绍 </view>
        <view class="de_key_value">
          <view class="de_content">
            <view class="last-key">活动内容</view>
            <view class="value">
              <view v-if="isModify">
                <textarea v-model="detail.remark" class="editable"></textarea>
              </view>
              <view v-else>
                <span class="editable">{{ detail.remark }}</span>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view style="position: fixed; bottom: 0; width: 100%">
      <button @click="Modify">{{ buttonText }}</button>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
import datePicker from "@/components/datePicker/datePicker.vue";

export default {
  components: {
    datePicker,
  },
  data() {
    return {
      activityId: "",
      mode: "",
      detail: {
        keywords: "",
      },
      hasactiid: false,
      isfavor: false,
      isModify: false,
      pictureList: [],
      action: this.$url.BASE_URL + "/uploadImage",
      isPictureChanged: false
    };
  },
  computed: {
    ...mapState(["hasLogin", "forcedLogin", "user_id"]),
    buttonText() {
      return this.isModify ? "确认修改" : "修改信息";
    },
  },
  mounted() {
    // 获取query对象
    const query = this.$mp.query;
    // const query = this.$route.query;
    const activityId = query.activityId;
    this.activityId = activityId;
    const mode = query.mode;
    this.mode = mode;
    // 获取活动详情
    uni.request({
      url: this.$url.BASE_URL + "/community/activityInfo",
      header: {
        Authorization: uni.getStorageSync("token"),
      },
      method: "GET",
      data: {
        id: activityId,
      },
      success: (res) => {
        this.detail = res.data.data;
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
    showDDLDate(e) {
      this.$refs.datePicker.show();
    },
    getDDLDateTime(e) {
      this.detail.application_deadline = e;
    },
    Modify() {
      if (this.isModify) {
        if (
          this.detail.name === "" ||
          this.detail.vacancies === "" ||
          this.detail.remark === ""
        ) {
          uni.showToast({
            icon: "error",
            title: "信息不完整！",
          });
          return;
        }
        if (this.detail.picture == "") {
          uni.showToast({
            icon: "error",
            title: "请上传图片！",
          });
          return;
        }
        uni.request({
          url: this.$url.BASE_URL + "/community/activityInfo",
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
            picture: this.detail.picture
          },
          success: (res) => {
            this.net_error = false;
          },
          fail: (res) => {
            this.net_error = true;
          },
          complete: () => {},
        });
      }
      this.isModify = !this.isModify;
    },
    handleSuccess(data, index, lists, index2) {
      this.isPictureChanged = true;
      console.log("上传图片成功，链接为", data);
      console.log("index", index);
      console.log("lists", lists);
      console.log("index2", index2);
      console.log("picture", this.pictureList);
      if (index === 0) {
        this.detail.picture = data;
      }
    },
    //删除时自动调用
    handleRemove(index, lists, name) {
      console.log("删除图片", index, lists, name);
      console.log("删除图片", index, lists, name);
      this.detail.picture = ""; //要设置为空
      console.log("删除图片", index, lists, name);
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

.phone {
  color: red;
}

/* 大图 */
.img {
  margin-right: 20rpx;
  margin-left: 20rpx;
  border-radius: 30rpx;
}
.editable {
  display: inline-block;
  width: 100%;
  background-color: #e0f7fa; /* 背景颜色变化 */
  border: 1px solid #009688; /* 边框颜色变化 */
  box-sizing: border-box; /* 包含内边距和边框在宽度和高度内 */
}
input.editable,
textarea.editable {
  width: calc(100% - 12px); /* 减去 padding 和 border 的宽度 */
}
span.editable {
  background-color: transparent; /* 透明背景 */
  border: none; /* 无边框 */
  display: inline-block; /* 内联块 */
}
.banner {
  margin: 10rpx auto;
  width: 100rpx;
  height: 100rpx;
  align-items: center;
  max-width: 100%;
  max-height: 100%;
}
</style>
