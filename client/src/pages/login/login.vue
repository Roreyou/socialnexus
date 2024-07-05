<!-- 统一登录界面 -->
<template>
  <view class="content back">
    <!-- step0 选择角色 -->
    <view class="container" v-if="step === 0">
      <view class="text1">选择登录角色</view>
      <view
        class="team-box"
        :class="selectedRole == item.id ? 'selected' : 'team-box'"
        v-for="item in list"
        :key="item.id"
        @click="selectRole(item.id)"
      >
        <img class="avatar" :src="item.avatarUrl" alt="Avatar" />
        <view class="team-name">{{ item.name }}</view>
      </view>
    </view>

    <!-- step1 step3团委/社区基层登录 -->
    <view class="container" v-else-if="step === 1 || step === 3">
      <view class="text1">{{
        step === 1 ? "校团委登录" : "社区基层登录"
      }}</view>
      <view>
        <view class="input-group">
          <view class="input-row border">
            <text class="title">账号：</text>
            <m-input
              class="m-input"
              type="text"
              clearable
              focus
              v-model="account"
              placeholder="请输入账号"
            ></m-input>
          </view>
          <view class="input-row">
            <text class="title">密码：</text>
            <m-input
              type="password"
              displayable
              v-model="password"
              placeholder="请输入密码"
            ></m-input>
          </view>
        </view>
        <!-- 直接登录 -->
        <view class="btn-row">
          <button class="cu-btn bg-green block lg" @tap="bindLogin">
            登录
          </button>
        </view>
        <!-- 返回 -->
        <view class="back-button" @tap="back"></view>
      </view>
      <view class="action-row" style="margin-top: -17rpx">
        <navigator
          url="../reg/reg"
          style="font-weight: bold; color: darkgreen"
          v-if="step === 3"
          >注册账号</navigator
        >
        <text style="color: white">|</text>
        <!-- <navigator url="../pwd/pwd" style="font-weight: bold; color: darkgreen" >忘记密码</navigator>
				<text style="color: white;" >|</text> -->
        <navigator
          url="../school/index/index"
          open-type="reLaunch"
          style="font-weight: bold; color: darkgreen"
          >游客模式</navigator
        >
      </view>
    </view>

    <!-- 高校队伍登录 -->
    <view class="container" v-else-if="Math.floor(step) === 2">
      <view class="text1">高校队伍登录</view>
      <!-- step2.1 第一步，填写账号 -->
      <view v-if="step === 2.1">
        <view class="input-group">
          <view class="input-row border">
            <text class="title">个人ID：</text>
            <m-input
              class="m-input"
              type="text"
              clearable
              focus
              v-model="account"
              placeholder="请输入个人ID"
            ></m-input>
          </view>
        </view>
        <view class="radio-container">
          <evan-radio
            v-model="member_iden"
            label="0"
            primary-color="#39B54A"
            style="color: darkgreen"
            >队长/队员</evan-radio
          >
          <evan-radio
            v-model="member_iden"
            label="1"
            primary-color="#39B54A"
            style="color: darkgreen"
            >指导老师</evan-radio
          >
        </view>
        <!-- 下一步 -->
        <view class="btn-row">
          <button class="cu-btn bg-green block lg" @tap="teamNext">
            下一步
          </button>
        </view>
        <!-- 返回 -->
        <view class="back-button" @tap="back"></view>
      </view>
      <!-- 2.2 选择登入队伍-->
      <view v-else-if="step === 2.2">
        <view v-if="teamList != null">
          <view
            class="team-box"
            :class="selectedTeam == item.team_id ? 'selected' : 'team-box'"
            v-for="item in teamList"
            :key="item.team_id"
            @click="selectTeam(item.team_id)"
          >
            <img class="avatar" :src="item.avatarUrl" alt="Avatar" />
            <view class="team-name">{{ item.team_name }}</view>
          </view>
        </view>
        <view v-else style="display: flex; justify-content: center">
          <view class="team-name">很抱歉，您未加入任何队伍。</view>
        </view>
        <view v-if="selectedTeam != ''">
          <m-input
            class="input-pwd"
            type="password"
            displayable
            v-model="password"
            placeholder="请输入密码"
          ></m-input>
          <view class="btn-row">
            <button class="cu-btn bg-green block lg" @tap="bindLogin">
              登录
            </button>
          </view>
        </view>
        <!-- 返回 -->
        <view class="back-button" @tap="back"></view>
      </view>
      <view class="action-row" style="margin-top: -17rpx">
        <navigator url="../reg/reg" style="font-weight: bold; color: darkgreen"
          >注册账号</navigator
        >
        <text style="color: white">|</text>
        <!-- <navigator url="../pwd/pwd" style="font-weight: bold; color: darkgreen" >忘记密码</navigator>
				<text style="color: white;" >|</text> -->
        <navigator
          url="../school/index/index"
          open-type="reLaunch"
          style="font-weight: bold; color: darkgreen"
          >游客模式</navigator
        >
      </view>
    </view>

    <!-- 切换身份按钮 -->
    <!-- <view style="padding: 30rpx;">
			<YtabBtns :data="list" :index.sync="index"></YtabBtns>
		</view> -->
  </view>
