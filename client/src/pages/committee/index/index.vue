<!-- 校团委 首页 -->
<template>
  <view class="u-p-l-10 u-p-r-10">

    <!-- 页面顶部导航栏 -->
		<!-- <u-navbar :is-back="false">
			<view style="display: flex;justify-content: center;align-items: center;">
				<view class="u-p-30"  @click="location">
					杭州
					<u-icon name="arrow-down-fill" class="u-p-l-20" color="#515356"></u-icon>
				</view>
				<u-search placeholder="搜索实践活动" v-model="keyword" input-align="center"  :show-action="false" :clearabled="true"
:disabled="true" style="width: 565rpx;" @click="search">
        </u-search>
			</view>
		</u-navbar> -->

    
    <!-- 最顶部信息 -->
		<view class="cu-list menu-avatar bg-gradual-green padding-lg">
			<view class="user-section">
				<image :src="avatar" class="cu-avatar xl round"></image>
				<view class="text-white text-xl padding">中大校团委</view>
				<!-- <view class="cu-btn bg-blue margin-left-sm" @click="handleAuthentication" style="font-family: pmkaiti;">认证信息</view> -->
			</view>
		</view>

		<view> 
			<view class="rowClass">
        <!-- 点击去高校队伍/社区需求 -->
				<u-row>
					<u-col span="4" text-align="center" v-for="(item,index) in navList" :key="index">
						<view class="u-padding-20" @tap="clickNav(item.type)" hover-class="hoverClass">
							<image :src="item.src" style="width: 90rpx;height: 90rpx;" mode="widthFix"></image>
							<view class="tabName">{{item.name}}</view>
						</view>
					</u-col>
				</u-row>
			</view>

      <!-- 一个间隔 -->
			<u-gap height="10"></u-gap>

      <!-- 滚动通知栏 -->
			<view @click="notice">
				<u-notice-bar mode="vertical" :list="noticeList" type="primary" more-icon
				bg-color="#fff" :duration="5000" border-radius="15"></u-notice-bar>
			</view>
			<u-gap height="5"></u-gap>
		</view> 

    <!-- 红色图片轮播图 -->
		<!-- <view>
			<u-swiper :list="swiperList" height="400"></u-swiper>
		</view>	  -->
    <view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
        <swiper-item v-for="item in swiperList" :key="item.id">
          <image class="swiper-item" :src="item.imageSrc"></image>
        </swiper-item>
			</swiper>
		</view>

    <u-gap height="10"></u-gap>
		
		<!-- 活动推荐列表 -->
		<view class="board">
			<view class="cu-bar" style="background-color: transparent">
				<view class="action">
					<text class="text-xl text-bold" style="color: #000000; font-size: 52rpx; font-weight: 600; font-family: 'pangmen'; font-style: normal; background-color: transparent">数据墙</text>
				</view>
			</view>
			<!-- 一个柱状图 -->
			<!-- <view class="echart" id="mychart" :style="myChartStyle">柱状图</view> -->
		</view>

    <!-- 当用户滚动页面时，提供一个快速返回页面顶部的按钮。 -->
    <!-- 当页面滚动到或超过指定的 top 值时，返回顶部按钮将显示出来。 -->
		<u-back-top :scroll-top="scrollTop" top="1000"></u-back-top>

		<!-- <u-no-network></u-no-network> -->
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
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import actilist from '../../../components/acti-list/acti-list.vue';
	import * as echarts from "echarts";

	export default {
		components: {
			actilist,

		},

		data() {
			return {
				avatar:'https://bkimg.cdn.bcebos.com/smart/4afbfbedab64034f78f004bd468b6e310a55b319b77d-bkimg-process,v_1,rw_1,rh_1,pad_1,color_ffffff?x-bce-process=image/format,f_auto',
				keyword: '',
				pageNum: 1,
				pageSize: 20,
				scrollTop: 0,
				// 轮播图相关
        		indicatorDots: true, // 轮播图的指示点是否显示
        		autoplay: true, // 轮播图自动播放
        		interval: 2000, // 自动播放时间间隔
        		duration: 500, // 滑动时长
				houseList: [],
				// 轮播图图片
				swiperList: [
        		  { id: 1, imageSrc: 'https://img.zcool.cn/community/012a2f5f9cce0f11013fdcc7329e32.jpg@1280w_1l_2o_100sh.jpg' },
        		  { id: 2, imageSrc: 'https://p4.img.cctvpic.com/photoworkspace/contentimg/2021/11/08/2021110810083211648.jpg' },
        		  { id: 3, imageSrc: 'https://picnew7.photophoto.cn/20130724/hongsegemingtupian-18805580_1.jpg' }          
        		],
				// 通知
				noticeList: [
					'强国有我，青春有为',
					'行万里路，知中国情',
				],
				navList:[
				   {name:"高校队伍",src:"https://bpic.588ku.com/element_origin_min_pic/19/04/09/0a8d87aefebd3ae13f63d01348d6cd29.jpg",type:"1"},
				   {name:"社区需求",src:"https://img.tukuppt.com/png_preview/00/10/08/SSXIUHKBqJ.jpg!/fw/780",type:"2"},
				],
				loadStatus: 'loadmore',
				flowList: [],
				uvCode: uni.getStorageSync('uvCode'),
				// 活动列表
				acList:[
					{	
						state: "已结束",
						title: "5月15日实践活动",
						time: "2020-05-15",
						place: "北京",
						job: "志愿者",
						keywords: "服务,实践"
					},
					{
						state: "开展中",
						title: "5月5日实践活动",
						time: "2020-05-5",
						place: "深圳",
						job: "志愿者",
						keywords: "支教,教育"
					},
					{
						state: "开展中",
						title: "5月5日实践活动",
						time: "2020-05-5",
						place: "深圳",
						job: "志愿者",
						keywords: "支教,教育"
					},
					{
						state: "开展中",
						title: "5月5日实践活动",
						time: "2020-05-5",
						place: "深圳",
						job: "志愿者",
						keywords: "支教,教育"
					}
				],
				// 数据墙部分-柱状图
				// xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], //横坐标
      			// yData: [23, 24, 18, 25, 27, 28, 25], //人数数据
      			// taskDate: [10, 11, 9, 17, 14, 13, 14],
      			// myChartStyle: { float: "left", width: "100%", height: "400px" } //图表样式
			}
		},
		// mounted() {
    	// 	this.initEcharts();
  		// },

		computed: {
			...mapState(['hasLogin', 'forcedLogin'])
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
			uni.$off('findIndexHouseList');
		},
		onShow(){
			// 检测升级
			// this.checkUpdate();
			// 流量统计
			// this.appSysFlowInfo()

			// uni.request({
			// 	url: this.$url + '/__api.php',
			// 	method: 'GET',
			// 	data: {
			// 		'a': 'list-card',
			// 		token: this.$userinfo.token
			// 	},
			// 	success: res => {
			// 		this.list = res.data.list;
			// 		this.net_error = false;
			// 	},
			// 	fail: res => {
			// 		this.net_error = true;
			// 	},
			// 	complete: () => {
			// 	}
			// })
			console.log(typeof this.$url)
			console.log(this.$url.BASE_URL + '/m1/4142061-3780993-default/schoolteam/getRecommend')
			uni.request({
				url: this.$url.BASE_URL + '/schoolteam/getRecommend',
				// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
				// header:{
				// 	Authorization:uni.getStorageSync("token")
				// },	 //感觉这个功能可以不检查权限？				
				method: 'GET',
				data: {
					province: '1',
					// token: this.$userinfo.token
				},
				success: res => {
					console.log(res)
					this.acList = res.data.data.acti_list;
					this.acList[0].keywords = "服务,实践"
					console.log(this.acList)
					this.net_error = false;
				},
				fail: res => {
					this.net_error = true;
				},
				complete: () => {
				}
			})
		},
		onPageScroll(e) {
		    this.scrollTop = e.scrollTop;
		},
		// onReachBottom() {
		//     this.loadStatus = 'loading';
		//     // 获取数据
		// 	this.findHouseList()
		// },
		// 下拉刷新
		// onPullDownRefresh() {
		// 	// 获取数据
		// 	this.findHouseList(1);
		// 	// 关闭刷新
		// 	uni.stopPullDownRefresh();
		// },
		methods: {
			// 初始化柱状图
			// initEcharts() {
      		// 	// 多列柱状图
      		// 	const mulColumnZZTData = {
      		// 	  xAxis: {
      		// 	    data: this.xData
      		// 	  },
      		// 	  // 图例
      		// 	  legend: {
      		// 	    data: ["人数", "任务数"],
      		// 	    top: "0%"
      		// 	  },
      		// 	  yAxis: {},
      		// 	  series: [
      		// 	    {
      		// 	      type: "bar", //形状为柱状图
      		// 	      data: this.yData,
      		// 	      name: "人数", // legend属性
      		// 	      label: {
      		// 	        // 柱状图上方文本标签，默认展示数值信息
      		// 	        show: true,
      		// 	        position: "top"
      		// 	      }
      		// 	    },
      		// 	    {
      		// 	      type: "bar", //形状为柱状图
      		// 	      data: this.taskDate,
      		// 	      name: "任务数", // legend属性
      		// 	      label: {
      		// 	        // 柱状图上方文本标签，默认展示数值信息
      		// 	        show: true,
      		// 	        position: "top"
      		// 	      }
      		// 	    }
      		// 	  ]
      		// 	};
			// 	const myChart = echarts.init(document.getElementById("mychart"));
    		//   	myChart.setOption(mulColumnZZTData);
    		//   	//随着屏幕大小调节图表
    		//   	window.addEventListener("resize", () => {
    		//   	  myChart.resize();
    		//   	});
    		// },
			handleAuthentication(){
				this.$u.route({
					url: 'pages/school/index/verify',
				  })
			},
			location(){
				  this.$u.route({
					url: 'pages/location/location',
				  })
			},
			search(){
				this.$u.route({
					url: 'pages/search/search',
				})
			},
			notice(){
				this.$u.route({
					url: 'pages/notice/notice'
				})
			},
			// findHouseList(type = 0) {
			// 	if(type == 1){
			// 		this.pageNum = 1
			// 		this.flowList = []
			// 		this.$refs.uWaterfall.clear();
			// 	}
			// 	let url = "/api/houseApi/findHouseRoomList";
			// 	// this.$u.get(url, {
			// 	// 	pageNum: this.pageNum,
			// 	// 	pageSize: this.pageSize,
			// 	// 	orderByColumn: 'update_time,create_time',
			// 	// 	isAsc: 'desc'
			// 	// }).then(result => {
			// 	// 	const data = result.rows;
			// 	// 	if(this.pageNum>1 && data.length < this.pageSize){
			// 	// 		return this.loadStatus = 'nomore';
			// 	// 	}
			// 	// 	this.houseList = data;
			// 	// 	for (let i = 0; i < this.houseList.length; i++) {
			// 	// 	    // 先转成字符串再转成对象，避免数组对象引用导致数据混乱
			// 	// 	    let item = this.houseList[i]
			// 	// 		item.image = item.faceUrl
			// 	// 		if(item.type == 0){
			// 	// 			item.type = '整租'
			// 	// 		}else if(item.type == 1){
			// 	// 			item.type = '合租'
			// 	// 		}
			// 	// 		if(item.roomType == 1){
			// 	// 			item.roomType = '主卧'
			// 	// 		}else if(item.roomType == 2){
			// 	// 			item.roomType = '次卧'
			// 	// 		}else{
			// 	// 			item.roomType = '未知'
			// 	// 		}
						
			// 	// 		if(this.$u.test.isEmpty(item.houseNum)){
			// 	// 			item.houseNum = ''
			// 	// 		}
			// 	// 		if(this.$u.test.isEmpty(item.houseHall)){
			// 	// 			item.houseHall = ''
			// 	// 		}
			// 	// 		if(this.$u.test.isEmpty(item.toiletNum)){
			// 	// 			item.toiletNum = ''
			// 	// 		}
			// 	// 		if(this.$u.test.isEmpty(item.floor)){
			// 	// 			item.floor = ''
			// 	// 		}else{
			// 	// 			item.floor = item.floor + '层'
			// 	// 		}
			// 	// 	    this.flowList.push(item);
			// 	// 	}
			// 	// 	++ this.pageNum 
			// 	// 	this.loadStatus = 'loadmore';
			// 	// });
			// },
			checkUpdate(){
				uni.getSystemInfo({
					success:(res) => {
						//检测当前平台，如果是安卓则启动安卓更新  
						if(res.platform=="android"){  
							console.log('is android');
						}
					}  
				})
			},
			clickSearch() {
			    this.$u.route('/pages/school/search/search');
			},
			clickImage(houseId) {
				this.$u.route({
					url: '/pages/school/detail/detail',
					params: {
						houseId: houseId
					}
				})
			},
			clickNav(type){
				if(type === "1"){
					// this.$u.route('/pages/search/searchList');
					this.$u.route('/pages/committee/searchSchool/searchSchool');
				}
				if(type === "2"){
					// 判断Token是否有效   这个逻辑最后再来加
					// let lifeData = uni.getStorageSync('lifeData');
					// let token = lifeData.vuex_token
					// if(!token){
					// 	// 没有token 则跳转到登录
					// 	return uni.reLaunch({
					// 		url:'../login/login'
					// 	})
					// }else{
					// 	this.$u.route('/pages/detail/preHouse');
					// }
					this.$u.route('/pages/committee/searchActivity/searchActivity');
				}
			},
			code(){
				this.$mytip.toast('请咨询作者')
			},
			appSysFlowInfo(){
				let url = "web/appSysFlowInfo";
				this.$u.post(url,{
					uvCode:this.uvCode,
				}).then(code => {
					this.uvCode = code
				});
			},
			server(){
				// window.open('https://sourcebyte.cn')
			},
			//点击加载更多活动
			torec(){
				this.$u.route({
					url: 'pages/school/search/recommend',
				  })
			},
			//前往详情页
			todetail(){
				this.$u.route({
					url: 'pages/school/details/details',
				  })
			}
		}
	}
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
	
	.search{
		width: 54px;
		height: 44px;
		
		&:active{
			background-color: $u-bg-color;
		}
	}
	
	.rowClass{
		border-radius: 8px;
		background-color: rgb(255, 255, 255);
		margin-top: 10rpx;
	}
	
	.hoverClass{
		background-color: #E4E7ED;
	}
	
	.tabName{
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
			background: #FFF;
			text-align: center;
			line-height: 60px;
			border-radius: 100%;
			-webkit-box-shadow: 0px 1px 20px 0px rgba(0,0,0,0.1),inset 0px -1px 0px 0px rgba(0,0,0,0.1);
			box-shadow: 0px 1px 20px 0px rgba(0,0,0,0.1),inset 0px -1px 0px 0px rgba(0,0,0,0.1);
		}
	}

	.margin-left-sm{
		margin-left: 87rpx;
	}

	.cu-btn{
		border-radius: 15px;
    	background-color: rgba(255, 255, 255, 0.3);
    	backdrop-filter: blur(10px);
	}

	//活动推荐列表
	.cu-item .shadow{
	margin: 0;
	margin-top: 10rpx;
	}

	.cu-bar .action:first-child{
	margin-left: 24rpx;
	}

	//tag
	.wordcont{
	margin-top: 10rpx;
	}
	.wordcont .ackeywords {
		display: inline-block;
	margin-right: 10rpx; /* 可以调整标签之间的水平间距 */
	}

// 活动推荐列表
.board{
	border-radius: 10px;
	background-color: #37c4568f
}

// 活动推荐标题
.action{
	background-color: transparent;
}
.text-xl text-bold{
	font-size: 52rpx;
	font-weight: 600;
	font-family: 'pangmen';
	font-style: italic;
}
// 轮播图样式
.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
	}
.swiper {
		height: 400rpx;
	}
.swiper-item {
	display: block;
	height: 400rpx;
	line-height: 300rpx;
	text-align: center;
}
</style>