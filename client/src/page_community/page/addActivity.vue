<!-- 社区基层信息 -->
<template>
  <view class="container">
    <!-- <uni-card :is-shadow="false" is-full>
			<text class="uni-h6">uni-forms 组件</text>
		</uni-card> -->
    <uni-section title="新增活动" type="line">
      <view class="example">
        <!-- 基础用法，不包含校验规则 -->
        <uni-forms ref="baseForm" :model="activityInfo" :rules="rules" labelWidth="80px">
          <!-- <uni-forms-item label="所属高校" required>
						<uni-easyinput v-model="activityInfo.name" placeholder="中山大学" ref="inputElement" />
					</uni-forms-item> -->
          <uni-forms-item label="活动名称" name="name">
            <uni-easyinput
              v-model="activityInfo.name"
              placeholder="请输入活动名称"
            />
          </uni-forms-item>
          <uni-forms-item label="开始时间" name="startTime">
            <uni-easyinput
              v-model="activityInfo.startTime"
              placeholder="请输入活动开始时间"
            />
			<view class="index">
            <view class="form-item" @click="showPDate">
              <view
                bindtap="goCnCollege"
                class="form-field"
                hoverClass="form-field-hover"
              >
                <view class="form-field-input">
                  <view style="color: #808080">选择时间</view>
                  <view></view>
                </view>
              </view>
            </view>
            <datePicker ref="datePicker" @confirm="getStartDateTime"></datePicker>
          </view>
          </uni-forms-item>
          <uni-forms-item label="结束时间" name="endTime">
            <uni-easyinput
              v-model="activityInfo.endTime"
              placeholder="请输入活动结束时间"
            />
			<view class="index">
            <view class="form-item" @click="showPDate1">
              <view
                bindtap="goCnCollege"
                class="form-field"
                hoverClass="form-field-hover"
              >
                <view class="form-field-input">
                  <view style="color: #808080">选择时间</view>
                  <view></view>
                </view>
              </view>
            </view>
            <datePicker ref="datePicker1" @confirm="getEndDateTime"></datePicker>
          </view>
          </uni-forms-item>
          <uni-forms-item label="活动省份" name="province">
            <uni-easyinput
              v-model="activityInfo.province"
              placeholder="请输入活动省份"
            />
          </uni-forms-item>
          <uni-forms-item label="活动城市" name="city">
            <uni-easyinput
              v-model="activityInfo.city"
              placeholder="请输入活动城市"
            />
          </uni-forms-item>
          <uni-forms-item label="活动地址" name="address">
            <uni-easyinput
              v-model="activityInfo.address"
              placeholder="请输入活动地址"
            />
          </uni-forms-item>
          <uni-forms-item label="活动类型" name="activityType">
            <uni-data-picker
              v-model="activityInfo.activityType"
              :localdata="typeData"
              popup-title="请选择活动类型"
            ></uni-data-picker>
          </uni-forms-item>
          <uni-forms-item label="活动关键词" name="keywords">
            <uni-easyinput
              v-model="activityInfo.keywords"
              placeholder="请输入活动关键词(用逗号隔开)"
            />
          </uni-forms-item>
          <uni-forms-item label="活动简介" name="remark">
            <uni-easyinput
              type="textarea"
              v-model="activityInfo.remark"
              placeholder="请输入简介"
            />
          </uni-forms-item>
        </uni-forms>
      </view>
      <view class="button-group">
        <button type="primary" size="mini" @click="submit()">
          提交
        </button>
      </view>
    </uni-section>
  </view>
</template>

<script>
import datePicker from "@/components/datePicker/datePicker.vue";

