<!-- 高校首页 -->
<!-- 因为是tab页所以必须放在主包 -->
<template>
	<view class="u-p-l-10 u-p-r-10">
		<u-navbar :is-back="false">
			<view style="display: flex;justify-content: center;align-items: center;">
				<!-- <view class="u-p-30"  @click="location">
					杭州
					<u-icon name="arrow-down-fill" class="u-p-l-20" color="#515356"></u-icon>
				</view>
				<u-search placeholder="搜索实践活动" v-model="keyword" input-align="center"  :show-action="false" :clearabled="true"
:disabled="true" style="width: 565rpx;" @click="search"></u-search> -->
			</view>
		</u-navbar>
		<view>
			<picker></picker>
		</view>
		<!-- 轮播图 -->
		<!-- <view>
			<u-swiper :list="swiperList" height="400"></u-swiper>
		</view>	 -->  
		<view class="cu-list menu-avatar bg-gradual-green padding-lg">
			<view class="user-section">
				<image :src="userInfo.avatar" class="cu-avatar xl round"></image>
				<view class="text-white text-xl padding">高校队伍: {{userName}}</view>
				<!-- <view class="cu-btn bg-blue margin-left-sm" @click="handleAuthentication" style="font-family: pmkaiti;">认证信息</view> -->
				<view class="cu-btn bg-blue margin-left-sm" @click="handleAuthentication" style="font-family: pmkaiti; border:0.5rpx solid white;" v-if="(userInfo.verification_status == 1 || userInfo.verification_status == 3)&&(userInfo.isleader)">认证信息</view>
				<view class="cu-btn bg-blue margin-left-sm" style="font-family: pmkaiti; border:0.5rpx solid white;" v-if="userInfo.verification_status == 2">已认证</view>
				<view class="cu-btn bg-blue margin-left-sm" style="font-family: pmkaiti; border:0.5rpx solid white;" v-if="userInfo.verification_status == 4">审核中</view>
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
			<view @click="notice">
				<u-notice-bar mode="vertical" :list="noticeList" type="primary" more-icon
				bg-color="#fff" :duration="5000" border-radius="15"></u-notice-bar>
			</view>
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
		<view class="board">
			<view class="cu-bar" style="background-color: transparent">
				<view class="action">
					<text class="text-xl text-bold" style="color: #ffffff; font-size: 52rpx; font-weight: 600; font-family: 'pangmen'; font-style: italic; background-color: transparent">活动推荐</text>
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
import picker from '../../../page_school/components/picker/picker.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import actilist from '../../../components/acti-list/acti-list.vue';

	export default {
		components: {
			actilist,
			picker
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
				noticeList: [
					'强国有我，青春有为',
					'行万里路，知中国情',
				],
				navList:[
				   {name:"我的活动",src:"http://scu5azomr.hn-bkt.clouddn.com/static/img/index/cover/index_cover1.png",type:"1"},
				   {name:"朋友圈",src:"http://scu5azomr.hn-bkt.clouddn.com/static/img/index/cover/index_cover2.png",type:"2"},
				   {name:"活动推荐",src:"http://scu5azomr.hn-bkt.clouddn.com/static/img/index/cover/index_cover3.png",type:"3"},
				//    {name:"发布房源",src:"/static/img/index/cover/index_cover4.png",type:"2"}
				],
				loadStatus: 'loadmore',
				flowList: [],
				uvCode: uni.getStorageSync('uvCode'),
				acList:[
				],
				page: 0,
				loadmore: true   //true是还没拿完 如果服务器空了就是false
			}
		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin','userName', 'userInfo'])
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
			// console.log("userInfo.verification_status,", this.userInfo)
			// console.log(typeof this.$url)
			// console.log(this.$url.BASE_URL + '/m1/4142061-3780993-default/schoolteam/getRecommend')
			// uni.request({
			// 	url: this.$url.BASE_URL + '/4142061-3780993-default/schoolteam/getRecommend',
			// 	// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
				
			// 	method: 'GET',
			// 	data: {
			// 		province: '1',
			// 		// token: this.$userinfo.token
			// 	},
			// 	success: res => {
			// 		this.acList = res.data.data.acti_list;
			// 		this.acList[0].keywords = "服务,实践"
			// 		this.net_error = false;
			// 	},
			// 	fail: res => {
			// 		this.net_error = true;
			// 	},
			// 	complete: () => {
			// 	}
			// })
			
			const data = {
				province: '1',
				page: 0
			}
			this.loadActilist(data)
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
			uni.$emit('onReachBottom');
			// console.log('index -- onReachBottom')
			++ this.page
			if(this.loadmore){
				const data = {
					province: '1',
					page: this.page
				}
				this.loadActilist(data)
			}else{
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
			loadActilist(data){  //加载活动列表
				uni.request({
				url: this.$url.BASE_URL + '/4142061-3780993-default/schoolteam/getRecommend',
				// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
				
				method: 'GET',
				data: data,
				success: res => {
					// this.acList = res.data.data.acti_list;
					if(res.data.data.acti_list.length){
						this.acList = this.acList.concat(res.data.data.acti_list)
						this.acList[0].keywords = "服务,实践"
						// this.loadmore = false
					}else{  //空了
						this.loadmore = false 
					}

					this.net_error = false;
				},
				fail: res => {
					this.net_error = true;
				},
				complete: () => {
				}
			})
			},
			handleAuthentication(){
				// this.$u.route({
				// 	url: 'pages/school/index/verify',
				//   })
				  uni.navigateTo({
					url: '/page_school/pages/index/verify',
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
					if(!this.userInfo.isUser){  //普通队员的话只需要提示，游客需要提示和询问是否登录
						uni.showModal({
						title: '',
						content: '请登录后查看。是否前去登录？',
						success: function(res) {
						if (res.confirm) {
							// 用户点击了确定
							console.log('用户点击了确定');
							uni.reLaunch({
								url: '../../login/login',   /*进入高校首页*/
							});
							// 在这里可以编写用户点击确定后的逻辑
						} else if (res.cancel) {
							// 用户点击了取消
							console.log('用户点击了取消');
							return;
							// 在这里可以编写用户点击取消后的逻辑
						}
						}
					});
					}else{
						// this.$u.route('/pages/school/search/myactivity');
						uni.navigateTo({
							url:'../../../page_school/pages/search/myactivity'
						});
					}
				}
				if(type === "2"){
					// 判断Token是否有效   这个逻辑最后再来加  在这里主页加一下就好了
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
					// this.$u.route('/pages/school/pyq/entry');
					uni.navigateTo({
						url:'../../../page_school/pages/pyq/entry'
					});
				}
				if(type === "3"){
					// this.$u.route('/pages/search/searchList');
					// this.$u.route('/pages/school/search/recommend');
					uni.navigateTo({
						url:'../../../page_school/pages/search/recommend'
					});
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
				// this.$u.route({
				// 	url: 'pages/school/search/recommend',
				//   })
				  uni.navigateTo({
					url:'../../../page_school/pages/search/recommend'
				});
			},
			//前往详情页
			todetail(){
				// this.$u.route({
				// 	url: 'pages/school/details/details',
				//   })
				  uni.navigateTo({
						url:'../../../page_school/pages/details/details'
					});  
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
		margin-left: auto;
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
	background-color: #37c4568f;
	background-image: linear-gradient(to right top, #41b851, #59c549, #72d23e, #8cdf2e, #a8eb12);
	background-image: linear-gradient(to right bottom, #6aa6fd, #85aefe, #9ab6fe, #adbeff, #bec7ff);
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
	font-size: 34rpx;
}
.more-btn{
	font-size: small;
}
</style>
