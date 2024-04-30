<!-- 高校-我的 -->
<template>
	<view class="content">
		<view class="cu-list menu-avatar bg-gradual-green padding-lg">
			<view class="user-section">
				<image :src="userInfo.avatar" class="cu-avatar xl round"></image>
				<view class="text-white text-xl padding">用户名: {{userName}}<br>身份：高校队伍</view>
			</view>
		</view>
		<view class="cu-list menu" style="margin-top: 0rpx;">
			<!-- 评价 -->
			<!-- <view class="pingjia"> -->
			<view class="custom-container">
    			<!-- <hr class="horizontal-line"> -->
				<view class="title" style="text-align: left;">
					<!-- <uni-icons type="email" color="gray" size="20" style="vertical-align: middle;"></uni-icons> -->
					<text style="margin-left: 20rpx;">评价</text>
				</view>
  			</view>
			<view class="cu-item arrow" v-for="(item,index) in list1" :key="index">
				<navigator class="content" hover-class="none" :url="item.url">
					<!-- <text :class="item.icon"></text> -->
					
					<text class="text-grey">{{item.text}}</text>
				</navigator>
			</view>
			<!-- </view> -->
			<!-- 队伍信息管理 -->
			<view class="custom-container">
    			<!-- <hr class="horizontal-line"> -->
				<view class="title" style="text-align: left;">
					<!-- <uni-icons type="map-pin-ellipse" color="gray" size="20" style="vertical-align: middle;"></uni-icons> -->
					<text style="margin-left: 20rpx;">队伍信息管理</text>
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
				this.$u.toast(`请先登录！`);
				this.bindLogin()
			}
		}
	}
</script>

<style>
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

</style>