export default {
  components: {
    datePicker,
  },
  data() {
    return {
      // 基础表单数据
      activityInfo: {
        name: "",
        startTime: "",
        endTime: "",
        province: "",
        city: "",
        address: "",
        activityType: "",
        keywords: "",
        remark: "",
      },
      typeData: [
        {
          text: "社区经济发展",
          value: "1",
        },
        {
          text: "社区团建工作",
          value: "2",
        },
        {
          text: "社区社会调查",
          value: "3",
        },
        {
          text: "社区文体活动",
          value: "4",
        },
        {
          text: "社区教育服务",
          value: "5",
        },
        {
          text: "社区环境治理",
          value: "6",
        },
        {
          text: "其他",
          value: "7",
        },
      ],
	  rules: {
        name: {
          rules: [
            {
              required: true,
              errorMessage: "请输入姓名",
            },
          ],
        },
        startTime: {
          rules: [
            {
              required: true,
              errorMessage: "请输入开始时间",
            },
          ],
        },
        endTime: {
          rules: [
            {
              required: true,
              errorMessage: "请输入结束时间",
            },
          ],
        },
		province: {
          rules: [
            {
              required: true,
              errorMessage: "请输入社区所在省",
            },
          ],
        },
        city: {
          rules: [
            {
              required: true,
              errorMessage: "请输入社区所在市",
            },
          ],
        },
        address: {
          rules: [
            {
              required: true,
              errorMessage: "请输入社区详细地址",
            },
          ],
        },
        setup_date: {
          rules: [
            {
              required: true,
              errorMessage: "请输入社区成立日期",
            },
          ],
        },
		activityType: {
          rules: [
            {
              required: true,
              errorMessage: "请输入活动类型",
            },
          ],
        },
		keywords: {
          rules: [
            {
              required: true,
              errorMessage: "请输入活动关键词",
            },
          ],
        },
        remark: {
          rules: [
            {
              required: true,
              errorMessage: "请输入活动介绍",
            },
          ],
        },
      },
    };
  },
  computed: {
    // 处理表单排列切换
    alignment() {
      if (this.current === 0) return "left";
      if (this.current === 1) return "top";
      return "left";
    },
  },
  // mounted() {
  // 	this.$refs.inputElement.placeholder = "中山大学";
  // 	this.$refs.inputElement.readOnly = true;
  // },
  onLoad() {},
  onReady() {
    // 设置自定义表单校验规则，必须在节点渲染完毕后执行
    // this.$refs.customForm.setRules(this.customRules)
  },
  methods: {
    showPDate(e) {
      this.$refs.datePicker.show();
    },
	showPDate1(e) {
      this.$refs.datePicker1.show();
    },
    getStartDateTime(e) {
      this.activityInfo.startTime = e;
    },
	getEndDateTime(e) {
		this.activityInfo.endTime = e;
    },
    submit() {
		this.$refs.baseForm
        .validate()
        .then((res) => {
          this.addActivity();
        })
        .catch((err) => {
        });
    },
	addActivity() {
		uni.request({
        url: this.$url.BASE_URL + "/community/activityinfo",
        // url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
        header: {
          Authorization: uni.getStorageSync("token"),
        },
        method: "POST",
        data: {
          community_id: "0",
          activityInfo: this.activityInfo,
        },
        success: (res) => {
          console.log("成功请求-新增活动");
          console.log(res.data.data);
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

<style lang="scss">
/*每个页面公共css */
@import "@/uni_modules/uni-scss/index.scss";
/* #ifndef APP-NVUE */
@import "@/common/customicons.css";
// 设置整个项目的背景色
page {
  background-color: #f5f5f5;
}
/* #endif */
.container {
  height: 100vh;
  overflow-y: auto;
}
.example-info {
  font-size: 14px;
  color: #333;
  padding: 10px;
}

.example {
  padding: 15px;
  background-color: #fff;
}

.segmented-control {
  margin-bottom: 15px;
}

.button-group {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
}

.form-item {
  display: flex;
  align-items: center;
  flex: 1;
}

.button {
  display: flex;
  align-items: center;
  height: 35px;
  line-height: 35px;
  margin-left: 10px;
}
.button-del {
  text-align: center;
}

.button-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button-group button {
  margin-bottom: 15px;
}
</style>
