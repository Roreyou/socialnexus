<!-- 高校-我的 -->
<template>
	<view class="content">
		<view class="cu-list menu-avatar bg-gradual-green padding-lg shadow">
			<view class="user-section">
				<image :src="userInfo.avatar" class="cu-avatar xl round"></image>
				<view class="text-white text-xl padding">用户名: {{userName}}<br>身份：高校队伍</view>
			</view>
		</view>
		<view class="cu-list menu" style="margin-top: 0rpx;">
			<!-- 评价 -->
				<view class="custom-container">
					<!-- <hr class="horizontal-line"> -->
					<view class="title" style="text-align: left;">
						<!-- <uni-icons type="email" color="gray" size="20" style="vertical-align: middle;"></uni-icons> -->
						<!-- <text style="margin-left: 20rpx;">评价</text> -->
					</view>
				</view>
				<!-- <view class="cu-item arrow com_item" v-for="(item,index) in list1" :key="index">
					<navigator class="content" hover-class="none" :url="item.url">

						
						<text class="text-grey">{{item.text}}</text>
					</navigator>
				</view> -->
			<view class="cu-item com_item">
				<view class="navigator-wrapper">
					<navigator class="wrapper-content" hover-class="none" :url="list1[0].url">
						<text class="text-grey com">{{list1[0].text}}</text>
						<text class="text-grey down-text">我对活动的评价</text>
					</navigator>
				</view>
				<view class="navigator-wrapper">
					<navigator class="wrapper-content" hover-class="none" :url="list1[1].url">
						<text class="text-grey com">{{list1[1].text}}</text>
						<text class="text-grey down-text">社区基层对我的评价</text>
					</navigator>
				</view>
			</view>
			<!-- 队伍信息管理 -->
				<view class="custom-container">
					<!-- <hr class="horizontal-line"> -->
					<view class="title" style="text-align: center;">
						<!-- <uni-icons type="map-pin-ellipse" color="gray" size="20" style="vertical-align: middle;"></uni-icons> -->
						<!-- <text style="margin-left: 20rpx;">队伍信息管理</text> -->
					</view>
				</view>
				<view class="cu-item arrow" v-for="(item,index) in list2" :key="index">
					<navigator class="content" hover-class="none" :url="item.url">
						<!-- <text :class="item.icon"></text> -->
						<text class="text-grey">{{item.text}}</text>
					</navigator>
				</view>
			<view class="padding flex flex-direction margin-bottom-xl">
				<button class="cu-btn line-red margin-tb-sm lg" @click="bindLogout">退出登陆</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
    data() {
      return {
				menuArrow: true,
				userinfo: {},
				index: 0,
				avatar: "../../../static/logo.png",
				list1: [
					{
						icon: 'cuIcon-lock text-red',
						text: '我的评价',
						url: '/pages/school/user/mycomment',
					},
					{
						icon: 'cuIcon-attention text-green',
						text: '收到评价',
						url: '/pages/school/user/becomment',
					}
				],
				list2: [
					{
						icon: 'cuIcon-usefull text-cyan',
						text: '修改密码',
						url: '/pages/school/user/password',
					},
					{
						icon: 'cuIcon-usefull text-cyan',
						text: '队伍资料',
						url: '/pages/school/user/teaminfo',
					},
					{
						icon: 'cuIcon-usefull text-cyan',
						text: '活动收藏',
						url: '/pages/school/user/like',
					},
				]
			};
    },
		computed: {
			...mapState(['hasLogin', 'forcedLogin','userName','user_id','userInfo'])
		},
		methods: {
			...mapMutations(['logout']),
			bindLogin() {
				uni.navigateTo({
					// url: '../../login/login',
					url:'../../../pages/login/login'
				});
			},
			bindLogout() {
				this.logout();
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../../login/login',
					});
				}
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
		},
		mounted(){
			if(!this.userInfo.isUser){
				const _this = this;
				// uni.showModal({
				// 		title: '',
				// 		content: '请登录后查看。是否前去登录？',
				// 		success: function(res) {
				// 		if (res.confirm) {
				// 			// 用户点击了确定
				// 			// console.log('用户点击了确定');
				// 			_this.$u.route({
				// 				url: 'pages/login/login',
				// 			})
				// 			// 在这里可以编写用户点击确定后的逻辑
				// 		} else if (res.cancel) {
				// 			// 用户点击了取消
				// 			// console.log('用户点击了取消');
				// 			wx.switchTab({
				// 				url: '/pages/tabbar-page/tabbar-page'
				// 			})
				// 		}
				// 		}
				// 	});
				wx.redirectTo({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style>
/* 整个页面 */
.content{
	background-color: white;
}
	.user-section {
		display: flex;
		align-items: center;
	}

	/* 灰线 */
	.custom-container {
	text-align: center; 
	margin: 25rpx 25rpx;
	}
	.horizontal-line {
	border: none; /* 移除默认的边框样式 */
	border-top: 1px solid #ccc; /* 设置上边框为 1px 灰色实线 */
	width: 100%; /* 设置水平线的宽度为容器的宽度 */
	}

	.title {
		font-size: 39rpx;
		font-weight: bold;
		margin-top: 10rpx;
		color: gray;
	}

	/* 顶部卡片 */
	/* .shadow{		
		background-color: rgba(255, 255, 255, 0.35);
		backdrop-filter: blur(13.5px);
		-webkit-backdrop-filter: blur(13.5px);
		border: 0.8px solid rgba(255, 255, 255, 0.18);
		box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
		-webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
		border-radius: 18px;
		-webkit-border-radius: 18px;
		color: rgb(255, 255, 255);
	} */

	/* 评价模块 */
	.navigator-wrapper {
  width: 40%; /* 设置每个正方形的宽度 */
  padding-bottom: 30%; /* 设置高度为宽度的 1:1 比例，使其成为正方形 */
  margin: 5%; /* 设置间距 */
  position: relative;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  background-color: #eaecef;
	border-radius: 10px;
	box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);	
}
.navigator-wrapper .wrapper-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  display: flex;
    flex-direction: column;
}

.text-grey{
  text-align: center; /* 水平居中 */
}

.com {
	font-weight: 600;
    font-size: medium;
	color:black;
	margin-top: 25rpx;
	margin-bottom: 30rpx;
}

.down-text{
	margin-bottom: 25rpx;
}
</style>
