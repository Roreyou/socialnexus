<!-- 社区基层信息 -->
<template>
  <view class="container">
    <!-- <uni-card :is-shadow="false" is-full>
			<text class="uni-h6">uni-forms 组件</text>
		</uni-card> -->
    <uni-section title="新增活动" type="line">
      <view class="example">
        <!-- 基础用法，不包含校验规则 -->
        <uni-forms
          ref="baseForm"
          :model="activityInfo"
          :rules="rules"
          labelWidth="80px"
        >
          <!-- <uni-forms-item label="所属高校" required>
						<uni-easyinput v-model="activityInfo.name" placeholder="中山大学" ref="inputElement" />
					</uni-forms-item> -->
          <uni-forms-item label="活动名称" name="name">
            <uni-easyinput
              v-model="activityInfo.name"
              placeholder="请输入活动名称"
            />
          </uni-forms-item>
          <uni-forms-item label="报名截止时间" name="application_deadline">
            <uni-easyinput
              v-model="activityInfo.application_deadline"
              placeholder="请选择报名截止时间"
              disabled='true'
            />
            <view class="index">
              <view class="form-item" @click="showDDLDate">
                <view
                  bindtap="goCnCollege"
                  class="form-field"
                  hoverClass="form-field-hover"
                >
                  <view class="form-field-input">
                    <view style="color: #808080">选择时间
                      <u-icon name="arrow-down-fill" color="#808080" size="25" style="margin-left: 10rpx;"></u-icon>
                    </view>
                    <view></view>
                  </view>
                </view>
              </view>
              <datePicker
                ref="datePicker2"
                @confirm="getDDLDateTime"
              ></datePicker>
            </view>
          </uni-forms-item>
          <uni-forms-item label="开始时间" name="startTime">
            <uni-easyinput
              v-model="activityInfo.startTime"
              placeholder="请选择活动开始时间"
              disabled='true'
            />
            <view class="index">
              <view class="form-item" @click="showPDate">
                <view
                  bindtap="goCnCollege"
                  class="form-field"
                  hoverClass="form-field-hover"
                >
                  <view class="form-field-input">
                    <view style="color: #808080">选择时间
                      <u-icon name="arrow-down-fill" color="#808080" size="25" style="margin-left: 10rpx;"></u-icon>
                    </view>
                    <view></view>
                  </view>
                </view>
              </view>
              <datePicker
                ref="datePicker"
                @confirm="getStartDateTime"
              ></datePicker>
            </view>
          </uni-forms-item>
          <uni-forms-item label="结束时间" name="endTime">
            <uni-easyinput
              v-model="activityInfo.endTime"
              placeholder="请选择活动结束时间"
              disabled='true'
            />
            <view class="index">
              <view class="form-item" @click="showPDate1">
                <view
                  bindtap="goCnCollege"
                  class="form-field"
                  hoverClass="form-field-hover"
                >
                  <view class="form-field-input">
                    <view style="color: #808080">选择时间
                      <u-icon name="arrow-down-fill" color="#808080" size="25" style="margin-left: 10rpx;"></u-icon>
                    </view>
                    <view></view>
                  </view>
                </view>
              </view>
              <datePicker
                ref="datePicker1"
                @confirm="getEndDateTime"
              ></datePicker>
            </view>
          </uni-forms-item>
          <uni-forms-item label="招募队伍数" name="vacancies">
            <uni-easyinput
              v-model="activityInfo.vacancies"
              placeholder="请输入招募队伍数"
            />
          </uni-forms-item>
          <uni-forms-item label="活动省份" name="province">
            <uni-easyinput
              v-model="activityInfo.province"
              placeholder="请选择活动省份"
              disabled='true'
            />

            <view class="index" style="margin-top: 30rpx">
            <view class="form-item" @click="showPCA01">
              <view
                bindtap="goCnCollege"
                class="form-field"
                hoverClass="form-field-hover"
              >
                <view class="form-field-input">
                  <view style="color: #808080">选择所在地
                    <u-icon name="arrow-down-fill" color="#808080" size="25" style="margin-left: 10rpx;"></u-icon>
                  </view>
                  <view></view>
                </view>
              </view>
            </view>
            <pcaPicker ref="pcaPicker" @confirm="getPCA01"></pcaPicker>
          </view>
          </uni-forms-item>
          <uni-forms-item label="活动城市" name="city">
            <uni-easyinput
              v-model="activityInfo.city"
              placeholder="请选择活动城市"
              disabled='true'
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
    <uni-section>
        <view class="uni-px-5 uni-pb-5">
            <uni-data-checkbox 
                multiple 
                v-model="selectedValues" 
                :localdata="keywordList"
                @change="handleCheckboxChange">
            </uni-data-checkbox>
        </view>
    </uni-section>
