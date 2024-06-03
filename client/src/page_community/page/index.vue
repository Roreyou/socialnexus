<!-- 高校首页 -->
<!-- 因为是tab页所以必须放在主包 -->
<template>
  <view class="u-p-l-10 u-p-r-10">
    <view>
      <u-navbar :is-back="false">
        <view
          style="display: flex; justify-content: center; align-items: center"
        >
          <view class="u-p-30">
            你的位置：{{ province }} {{ city }}
            <u-icon
              name="arrow-down-fill"
              class="u-p-l-20"
              color="#515356"
            ></u-icon>
          </view>
        </view>
      </u-navbar>
    </view>
    <view class="cu-list menu-avatar bg-gradual-green padding-lg background">
      <view class="user-section">
        <image :src="communityInfo.avatar" class="cu-avatar xl round"></image>
        <view class="text-white text-xl padding">{{ userName }}</view>
        <view
          class="cu-btn bg-blue margin-left-sm"
          @click="handleAuthentication"
          >编辑信息</view
        >
        <!-- <view class="cu-btn bg-blue margin-left-sm" @click="handleAuthentication" style="font-family: pmkaiti;">认证信息</view> -->
      </view>
    </view>
    <view>
      <view class="rowClass">
        <u-row>
          <u-col
            span="4"
            text-align="center"
            v-for="(item, index) in navList"
            :key="index"
          >
            <view
              class="u-padding-20"
              @tap="clickNav(item.type)"
              hover-class="hoverClass"
              style="
                background-color: #ffffff;
                border-radius: 30rpx;
                margin-right: 10rpx;
              "
            >
              <image
                :src="item.src"
                style="width: 90rpx; height: 90rpx"
                mode="widthFix"
              ></image>
              <view class="tabName">{{ item.name }}</view>
            </view>
          </u-col>
        </u-row>
      </view>
      <!-- <u-gap height="10"></u-gap> -->
      <view @click="notice" class="margin-fixed xuanchuan">
        <u-notice-bar
          mode="vertical"
          :list="noticeList"
          type="primary"
          bg-color="#fff"
          :duration="3000"
          border-radius="15"
          font-size="30"
          volume-size="40"
        ></u-notice-bar>
      </view>
      <!-- <u-gap height="5"></u-gap> -->
      <!-- <u-waterfall v-model="flowList" ref="uWaterfall">
			    <template v-slot:left="{leftList}">
			        <view class="demo-warter" v-for="(item, index) in leftList" :key="index">
			            <u-lazy-load threshold="300" border-radius="12" :image="item.image" :index="index"
			                         @click="clickImage(item.id)"></u-lazy-load>
			            <view class="item-title">{{item.villageName}} {{item.type == '整租' ? item.houseNum + item.houseHall + item.toiletNum : item.roomType+'-朝'+item.direction}}</view>
						<view class="item-price">￥{{item.price}}</view>
			            <view class="item-desc">{{item.type}} | {{item.type == '整租' ? item.houseArea : item.roomArea}}㎡ {{item.floor}}</view>
			        </view>
			    </template>
			    <template v-slot:right="{rightList}">
			        <view class="demo-warter" v-for="(item, index) in rightList" :key="index">
			            <u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"
			                         @click="clickImage(item.id)"></u-lazy-load>
			            <view class="item-title">{{item.villageName}} {{item.type == '整租' ? item.houseNum + item.houseHall + item.toiletNum : item.roomType+'-朝'+item.direction}}</view>
			            <view class="item-price">￥{{item.price}}</view>
						<view class="item-desc">{{item.type}} | {{item.type == '整租' ? item.houseArea : item.roomArea}}㎡ {{item.floor}}</view>
			        </view>
			    </template>
			</u-waterfall> -->
    </view>

    <!-- 活动推荐列表 -->
    <view class="board margin-fixed">
      <view class="cu-bar" style="background-color: transparent">
        <view class="action">
          <text
            class="text-xl text-bold"
            style="
              color: #ffffff;
              font-size: 52rpx;
              font-weight: 600;
              font-family: 'pangmen';
              font-style: italic;
              background-color: transparent;
            "
            >正在招募</text
          >
        </view>
      </view>
      <actilist :acList="acList" :isindex="true"></actilist>
    </view>
    <!-- <view class="re-but">
				<button class="more-btn" @click="torec">点击加载更多推荐的活动</button>
		</view> -->
    <!-- <u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="findHouseList"></u-loadmore> -->
    <u-back-top :scroll-top="scrollTop" top="1000"></u-back-top>
    <u-no-network></u-no-network>
    <!-- <view class="buttom">
			<view class="loginType">
				<view class="wechat item">
					<view class="icon"><u-icon size="60" name="server-man" color="#999" @click="server"></u-icon></view>
				</view>
			</view>
		</view> -->
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import actilist from "../../components/acti-list/acti_list_community.vue";

