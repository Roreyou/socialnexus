<!-- 高校 - 找活动 -->
<template>
  <view>
    <view class="top_fix">
      <!-- 标题栏和搜索框 -->
      <view>
        <!-- <view class="title">
				活动广场
			</view> -->
        <view class="cu-bar search bg-white search">
          <view class="search-form round">
            <text class="cuIcon-search"></text>
            <input
              v-model="searchcontent"
              :adjust-position="false"
              type="text"
              placeholder="搜索活动"
              confirm-type="search"
            />
          </view>
          <view class="action">
            <button @click="search" class="cu-btn bg-green shadow-blur round">
              搜索
            </button>
          </view>
        </view>

        <view style="display: flex; flex-direction: row; margin-top: 10rpx; margin-bottom: 10rpx; background-color: white;">
          <view class="index" style="margin-left: 80rpx">
            <view class="form-item" @click="showPCA01">
              <view
                bindtap="goCnCollege"
                class="form-field"
                hoverClass="form-field-hover"
              >
                <view class="form-field-input">
                  <view style="color: #808080">{{ region }}
                    <u-icon name="arrow-down-fill" color="#808080" size="25" style="margin-left: 10rpx;"></u-icon>
                  </view>
                  <view></view>
                </view>
              </view>
            </view>
            <pcaPicker ref="pcaPicker" @confirm="getPCA01"></pcaPicker>
          </view>

          <view class="index" style="margin-left: 180rpx">
            <view class="form-item" @click="showPDate">
              <view
                bindtap="goCnCollege"
                class="form-field"
                hoverClass="form-field-hover"
              >
                <view class="form-field-input">
                  <view style="color: #808080">{{ dateTime }}
                    <u-icon name="arrow-down-fill" color="#808080" size="25" style="margin-left: 10rpx;"></u-icon>
                  </view>
                  <view></view>
                </view>
              </view>
            </view>
            <datePicker ref="datePicker" @confirm="getDateTime"></datePicker>
          </view>

          <view class="index" style="margin-left: 180rpx">
            <view class="form-item" @click="showPType">
              <view
                bindtap="goCnCollege"
                class="form-field"
                hoverClass="form-field-hover"
              >
                <view class="form-field-input">
                  <view style="color: #808080">{{ type }}
                    <u-icon name="arrow-down-fill" color="#808080" size="25" style="margin-left: 10rpx;"></u-icon>
                  </view>
                  <view></view>
                </view>
              </view>
            </view>
            <typePicker ref="typePicker" @confirm="getType"></typePicker>
          </view>
        </view>
      </view>
    </view>
    <view class="accontent">
      <scontent
        :acList="acList"
        :searchlist="searchlist"
        :searchcontent="newontent"
      ></scontent>
    </view>
  </view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
// import indexTabbar from '../../../components/search-tabbar/search-tabbar.vue';
import scontent from "../../../page_school/pages/search/searchcontent.vue";
import pcaPicker from "@/components/pcaPicker/pcaPicker.vue";
import datePicker from "@/components/datePicker/datePicker.vue";
import typePicker from "@/components/typePicker/typePicker.vue";
import UIcon from '../../../uview-ui/components/u-icon/u-icon.vue';

export default {
  components: {
    // indexTabbar,
    scontent,
    pcaPicker,
    datePicker,
    typePicker,
    UIcon,
    // utabsswiper
  },
  data() {
    return {
      region: "地区",
      dateTime: "时段",
      type: "类型",
      filterParam: {
        location: {
          province: "",
          city: "",
          district: "",
        },
        activity_time: "",
        category_name: "",
      },
      tabIndex: "0",
      currentTabComponent: "0",
      // 全屏组件
      tabBars: [
        {
          name: "地区",
          id: "0",
        },
        {
          name: "类型",
          id: "1",
        },
        {
          name: "时段",
          id: "2",
        },
      ],
      acList: [
      ],
      searchcontent: "", //搜索内容
      searchlist: [],
      newontent: "",
      page: 0,
    };
  },
  computed: {
			...mapState(['userInfo'])
		},
  mounted() {
    const data = {
      province: this.userInfo.province,
      city: this.userInfo.city,
      page: 0,
    };
    //刚打开时出现的是推荐的活动
    this.getRelist(data);
  },
  methods: {
    showPCA01(e) {
      this.$refs.pcaPicker.show();
    },
    getPCA01(e) {
      this.filterParam.location.province = e.province;
      this.filterParam.location.city = e.city;
      this.filterParam.location.district = e.district;
      this.getFilter();
    },
    showPDate(e) {
      this.$refs.datePicker.show();
    },
    getDateTime(e) {
      this.filterParam.activity_time = e;
      this.getFilter();
    },
    showPType(e) {
      this.$refs.typePicker.show();
    },
    getType(e) {
      this.filterParam.category_name = e;
      this.getFilter();
    },
    getFilter() {
      uni.request({
        url:
          this.$url.BASE_URL +
          "/schoolteam/activsquare/filter",
        // url: 'https://mock.apifox.coml/m1/schoolteam/activsquare/filter,
        method: "GET",
        data: {
          location: {
            province: this.filterParam.location.province,
            city: this.filterParam.location.city,
            district: this.filterParam.location.district,
          },
          activity_time: this.filterParam.activity_time,
          category_name: this.filterParam.category_name,
        },
        success: (res) => {
          this.searchlist = res.data.data.activ_list;
          console.log(this.searchlist);
          this.net_error = false;
        },
        fail: (res) => {
          this.net_error = true;
        },
        complete: () => {},
      });
    },
    getRelist(data) {
      uni.request({
        url:
          this.$url.BASE_URL +
          "/schoolteam/getRecommend",
        
        method: "GET",
        data: data,
        success: (res) => {
          // this.searchlist = res.data.data.acti_list;
          // this.searchlist = this.searchlist.concat(res.data.data.acti_list);  //试图修改懒加载后刷回最上面的bug
          this.searchlist = res.data.data.acti_list
          this.net_error = false;
        },
        fail: (res) => {
          this.net_error = true;
        },
        complete: () => {},
      });
    },
    TarData(item) {
      //设置id，来显示选中那个标签，显示下划线
      this.tabIndex = item.id;
      //显示标签对应的组件内容
      this.currentTabComponent = item.id;

      // 切换组件时页面滚动到顶部
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0,
      });
    },
    search() {
      this.newontent = this.searchcontent;
      this.TabCur = 0;
    },
  },
  onReachBottom() {
    uni.$emit("search--onReachBottom");
  },
};
</script>

<style>
.top_fix {
  background-color: transparent;
  position: fixed;
  top: 0; /* 或者设置为底部时使用 bottom: 0; */
  left: 0;
  width: 100%;
  z-index: 999; /* 可选：如果需要在其他元素之上显示导航栏，可以设置一个较高的 z-index 值 */
}
.accontent {
  margin-top: 160rpx;
}

.title {
  font-size: 40rpx;
  padding: 30rpx;
}
</style>
