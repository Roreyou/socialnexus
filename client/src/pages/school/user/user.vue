<!-- 高校-我的 -->
<template>
	<view class="content back1">
		<view class="cu-list menu-avatar shadow usercard">
			<view class="user-section">
				<image :src="userInfo.avatar" class="cu-avatar xl round" style="margin-top: -26px;align-items: center; "></image>
				<view class="text-balck text-xl" style="font-weight: bold;">{{userName}}</view>
				<!-- <view class="text-balck text-xl" style="font-size: 30rpx;">高校队伍</view> -->
				<view class="cu-btn bg-blue margin-left-sm" style="font-family: pmkaiti; border:0.5rpx solid white;" v-if="true">{{ identity }}</view>
				<view class="text-balck comment-container">
					<navigator class="" hover-class="none" :url="list1[0].url" style="align-items: flex-start;    margin-right: 74rpx; ">
						<img class="commIcon" style="margin-right: 6rpx;" :src="list1[0].iconUrl" alt="Avatar">
						<text class="text-grey" style="font-size: 13px;">我的评价</text>
					</navigator>
					<view> </view>
					<navigator class="" hover-class="none" :url="list1[1].url" style="align-items: flex-start;" >
						<img class="commIcon" style="margin-right: 6rpx;" :src="list1[1].iconUrl" alt="Avatar">
						<text class="text-grey" style="font-size: 13px;" >收到的评价</text>
					</navigator>
				</view>
			</view>
		</view>
		<view class="cu-list menu back2" style="margin-top: -36rpx;">
				<view class="cu-item arrow " v-for="(item,index) in list2" :key="index" 
				style="background-color: white;border-radius: 30rpx; margin-left: 40rpx; margin-right: 40rpx; margin-bottom: 20rpx;box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); ">
					<navigator class="below-container" hover-class="none" :url="item.url">
						<!-- <text :class="item.icon"></text> -->
						<img class="smallIcon" :src="item.iconUrl" alt="Avatar">
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
		identity:'队长',
				menuArrow: true,
				userinfo: {},
				index: 0,
				avatar: "../../../static/logo.png",
				list1: [
					{
						icon: 'cuIcon-lock text-red',
						text: '我的评价',
						url: '../../../page_school/pages/user/mycomment',
						iconUrl: 'http://scu5azomr.hn-bkt.clouddn.com/static/bg_img/9.png',
					},
					{
						icon: 'cuIcon-attention text-green',
						text: '收到评价',
						url: '../../../page_school/pages/user/becomment',
						iconUrl: 'http://scu5azomr.hn-bkt.clouddn.com/static/bg_img/8.png',
					}
				],
				list2: [
					{
						icon: 'cuIcon-usefull text-cyan',
						text: '修改密码',
						url: '../../../page_school/pages/user/password',
						iconUrl: 'http://scu5azomr.hn-bkt.clouddn.com/static/bg_img/10.png'
					},
					{
						icon: 'cuIcon-usefull text-cyan',
						text: '队伍资料',
						url: '../../../page_school/pages/user/teaminfo',
						iconUrl: 'http://scu5azomr.hn-bkt.clouddn.com/static/bg_img/6.png'
					},
					{
						icon: 'cuIcon-usefull text-cyan',
						text: '活动收藏',
						url: '../../../page_school/pages/user/like',
						iconUrl: 'http://scu5azomr.hn-bkt.clouddn.com/static/bg_img/7.png'
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
				uni.reLaunch({
						url: '../../login/login',
				});
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
		},
		mounted(){
			if(!this.userInfo.isUser){
				const _this = this;
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
	background-color: white ;
	margin-left: 20rpx;
	margin-right: 20rpx;
	background-attachment: fixed;
}
.back1{
	background-image: url(http://scu5azomr.hn-bkt.clouddn.com/static/bg_img/33.png);
	border-radius: 30rpx;
	background-size: 100% 47%;
}
.user-section {
	/* display: flex; */
    align-items: center;
    background-color: #ffffffcf;
    border-radius: 30rpx;
  	justify-content: center;
	display: flex;
    flex-direction: column;
	width: 500rpx;
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
	box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);	
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
.back2{
	background-color: #f5ededdb;
	border-radius: 30rpx;
	padding-top: 22rpx;
}
.smallIcon {
	width: 90rpx;
    height: 90rpx;
    border-radius: 50%;
    margin-right: 44rpx;
}
.commIcon {
	width: 50rpx;
    height: 50rpx;
    border-radius: 50%;
	margin-bottom: -10rpx;
}
.usercard{
	display: flex;
    justify-content: center;
    align-items: center;
    /* height: 300rpx; */
    /* width: 500rpx; */
    /* margin: 0rpx 100rpx 0rpx 100rpx; */
    padding: 108rpx 0rpx 108rpx 0rpx;
}
.comment-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}
.text-xl{
	font-size: 36rpx;
    text-align: center;
	margin-bottom: 5rpx;
}
.below-container{
	display: flex;
    align-items: center;
    padding: 30rpx;
    /* background-color: rgba(255, 255, 255, 0.5); */
    border-radius: 30rpx;
    cursor: pointer;
    /* margin-bottom: 18rpx; */
}

/* 身份标签 */
.cu-btn{
		border-radius: 15px;
    	background-color: rgba(255, 255, 255, 0.3);
    	backdrop-filter: blur(10px);

		font-family: pmkaiti;
		border: 1.0px solid red;
		color: red;
		margin-left: 0;
		line-height: 1.2;
		font-size: 25rpx;
		height: 50rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx
	}
</style>