export default {
  components: {
    actilist,
  },

  data() {
    return {
      longitude: null,
      latitude: null,
      province: "",
      city: "",

      avatar:
        "https://tse4-mm.cn.bing.net/th/id/OIP-C.8Zujx-NGIfUypDUetU95JwHaHv?w=153&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",

      keyword: "",
      pageNum: 1,
      pageSize: 20,
      scrollTop: 0,
      houseList: [],
      noticeList: [
        "开社会风气之先，做青年志愿者",
        "构筑和谐企业，弘扬志愿精神，创建文明社区",
        "予人玫瑰，手有余香",
      ],
      navList: [
        {
          name: "新增活动",
          src: "http://scu5azomr.hn-bkt.clouddn.com/static/img/index/cover/index_cover1.png",
          type: "1",
        },
        {
          name: "我的活动",
          src: "http://scu5azomr.hn-bkt.clouddn.com/static/img/index/cover/index_cover2.png",
          type: "2",
        },
        {
          name: "我的队伍",
          src: "http://scu5azomr.hn-bkt.clouddn.com/static/img/index/cover/index_cover3.png",
          type: "3",
        },
      ],
      loadStatus: "loadmore",
      flowList: [],
      acList: [],
      page: 0,
      loadmore: true, //true是还没拿完 如果服务器空了就是false
    };
  },

  computed: {
    ...mapState([
      "hasLogin",
      "forcedLogin",
      "userName",
      "user_id",
      "communityInfo",
    ]),
  },

  // onLoad() {
  // 	uni.$on('findIndexHouseList', (obj) => {
  // 		// 获取数据
  // 		this.findHouseList(1);
  // 	})
  // 	// 获取数据
  // 	this.findHouseList();
  // },
  onUnload() {
    // 移除监听事件
    // uni.$off('findIndexHouseList');
  },
  onShow() {
    this.getlocation();

    const data = {
      province: this.province,
      city: this.city,
      page: 0,
    };
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  // onReachBottom() {
  //     this.loadStatus = 'loading';
  //     // 获取数据
  // 	this.findHouseList()
  // },
  onReachBottom() {
    uni.$emit("onReachBottom");
    // console.log('index -- onReachBottom')
    ++this.page;
    if (this.loadmore) {
      this.$u.toast(`加载更多活动...`);
      this.loadActilist();
    } else {
      //到底了
      this.$u.toast(`已经到底啦`);
    }
  },
  // 下拉刷新
  // onPullDownRefresh() {
  // 	// 获取数据
  // 	this.findHouseList(1);
  // 	// 关闭刷新
  // 	uni.stopPullDownRefresh();
  // },
  methods: {
    ...mapMutations(["setAddress"]),
    //转义为省市
    locationn() {
      console.log(this.longitude);
      console.log(this.latitude);
      const _this = this;
      uni.request({
        url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${encodeURIComponent(
          this.latitude
        )},${encodeURIComponent(
          this.longitude
        )}&key=P56BZ-H7RC3-54T3L-R753V-L5BNH-G7FIF`,
        method: "GET",
        success: (res) => {
          console.log("res=", res);
          _this.province = res.data.result.address_component.province;
          _this.city = res.data.result.address_component.city;
          const province = _this.province;
          const city = _this.city;
          // console.log("p=", p)
          // console.log("c=", c)
          this.setAddress({ province, city });
          const data = {
            province: province,
            city: city,
            page: this.page,
          };
          this.loadActilist(data);
        },
      });
    },

    //获取位置
    getlocation() {
      var that = this;
      const _this = this;
      if (this.communityInfo.province !== "") {
        this.city = this.communityInfo.city;
        this.province = this.communityInfo.province;
        this.loadActilist();
        return;
      } else {
        uni.getFuzzyLocation({
          success: function (res) {
            _this.longitude = res.longitude;
            _this.latitude = res.latitude;
            console.log(res);
            _this.locationn();
          },
        });
      }
    },

    loadActilist() {
      //加载活动列表
      uni.request({
        url: this.$url.BASE_URL + "community/activities",
        header: {
          Authorization: uni.getStorageSync("token"),
        },
        method: "GET",
        data: {
          community_id: this.user_id,
          status: 1,
        },
        success: (res) => {
          if (res.data.data.length) {
            this.acList = res.data.data;
          } else {
            this.loadmore = false;
          }
          this.net_error = false;
        },
        fail: (res) => {
          this.net_error = true;
        },
        complete: () => {},
      });
    },
    handleAuthentication() {
      // this.$u.route({
      // 	url: 'pages/school/index/verify',
      //   })
      uni.navigateTo({
        url: "",
      });
    },
    location() {
      this.$u.route({
        url: "",
      });
    },
    search() {
      this.$u.route({
        url: "",
      });
    },
    notice() {
      this.$u.route({
        url: "",
      });
    },
    checkUpdate() {
      uni.getSystemInfo({
        success: (res) => {
          //检测当前平台，如果是安卓则启动安卓更新
          if (res.platform == "android") {
            console.log("is android");
          }
        },
      });
    },
    clickSearch() {
      this.$u.route("");
    },
    clickImage(houseId) {
      this.$u.route({
        url: "",
        params: {
          houseId: houseId,
        },
      });
    },
    clickNav(type) {
      if (type === "1") {
        if (!this.communityInfo.isUser) {
          uni.showModal({
            title: "",
            content: "请登录后查看。是否前去登录？",
            success: function (res) {
              if (res.confirm) {
                console.log("用户点击了确定");
                uni.reLaunch({
                  url: "../../pages/login/login",
                });
              } else if (res.cancel) {
                console.log("用户点击了取消");
                return;
              }
            },
          });
        } else {
          this.$u.route("/pages/community/addActivity");
          uni.navigateTo({
            url: "../page/addActivity",
          });
        }
      }
      if (type === "2") {
        if (!this.communityInfo.isUser) {
          uni.showModal({
            title: "",
            content: "请登录后查看。是否前去登录？",
            success: function (res) {
              if (res.confirm) {
                console.log("用户点击了确定");
                uni.reLaunch({
                  url: "../../pages/login/login",
                });
              } else if (res.cancel) {
                console.log("用户点击了取消");
                return;
              }
            },
          });
        } else {
          this.$u.route("/pages/community/myActivity");
          uni.navigateTo({
            url: "../page/myActivity/myActivity",
          });
        }
      }
      if (type === "3") {
        if (!this.communityInfo.isUser) {
          uni.showModal({
            title: "",
            content: "请登录后查看。是否前去登录？",
            success: function (res) {
              if (res.confirm) {
                console.log("用户点击了确定");
                uni.reLaunch({
                  url: "../../pages/login/login",
                });
              } else if (res.cancel) {
                console.log("用户点击了取消");
                return;
              }
            },
          });
        } else {
          this.$u.route("/pages/community/myTeam");
          uni.navigateTo({
            url: "../page/myTeam/myTeam",
          });
        }
      }
    },
    code() {
      this.$mytip.toast("请咨询作者");
    },
    appSysFlowInfo() {
      let url = "web/appSysFlowInfo";
      this.$u
        .post(url, {
          uvCode: this.uvCode,
        })
        .then((code) => {
          this.uvCode = code;
        });
    },
    server() {
      // window.open('https://sourcebyte.cn')
    },
    //点击加载更多活动
    torec() {
      uni.navigateTo({
        url: "../page/myActivity/myActivity",
      });
    },
    handleAuthentication() {
      if (!this.communityInfo.isUser) {
        uni.showModal({
          title: "",
          content: "请登录后查看。是否前去登录？",
          success: function (res) {
            if (res.confirm) {
              console.log("用户点击了确定");
              uni.reLaunch({
                url: "../../pages/login/login",
              });
            } else if (res.cancel) {
              console.log("用户点击了取消");
              return;
            }
          },
        });
      } else {
        this.$u.route("/pages/community/myInfo");
        this.$u.route({
          url: "page_community/page/communityInfo",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// 用户名
.user-section {
  display: flex;
  align-items: center;
}

.nomore {
  background-color: $u-bg-color;
}

.search {
  width: 54px;
  height: 44px;

  &:active {
    background-color: $u-bg-color;
  }
}

.rowClass {
  // border-radius: 8px;
  // background-color: rgb(255, 255, 255);
  // margin-top: 10rpx;
  border-radius: 30rpx;
  margin-top: 20rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
  // background-color: #ffffff;
}

.hoverClass {
  background-color: #e4e7ed;
}

.tabName {
  font-size: 28rpx;
  color: $u-main-color;
}

.demo-warter {
  border-radius: 8px;
  margin-top: 3px;
  background-color: #ffffff;
  padding: 3px;
  position: relative;
}

.u-close {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
}

.item-cover {
  font-size: 55rpx;
  color: $u-type-warning;
}

.item-title {
  font-size: 28rpx;
  color: $u-main-color;
  font-weight: bold;
  padding-top: 5rpx;
  padding-left: 10rpx;
}

.item-price {
  font-weight: normal;
  font-size: 32rpx;
  color: $u-type-warning;
}

.item-desc {
  font-weight: normal;
  font-size: 26rpx;
  color: $u-tips-color;
  padding-bottom: 5rpx;
  padding-left: 10rpx;
}

.item-tag {
  font-size: 24rpx;
  color: $u-tips-color;
  margin-top: 3px;
}

.buttom {
  .loginType {
    font-size: 14px;
    position: fixed;
    right: 30rpx;
    bottom: 300rpx;
    width: 60px;
    height: 60px;
    padding: 4px;
    cursor: pointer;
    background: #fff;
    text-align: center;
    line-height: 60px;
    border-radius: 100%;
    -webkit-box-shadow: 0px 1px 20px 0px rgba(0, 0, 0, 0.1),
      inset 0px -1px 0px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 1px 20px 0px rgba(0, 0, 0, 0.1),
      inset 0px -1px 0px 0px rgba(0, 0, 0, 0.1);
  }
}

.margin-left-sm {
  margin-left: auto;
}

.cu-btn {
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

//活动推荐列表
.cu-item .shadow {
  margin: 0;
  margin-top: 10rpx;
}

.cu-bar .action:first-child {
  margin-left: 24rpx;
}

//tag
.wordcont {
  margin-top: 10rpx;
}
.wordcont .ackeywords {
  display: inline-block;
  margin-right: 10rpx; /* 可以调整标签之间的水平间距 */
}

// 活动推荐列表
.board {
  border-radius: 10px;
  background-color: #37c4568f;
  background-image: linear-gradient(
    to right top,
    #41b851,
    #59c549,
    #72d23e,
    #8cdf2e,
    #a8eb12
  );
  background-image: linear-gradient(
    to right bottom,
    #6aa6fd,
    #85aefe,
    #9ab6fe,
    #adbeff,
    #bec7ff
  );
}

// 活动推荐标题
.action {
  background-color: transparent;
}
.text-xl text-bold {
  font-size: 52rpx;
  font-weight: 600;
  // font-family: 'pangmen';
  // font-style: italic;
  // font-size: 34rpx;
  color: #ffffff;
  font-family: "Arial";
  font-style: normal;
  background-color: transparent;
}
.more-btn {
  font-size: small;
}
.background {
  background-image: url(http://scu5azomr.hn-bkt.clouddn.com/static/1.png);
  // background-size: 730rpx 350rpx;
  height: 350rpx;
  border-radius: 30rpx;
  margin-top: 20rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
  background-position: right;
  background-size: 122.666% 100%;
}
.margin-fixed {
  border-radius: 30rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
  margin-top: 20rpx;
  // margin-bottom: 20rpx;
}
</style>