</template>

<script>
import service from "../../service.js";
import { mapState, mapMutations } from "vuex";
import mInput from "../../components/m-input.vue";
import YtabBtns from "../../components/login-tab/YtabBtns.vue";
import EvanRadioGroup from "@/uni_modules/evan-radio/components/evan-radio-group/evan-radio-group.vue";
import EvanRadio from "@/uni_modules/evan-radio/components/evan-radio/evan-radio.vue";
export default {
  components: {
    mInput,
    YtabBtns,
    EvanRadio,
    EvanRadioGroup,
  },
  data() {
    return {
      // 身份按钮
      index: 0,
      list: [
        {
          name: "我是校团委",
          id: 1,
          avatarUrl:
            "https://socialnexus.oss-cn-shenzhen.aliyuncs.com/app/images/450.png",
        },
        {
          name: "我是高校队伍",
          id: 2,
          avatarUrl:
            "https://socialnexus.oss-cn-shenzhen.aliyuncs.com/app/images/true.png",
        },
        {
          name: "我是基层工作人员",
          id: 3,
          avatarUrl:
            "https://socialnexus.oss-cn-shenzhen.aliyuncs.com/app/images/uBXdSziguA.png",
        },
        {
          name: "我只是一名游客",
          id: 4,
          avatarUrl:
            "https://socialnexus.oss-cn-shenzhen.aliyuncs.com/app/images/images.png",
        },
      ],

      account: "", // 团委/社区的账号，高校队伍成员的个人id
      password: "",
      member_iden: null, // 0为队员/队长，1为指导老师
      teamList: [],
      selectedTeam: "",
      chooseTeam: false,
      selectedRole: null,
      step: 0,
    };
  },
  computed: mapState(["forcedLogin"]),
  onLoad: function (options) {
    wx.hideHomeButton();
  },
  methods: {
    ...mapMutations(["login1", "login2", "login3"]),
    teamNext() {
      console.log("this.member_iden", this.member_iden);
      if (this.account.length === 0) {
        uni.showToast({
          icon: "none",
          title: "请输入个人ID",
        });
        return;
      }
      if (this.member_iden != 0 && this.member_iden != 1) {
        uni.showToast({
          icon: "none",
          title: "请选择身份",
        });
        return;
      }
      // 请求所参与的队伍列表
      uni.request({
        // url: this.$url.BASE_URL + '/schoolteam/getMyTeams',
        url: this.$url.BASE_URL + "/schoolteam/getMyTeams",
        header: {},
        method: "GET",
        data: {
          id: this.account,
          identity: this.member_iden,
        },
        success: (res) => {
          if (res.data.code == 200) {
            console.log("成功请求-登录-所属于的多支队伍");
            this.teamList = res.data.data.team_list;
          } else if (res.data.code == 500) {
            uni.showToast({
              icon: "none",
              title: "您不属于任何队伍。",
            });
          }
          this.net_error = false;
        },
        fail: (res) => {
          this.net_error = true;
        },
        complete: () => {},
      });
      // 下一步，选择哪个队伍登录进去
      this.step = 2.2;
    },
    // 选择登录的队伍
    selectTeam(teamID) {
      console.log("选择的队伍", teamID);
      console.log("this.selectedTeam before", this.selectedTeam);
      this.selectedTeam = teamID;
      console.log("this.selectedTeam after", this.selectedTeam);
    },
    // 我是xxx
    selectRole(roleID) {
      console.log("选择的角色", roleID);
      // 记得清空数据
      (this.account = ""), // 团委/社区的账号，高校队伍成员的个人id
        (this.password = ""),
        (this.member_iden = null), // 0为队员/队长，1为指导老师
        (this.teamList = []),
        (this.selectedTeam = ""),
        (this.chooseTeam = false),
        (this.selectedRole = null),
        (this.step = 0),
        (this.selectedRole = roleID);
      if (this.selectedRole === 1) {
        // 校团委
        this.step = 1;
      } else if (this.selectedRole === 2) {
        // 高校队伍
        this.step = 2.1;
      } else if (this.selectedRole === 3) {
        // 社区基层
        this.step = 3;
      } else if (this.selectedRole === 4) {
        // 游客
        uni.reLaunch({
          url: "../school/index/index",
        });
      }
    },

    initPosition() {
      /**
       * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
       * 反向使用 top 进行定位，可以避免此问题。
       */
      this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
    },
    // 登录逻辑
    bindLogin() {
      /**
       * 客户端对账号信息进行一些必要的校验。
       * 实际开发中，根据业务需要进行处理，这里仅做示例。
       */
      if (Math.floor(this.step) === 2 && this.selectedTeam === "") {
        uni.showToast({
          icon: "none",
          title: "请选择要登录的队伍",
        });
        return;
      }
      if (this.account.length === 0) {
        uni.showToast({
          icon: "none",
          title: "请输入账号",
        });
        return;
      }
      if (this.password.length === 0) {
        uni.showToast({
          icon: "none",
          title: "请输入密码",
        });
        return;
      }

      // 设置身份
      let identity = "";
      if (this.step === 1) {
        identity = "school";
      } else if (Math.floor(this.step) === 2) {
        identity = "team";
        // this.account = this.selectedTeam;
      } else {
        identity = "community";
      }

      const data = {
        identity: identity,
        id: this.account, //账号
        pwd: this.password,
      };
      console.log("data", data);
      if (identity === "school" || identity === "community") {
        //团委/社区登录
        uni.request({
          // 团委登录接口
          // url: this.$url.BASE_URL + '/auth/login?apifoxApiId=154755970',
          url: this.$url.BASE_URL + "/auth/login",
          // 社区基层
        //   url: this.$url.BASE_URL + '/auth/login?apifoxApiId=154447878',
          method: "POST",
          data: data,
          success: (res) => {
            if (res.data.code == 200) {
              // 保存 token
              uni.setStorageSync("token", res.data.data.token);
              const user_id = this.account;
              let username = "";
              let avatar = "";
              if (identity === "school") {
                username = "校团委";
                this.login1({ user_id, username });
                uni.reLaunch({
                  url: "../../page_commitee/page/index/index",
                });
              } else if (identity === "community") {
                username = res.data.data.name;
                avatar = res.data.data.avatar;
                this.login3({ user_id, username, avatar });
                uni.reLaunch({
                  url: "../../page_community/page/index",
                });
              }
            } else {
              uni.showToast({
                icon: "none",
                title: "用户账号或密码不正确",
              });
            }
          },
          fail: (res) => {
            this.net_error = true;
          },
          complete: () => {},
        });
      } else {
        //高校登录
        const data2 = {
          identity: identity,
          id: this.account, //个人ID
          pwd: this.password,
          team_id: this.selectedTeam, //队伍id，用来判断是否是队长
          is_teacher: this.member_iden, //身份，0为队员/队长，1为指导老师
        };
        console.log("登录发送参数", data2);
        uni.request({
          // 高校
          // url: this.$url.BASE_URL + '/auth/login/schoolteam',
          url: this.$url.BASE_URL + "/auth/login/schoolteam",
          method: "POST",
          data: data2,
          success: (res) => {
            console.log("登录返回", res.data);
            if (res.data.code == 200) {
              console.log("登录成功-高校队伍", res.data.data);
              // 保存 token
              uni.setStorageSync("token", res.data.data.token);
              //登录的是高校队伍，响应里有审核状态等
              const user_id = this.selectedTeam; //队伍id
              const user_name = res.data.data.team_name; // 即username
              let person_identity = "队员";
              person_identity = "2";
              // 下面信息是只有高校队伍有的，存在store的userInfo
              if (this.member_iden == 0 && res.data.data.isleader) {
                person_identity = "队长";
                person_identity = "1";
              } else if (this.member_iden == 1) {
                person_identity = "老师";
                person_identity = "3";
              }
              const person_id = this.account;
              const verification_status = res.data.data.verification_status;
              const avatar = res.data.data.avatar;
              const isleader = res.data.data.isleader;
              const personName = res.data.data.personName;
              const modification_status = res.data.data.modification_status;
              console.log("personName=", personName);
              this.login2({
                user_id,
                user_name,
                person_identity,
                person_id,
                avatar,
                verification_status,
                isleader,
                personName,
                modification_status,
              });
              uni.reLaunch({
                url: "../school/index/index",
              });
            } else {
              uni.showToast({
                icon: "none",
                title: "用户账号或密码不正确",
              });
            }
          },
          fail: (res) => {
            this.net_error = true;
          },
          complete: () => {},
        });
      }
    },
    getUserInfo({ detail }) {
      if (detail.userInfo) {
        this.toMain(detail.userInfo.nickName);
      } else {
        uni.showToast({
          icon: "none",
          title: "登陆失败",
        });
      }
    },
    toMain(team_id, verification_status, team_name, avatar, isleader) {
      // console.log("tomain-avatar", avatar)
      const user_id = team_id;
      const user_name = team_name;
      // 把信息存入到store，（index.js）
      this.login({ user_id, verification_status, user_name, avatar, isleader });

      uni.reLaunch({
        url: "../../page_school/pages/index/index",
      });
      /**
       * 强制登录时使用reLaunch方式跳转过来
       * 返回首页也使用reLaunch方式
       */

      //开发用的，直接进去
      if (this.forcedLogin) {
        if (this.account == "1") {
          uni.reLaunch({
            url: "../school/index/index" /*进入高校首页*/,
          });
        } else if (this.account == "2") {
          uni.reLaunch({
            url: "../../page_commitee/page/index/index" /*进入团委首页*/,
          });
        } else if (this.account == "3") {
          uni.reLaunch({
            url: "../../page_community/page/index" /*进入社区首页*/,
          });
        }
      } else {
        // 返回上一个页面
        uni.navigateBack();
      }
    },

    // 身份按钮
    change(info) {
      // 可以通过change事件来获取切换 也可以通过watch来监听index变化来获取切换
      uni.showToast({
        title: `你点击了${info.name}`,
      });
      console.log("切换用户类别");
      this.chooseTeam = false;
    },
    back() {
      //上一步
      // 团委/社区基层，直接返回选择角色页面
      if (this.step === 1 || this.step === 3) {
        this.step = 0;
      } else if (this.step === 2.1) {
        this.step = 0;
      } else if (this.step === 2.2) {
        this.step = 2.1;
      }
    },
  },
  watch: {
    index(newIndex) {
      // 在 index 变化时执行逻辑
      this.chooseTeam = false;
    },
  },
  onReady() {
    this.initPosition();
  },
};
</script>

