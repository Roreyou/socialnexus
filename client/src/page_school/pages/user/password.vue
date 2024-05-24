<!-- 高校 - 修改密码 -->
<template>
	<view class="page">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">原密码：</text>
				<m-input type="password"  v-model="curpassword" placeholder="请输入原密码"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">新密码：</text>
				<m-input type="password"  v-model="newpassword1" placeholder="请输入新密码"></m-input>
			</view>
			<view class="input-row">
				<text class="title">确认密码：</text>
				<m-input type="password"  v-model="newpassword2" placeholder="请输入确认密码" :class="{ 'error': error_flag }"></m-input>
			</view>
			<view v-if="error_flag" class="error-message">
				密码不一致！
			</view>
		</view>
		<view class="btn-row">
			<button class="cu-btn block lg bg-green" @tap="doChange">提交</button>
		</view>
	</view>
</template>

<script>
		import {
		mapState,
	} from 'vuex'
	import mInput from '../../../components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				error_flag:false,
				curpassword: '',
				newpassword1: '',
				newpassword2: ''
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin','user_id','userInfo'])
		},
		watch: {
			newpassword2(newValue, oldValue) {
				this.error_flag = false;
			}
		},
		methods: {
			clearInputs() {
			this.curpassword = '';
			this.newpassword1 = '';
			this.newpassword2 = '';
			this.error_flag = false; // 清空输入框的同时将错误标志重置为false
			},
			doChange() {
				if(this.newpassword1 != this.newpassword2){
					this.error_flag = true;
					return
				}
				console.log("this.userInfo.identity:", this.userInfo.identity)
				uni.request({
						url: this.$url.BASE_URL + '/schoolteam/modifypwd',
						header:{
							Authorization:uni.getStorageSync("token")
						},
						method: 'POST',
						data: {
							user_id: this.userInfo.person_id,
							identity: this.userInfo.identity,
							old_pwd:  this.curpassword,
							new_pwd:  this.newpassword1,
						},
						success: res => {
							if(res.data.code==200){
									this.$u.toast(`成功修改密码`);
									this.clearInputs()
							}else if(res.data.code == 401){
										console.log("token过期");
										uni.showModal({
										title: '',
										content: '登录已过期。是否前去登录？',
										success: function(res) {
										if (res.confirm) {
											// 用户点击了确定
											uni.reLaunch({
												url: '../../../pages/login/login',
											})
										} else if (res.cancel) {
											uni.navigateBack()
											return;							
										}
										}
									});
									}
							else{
								this.$u.toast(`原密码错误`);
							}
						},
						fail: res => {
							this.net_error = true;
						},
						complete: () => {
						}
					})
			},
		},
	}
</script>

<style>
	/* 头条小程序需要把 iconfont 样式放到组件外 */
	@import "../../../components/m-icon/m-icon";

	/*每个页面公共css */
	page {
		min-height: 100vh;
		display: flex;
		font-size: 30px;
	}


	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		/* min-height: 100%; */
		display: flex;
		flex: 1;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		width: 100%;
		padding: 10px;
	}

	.input-group {
		position: relative;
		width: 750rpx;
		margin-top: 40px;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
		font-size: 16px;
		line-height: 40px;
	}

	.input-row .title {
		width: 115px;
		padding-left: 15px;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 8px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 25px;
		padding: 10px;
	}

	button.primary {
		background-color: #0faeff;
	}

	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 10px;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	/* 错误提示 */
	.error {
	border: 1px solid red; /* 设置红色边框 */
	}

	.error-message {
	color: red; /* 设置红色文字 */
	margin-top: 5px; /* 设置上边距 */
	margin-left: 270rpx;
    font-size: 30rpx;
    margin-top: 15rpx;
	}
</style>
