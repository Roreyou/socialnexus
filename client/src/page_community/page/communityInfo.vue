<!-- 社区基层信息 -->
<template>
  <view class="container">
    <uni-section title="社区基本信息认证" type="line">
      <view class="example">
        <uni-forms ref="baseForm" :model="baseFormData" :rules="rules" labelWidth="80px">
          <uni-forms-item label="社区头像" name="avatar" style='max-width: 100%; !important'>
            <view>
          <u-upload class='banner' @on-success="handleSuccess" @on-remove="handleRemove" :custom-btn="true" :max-count="1" ref="uUpload" 
						:action="action" :file-list="avatarList" :auto-upload="true" style="display: flex; align-items: center">
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<image class='banner' :src="computedSrc"></image>
				</view>
			</u-upload>
        </view>
          </uni-forms-item>
          <uni-forms-item label="社区名字" name="name">
            <uni-easyinput
              v-model="baseFormData.name"
              placeholder="请输入社区名字"
            />
          </uni-forms-item>
          <uni-forms-item label="联系方式" name="tel">
            <uni-easyinput
              v-model="baseFormData.tel"
              placeholder="请输入社区联系方式"
            />
          </uni-forms-item>
          <uni-forms-item label="省" name="province">
            <uni-easyinput
              v-model="baseFormData.province"
              placeholder="请输入社区所在省"
            />
          </uni-forms-item>
          <uni-forms-item label="市" name="city">
            <uni-easyinput
              v-model="baseFormData.city"
              placeholder="请输入社区所在市"
            />
          </uni-forms-item>
          <uni-forms-item label="详细地址" name="address">
            <uni-easyinput
              v-model="baseFormData.address"
              placeholder="请输入社区详细地址"
            />
          </uni-forms-item>
          <uni-forms-item label="成立日期" name="setup_date">
            <uni-easyinput
              v-model="baseFormData.setup_date"
              placeholder="请输入社区成立日期"
            />
          </uni-forms-item>
          <uni-forms-item label="社区介绍" name="remark">
            <uni-easyinput
              type="textarea"
              v-model="baseFormData.remark"
              placeholder="请输入社区介绍"
            />
          </uni-forms-item>
        </uni-forms>
      </view>
      <view class="button-group">
        <button type="primary" size="mini" @click="submit">提交</button>
      </view>
    </uni-section>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      // 基础表单数据
      baseFormData: {
        name: "",
        tel: "",
        province: "",
        city: "",
        address: "",
        setup_date: "",
        remark: "",
        avatar: "",
      },
      avatarList: [],
      action: this.$url.BASE_URL + "/uploadImage",
      rules: {
        name: {
          rules: [
            {
              required: true,
              errorMessage: "请输入姓名",
            },
          ],
        },
        tel: {
          rules: [
            {
              required: true,
              errorMessage: "请输入联系方式",
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
        remark: {
          rules: [
            {
              required: true,
              errorMessage: "请输入社区介绍",
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
    computedSrc() {
      return this.baseFormData.avatar === '' ? 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/app/images/upload.png' : this.baseFormData.avatar;
    }
  },
  mounted() {
    uni.request({
      url: this.$url.BASE_URL + '/community/myInfo',
      // url: "https://mock.apifox.com/m1/community/myInfo",
      header: {
        Authorization: uni.getStorageSync("token"),
      },
      method: "GET",
      data: {
        id: this.user_id,
      },
      success: (res) => {
        this.baseFormData = res.data.data;
        console.log("成功请求-查询社区信息");
        this.net_error = false;
      },
      fail: (res) => {
        this.net_error = true;
      },
      complete: () => {},
    });
  },
  onLoad() {},
  onReady() {
    // 设置自定义表单校验规则，必须在节点渲染完毕后执行
    // this.$refs.customForm.setRules(this.customRules)
  },
  methods: {
    ...mapMutations(["setCommunityInfo"]),
    onClickItem(e) {
      console.log(e);
      this.current = e.currentIndex;
    },
    del(i, id) {
      // let index = this.dynamicLists.findIndex(v => v.id === id)
      console.log("del", i);
      this.dynamicFormData.domains.splice(i, 1);
      console.log(this.dynamicFormData.domains);
    },
    submit() {
      this.$refs.baseForm
        .validate()
        .then((res) => {
          this.updateInfo();
        })
        .catch((err) => {
        });
    },
    updateInfo() {
      if (this.baseFormData.avatar == "") {
        uni.showToast({
          icon: "error",
          title: "请上传头像！",
        });
        return;
      }
      uni.request({
        url: this.$url.BASE_URL + '/community/myInfo',
        header: {
          Authorization: uni.getStorageSync("token"),
        },
        method: "PUT",
        data: {
          id: this.baseFormData.id,
          name: this.baseFormData.name,
          tel: this.baseFormData.tel,
          province: this.baseFormData.province,
          city: this.baseFormData.city,
          address: this.baseFormData.address,
          setup_date: this.baseFormData.setup_date,
          remark: this.baseFormData.remark,
          avatar: this.baseFormData.avatar
        },
        success: (res) => {
          console.log("成功请求-更新社区信息");
          const userName = this.baseFormData.name;
          const avatar = this.baseFormData.avatar;
          this.setCommunityInfo({ userName, avatar });
          console.log(res.data.data);
          this.net_error = false;
        },
        fail: (res) => {
          this.net_error = true;
        },
        complete: () => {},
      });
    },
    handleSuccess(data, index, lists, index2) {
      console.log("上传图片成功，链接为", data);
      console.log("index", index);
      console.log("lists", lists);
      console.log("index2", index2);
      console.log("picture", this.avatarList);
      if (index === 0) {
        this.baseFormData.avatar = data;
      }
    },
    //删除时自动调用
    handleRemove(index, lists, name) {
      console.log("删除图片", index, lists, name);
      console.log("删除图片", index, lists, name);
      this.baseFormData.avatar = ""; //要设置为空
      console.log("删除图片", index, lists, name);
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
.banner {
    margin-top: 10rpx;
    width: 200rpx !important;
    height: 200rpx !important;
  }
</style>
