<!-- 高校-我的 -->
<template>
	<view class="content">
		<view class="cu-list menu-avatar bg-gradual-green padding-lg">
			<view class="user-section">
				<image :src="avatar" class="cu-avatar xl round"></image>
				<view class="text-white text-xl padding">用户名: {{userName}}<br>身份：高校队伍</view>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item arrow" v-for="(item,index) in list" :key="index">
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
				avatar: "../../static/logo.png",
				list: [
					{
						icon: 'cuIcon-usefull text-cyan',
						text: '修改密码',
						url: '/pages/user/password',
					},
					{
						icon: 'cuIcon-lock text-red',
						text: '我的评价',
						url: '/pages/user/mycomment',
					},
					{
						icon: 'cuIcon-attention text-green',
						text: '收到评价',
						url: '/pages/user/becomment',
					},
					{
						icon: 'cuIcon-question text-pink',
						text: '队伍信息管理',
						url: '/pages/user/teaminfomana',
					},
					{
						icon: 'cuIcon-usefull text-cyan',
						text: '队伍资料',
						url: '/pages/user/teaminfo',
					},
					{
						icon: 'cuIcon-usefull text-cyan',
						text: '所属高校',
						url: '/pages/user/school',
					},
					{
						icon: 'cuIcon-usefull text-cyan',
						text: '活动收藏',
						url: '/pages/user/like',
					},
				]
			};
    },
		computed: {
			...mapState(['hasLogin', 'forcedLogin','userName'])
		},
		methods: {
			...mapMutations(['logout']),
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			bindLogout() {
				this.logout();
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../login/login',
					});
				}
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
		}
	}
</script>

<style>
	.user-section {
		display: flex;
		align-items: center;
	}

</style>
