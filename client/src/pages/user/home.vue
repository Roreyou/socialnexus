<template>
	<view>
		<cu-custom :isBack="false" bgColor="title-color">
			<block slot="backText">返回</block>
			<block slot="content">个人中心</block>
		</cu-custom>
		<view class="cu-list menu-avatar bg-gradual-green padding-lg">
			<view class="user-section">
				<image :src="'../../static/'+this.$folder+'/avatar.png'" class="cu-avatar xl round"></image>
				<view class="text-white text-xl padding">用户名: {{$userinfo.username}}<br>等级: 普通会员</view>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item arrow" v-for="(item,index) in list" :key="index">
				<navigator class="content" hover-class="none" :url="item.url">
					<text :class="item.icon"></text>
					<text class="text-grey">{{item.text}}</text>
				</navigator>
			</view>

			<navigator class="content" hover-class="none" url="/pages/public/logout">
				<view class="padding flex flex-direction margin-bottom-xl">
					<button class="cu-btn line-red margin-tb-sm lg">退出登陆</button>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuArrow: true,
				userinfo: {},
				index: 0,
				avatar: "../../static/" + this.$folder + "/avatar.jpg",
				picker: ['简体中文', '繁体中文', 'English', '越南语'],
				list: [{
						icon: 'cuIcon-lock text-red',
						text: '更改登陆密码',
						url: '/pages/user/password',
					},
					{
						icon: 'cuIcon-attention text-green',
						text: '更改二级密码',
						url: '/pages/user/password2',
					},
					{
						icon: 'cuIcon-form text-blue',
						text: '我的银行卡',
						url: '/pages/user/bankcard',
					},
					// {
					// 	icon: 'cuIcon-form text-blue',
					// 	text: '实名认证',
					// 	url: '/pages/user/verify',
					// },
					{
						icon: 'cuIcon-form text-blue',
						text: '问题反馈',
						url: '/pages/user/feedback',
					},
					{
						icon: 'cuIcon-question text-pink',
						text: '公告',
						url: '/pages/user/news',
					},
					{
						icon: 'cuIcon-usefull text-cyan',
						text: '关于',
						url: '/pages/user/about',
					},
				]
			};
		},
		onShow() {
			this.$userinfo = JSON.parse(uni.getStorageSync("userinfo"))
			//console.log("L",this.$userinfo)
		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value
			},
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}

	.user-section {
		display: flex;
		align-items: center;
	}
	.menu {
		margin-top: 40px;
	}
</style>