</uni-forms-item>
          <uni-forms-item label="活动简介" name="remark">
            <uni-easyinput
              type="textarea"
              v-model="activityInfo.remark"
              placeholder="请输入简介"
            />
          </uni-forms-item>
        </uni-forms>

        <uni-forms-item label="图片" name="picture">
          <view>
          <u-upload :class="{ 'banner': activityInfo.picture === '' }" @on-success="handleSuccess" @on-remove="handleRemove" :custom-btn="true" :max-count="1" ref="uUpload" 
						:action="action" :file-list="pictureList" :auto-upload="true" style="display: flex; align-items: center; ">
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<image :class="{ 'banner': activityInfo.picture === '' } " src="https://socialnexus.oss-cn-shenzhen.aliyuncs.com/app/images/upload.png"></image>
				</view>
			</u-upload>
        </view>
        </uni-forms-item>
  
      </view>
      <view class="button-group">
        <button type="primary" size="mini" @click="submit()">提交</button>
      </view>
    </uni-section>
  </view>
</template>

<script>
import datePicker from "@/components/datePicker/datePicker.vue";
import pcaPicker from "@/components/pcaPicker/pcaPicker.vue";
import { mapState } from "vuex";

export default {
  components: {
    datePicker,
    pcaPicker
  },
  data() {
    return {
      // 基础表单数据
      activityInfo: {
        name: "",
        application_deadline: "",
        startTime: "",
        endTime: "",
        vacancies: "",
        province: "",
        city: "",
        address: "",
        activityType: "",
        keywords: "",
        remark: "",
        picture: "",
      },
      pictureList:[],
      action: this.$url.BASE_URL + '/uploadImage',
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
      keywordList: [],
      selectedValues: [],
      selectedKeywords: [],
      rules: {
        name: {
          rules: [
            {
              required: true,
              errorMessage: "请输入姓名",
            },
          ],
        },
        application_deadline: {
          rules: [
            {
              required: true,
              errorMessage: "请输入报名截止时间",
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
        vacancies: {
          rules: [
            {
              required: true,
              errorMessage: "请输入招募队伍数",
            },
          ],
        },
        province: {
          rules: [
            {
              required: true,
              errorMessage: "请选择社区所在省",
            },
          ],
        },
        city: {
          rules: [
            {
              required: true,
              errorMessage: "请选择社区所在市",
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
    ...mapState([
      "user_id"
    ]),
    formattedKeywords() {
    // 将选中的关键词用逗号隔开展示在页面上
    return this.selectedKeywords.join(", ");
  }
  },
  watch: {
  // 监听选中关键词的变化，将其存入 activityInfo.keywords 中
  selectedKeywords(newVal) {
    this.activityInfo.keywords = newVal.join(", ");
  }
},
  mounted() {
  	this.getKeywords();
  },
  onLoad() {},
  onReady() {
    // 设置自定义表单校验规则，必须在节点渲染完毕后执行
    // this.$refs.customForm.setRules(this.customRules)
  },
  methods: {
    showPCA01(e) {
      this.$refs.pcaPicker.show();
    },
    getPCA01(e) {
      this.activityInfo.province = e.province;
      this.activityInfo.city = e.city;
    },
    showPDate(e) {
      this.$refs.datePicker.show();
    },
    showPDate1(e) {
      this.$refs.datePicker1.show();
    },
    showDDLDate(e) {
      this.$refs.datePicker2.show();
    },
    getStartDateTime(e) {
      this.activityInfo.startTime = e;
    },
    getEndDateTime(e) {
      this.activityInfo.endTime = e;
    },
    getDDLDateTime(e) {
      this.activityInfo.application_deadline = e;
    },
    submit() {
      this.$refs.baseForm
        .validate()
        .then((res) => {
          this.addActivity();
        })
        .catch((err) => {});
    },
    getKeywords() {
      uni.request({
        url: this.$url.BASE_URL + "/community/getKeywords",
        header: {
          Authorization: uni.getStorageSync("token"),
        },
        method: "GET",
        success: (res) => {
          console.log("成功请求-获取关键词列表");
          const keywords = res.data.data;
          this.keywordList = keywords.map((keyword, index) => {
        return { text: keyword, value: index };
      });
          console.log(this.keywordList);
          this.net_error = false;
        },
        fail: (res) => {
          this.net_error = true;
        },
        complete: () => {},
      });
    },
    addActivity() {
      if(this.activityInfo.picture == ''){
						uni.showToast({
							icon: 'error',
							title: '请上传图片！'
						}); 
						return ;
					}
      uni.request({
        url: this.$url.BASE_URL + "/community/activityinfo",
        // url: "http://4ddfdbb6.r21.cpolar.top/community/activityinfo",
        header: {
          Authorization: uni.getStorageSync("token"),
        },
        method: "POST",
        data: {
          community_id: this.user_id,
          name: this.activityInfo.name,
          application_deadline: this.activityInfo.application_deadline,
          start_time: this.activityInfo.startTime,
          end_time: this.activityInfo.endTime,
          vacancies: this.activityInfo.vacancies,
          province: this.activityInfo.province,
          city: this.activityInfo.city,
          address: this.activityInfo.address,
          category_id: this.activityInfo.activityType,
          keywords: this.selectedKeywords.join(","),
          remark: this.activityInfo.remark,
          picture: this.activityInfo.picture,
        },
        success: (res) => {
          console.log("成功请求-新增活动");
          console.log(res.data.data);
          uni.showToast({
							icon: 'success',
							title: '新增活动成功！'
						}); 
          this.net_error = false;
        },
        fail: (res) => {
          this.net_error = true;
        },
        complete: () => {},
      });
    },
    handleSuccess(data, index, lists, index2){
				console.log('上传图片成功，链接为',data);
				console.log('index',index);
				console.log('lists',lists);
				console.log('index2',index2);
				console.log('picture',this.pictureList);
				if(index ===0 ){
					this.activityInfo.picture = data;
				}
			},
			//删除时自动调用
			handleRemove(index, lists, name){
				console.log('删除图片',index,lists,name);
				console.log('删除图片',index,lists,name);
				this.activityInfo.picture = ''; //要设置为空
				console.log('删除图片',index,lists,name);
			},
      handleCheckboxChange() {
      this.selectedKeywords = this.selectedValues.map(value => {
        const keywordObj = this.keywordList.find(item => item.value === value);
        return keywordObj ? keywordObj.text : '';
      });
    }
  },
  watch: {
    selectedValues() {
      this.handleCheckboxChange();
    }
  }
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
.banner {
    margin-top: 10rpx;
    width: 200rpx !important;
    height: 200rpx !important;
  }
  .text {
		font-size: 12px;
		color: #666;
	}
	.uni-px-5 {
	    padding-left: 10px;
	    padding-right: 10px;
	}
</style>