<style lang="scss" scoped>
@import url("../../static/styles/login.css");
.action-row {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: #39b54a;
}

.action-row navigator {
  color: #39b54a;
  padding: 0 10px;
}

.logo {
  width: 250upx;
  height: 250upx;
  border-radius: 50%;
  margin: 50px auto 20px auto;
}

.guest-button {
  color: #39b54a;
  border: 2px solid #000000;
  padding: 12px 24px;
  font-size: 10px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
}
.team-box {
  display: flex;
  align-items: center;
  padding: 30rpx;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30rpx;
  cursor: pointer;
  margin-bottom: 18rpx;
}

.selected {
  border: 2rpx solid#39B54A;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  margin-right: 44rpx;
}

.team-name {
  font-weight: bold;
  font-size: 16px;
}
.input-pwd {
  margin-top: 10px;
  font-size: 12px;
  background-color: white;
  border-radius: 10px;
  border-color: balck;
  height: 30px;
}
.back {
  background-image: url(https://socialnexus.oss-cn-shenzhen.aliyuncs.com/app/images/20240603160026.png);
  background-size: 100% 100%;
  height: 100vh;
  background-attachment: fixed;
}
.container {
  // border-radius: 30rpx;
  background-color: rgba(255, 255, 255, 0.3);
  margin-top: 300rpx;
}
.text1 {
  font-size: 30rpx;
  font-family: "Arial";
  margin-top: 20rpx;
  margin-left: 20rpx;
  margin-bottom: 20rpx;
  font-weight: bold;
  color: darkgreen;
}
.back-button {
  background-color: transparent;
  cursor: pointer;
  background-image: url("https://socialnexus.oss-cn-shenzhen.aliyuncs.com/app/images/7dcb6948_E797749_7ba3cab7XZ.png");
  background-size: 100% 100%;
  height: 100rpx;
  width: 100rpx;
  margin-top: -33rpx;
}
.radio-container {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 20rpx;
}

.radio-container label {
  flex-basis: 50%;
}
</style>
