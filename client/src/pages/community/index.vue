<!-- 社区基层首页 -->
<template>
	<view class="u-p-l-10 u-p-r-10">
		<u-navbar :is-back="false">
			<view style="display: flex;justify-content: center;align-items: center;">
				<view class="u-p-30"  @click="location">
					杭州
					<u-icon name="arrow-down-fill" class="u-p-l-20" color="#515356"></u-icon>
				</view>
			</view>
		</u-navbar>
		<!-- 轮播图 -->
		<!-- <view>
			<u-swiper :list="swiperList" height="400"></u-swiper>
		</view>	 -->  
		<view class="cu-list menu-avatar bg-gradual-green padding-lg">
			<view class="user-section">
				<image :src="avatar" class="cu-avatar xl round"></image>
				<view class="text-white text-xl padding">社区基层: {{userName}}</view>
				<view class="cu-btn bg-blue margin-left-sm" @click="handleAuthentication">编辑信息</view>
			</view>
		</view>
		<view> 
			<view class="rowClass">
				<u-row>
					<u-col span="4" text-align="center" v-for="(item,index) in navList" :key="index">
						<view class="u-padding-20" @tap="clickNav(item.type)" hover-class="hoverClass">
							<image :src="item.src" style="width: 90rpx;height: 90rpx;" mode="widthFix"></image>
							<view class="tabName">{{item.name}}</view>
						</view>
					</u-col>
				</u-row>
			</view>
			<u-gap height="10"></u-gap>
			<u-gap height="5"></u-gap>
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
		<view>
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>
					<text class="text-xl text-bold">正在招募</text>
				</view>
			</view>
			<view>
				<view class="cu-item" v-for="(item,index) in acList" :key="index">
					<view class="cu-card article" :class="isCard?'no-card':''" @click="todetail(item.id, 'recruiting')" >
							<view class="cu-item shadow">
								<view class="title"><view class="text-cut">{{item.title}}</view></view>
								<view class="content">
									<view class="desc">
										<view class="text-content"> 日期: {{item.time}}</view>
										<view class="text-content"> 地点: {{item.place}}</view>
										<view class="text-content"> 岗位: {{item.job}}</view>
										
										<view class="wordcont">	
											<view class="ackeywords" v-for="(word,index) in item.keywords.split(',')" :key="index">
												<view class="cu-tag bg-red light sm round">{{word}}</view>
											</view>
										</view>
									</view>
								</view>
							</view>
					</view>
				</view>
			</view>
			<view class="re-but">
				<button @click="torec">点击加载更多推荐的活动</button>
			</view>
		</view>
		
		
		<!-- <u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="findHouseList"></u-loadmore> -->
		<u-back-top :scroll-top="scrollTop" top="1000"></u-back-top>
		<u-no-network></u-no-network>
		<view class="buttom">
			<view class="loginType">
				<view class="wechat item">
					<view class="icon"><u-icon size="60" name="server-man" color="#999" @click="server"></u-icon></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import actilist from '../../components/acti-list/acti-list.vue';

	export default {
		components: {
			actilist,

		},

		data() {
			return {
				avatar:'https://tse4-mm.cn.bing.net/th/id/OIP-C.8Zujx-NGIfUypDUetU95JwHaHv?w=153&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',

				keyword: '',
				pageNum: 1,
				pageSize: 20,
				scrollTop: 0,
				houseList: [],
				swiperList: [
					{
						image: '/static/img/index/swiper/swiper.jpg',
					    title: '身无彩凤双飞翼，心有灵犀一点通'
					},
                ],
				navList:[
				   {name:"新增活动",src:"/static/img/index/cover/index_cover1.png",type:"1"},
				   {name:"我的活动",src:"/static/img/index/cover/index_cover2.png",type:"2"},
				   {name:"队伍信息",src:"/static/img/index/cover/index_cover3.png",type:"3"},
				//    {name:"发布房源",src:"/static/img/index/cover/index_cover4.png",type:"2"}
				],
				loadStatus: 'loadmore',
				flowList: [],
				uvCode: uni.getStorageSync('uvCode'),
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
				]
			}
		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin','userName'])
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
			handleAuthentication(){
				this.$u.route({
					url: 'pages/community/communityInfo',
				  })
			},
			location(){
				  this.$u.route({
					url: 'pages/location/location',
				  })
			},
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
			    this.$u.route('/pages/search/search');
			},
			clickImage(houseId) {
				this.$u.route({
					url: '/pages/detail/detail',
					params: {
						houseId: houseId
					}
				})
			},
			clickNav(type){
				if(type === "1"){
					// this.$u.route('/pages/search/searchList');
					this.$u.route('/pages/community/addActivity');
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
					this.$u.route('/pages/community/myActivity/myActivity');
				}
				if(type === "3"){
					// this.$u.route('/pages/search/searchList');
					this.$u.route('/pages/community/myTeam/myTeam');
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
					url: 'pages/search/recommend',
				  })
			},
			todetail(activityId, mode) {
				this.$u.route({
					url: '/pages/community/activityDetail',
					params: {
						activityId: activityId,
						mode: mode
					}
				})
			},
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
</style>