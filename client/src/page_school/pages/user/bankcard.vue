<template>
	<view class="page">
		<cu-custom :isBack="true" bgColor="title-color">
			<block slot="backText">返回</block>
			<block slot="content">添加银行卡</block>
		</cu-custom>
			<view class="cu-item" v-for="(item,index) in list" :key="index">
				<view v-if="item.bank=='微信支付' || item.bank=='支付宝支付'" class="bank">
					<image class="img1" :src="item.img_url"></image>
					<text class="desc">账户名称: {{item.name}}<br>账号: {{item.account}}<br>账户类型: {{item.bank}}</text>
					<text class="status1"></text>
					<switch class="status1" :class="item.status=='1'?'checked':''" :checked="item.status=='1'?true:false" @change="SwitchB"></switch>
				</view>
				<view v-else class="bank">
					<image class="img2" :src="item.img_url"></image>
					<text class="desc">账户名称: {{item.name}}<br>账号: {{item.account}}<br>账户类型: {{item.bank}}<br>支行名称: {{item.brunch}}</text>
					<text class="status2"></text>
					<switch class="status2" :class="item.status=='1'?'checked':''" :checked="item.status=='1'?true:false" @change="SwitchB"></switch>
 				</view>
			</view>

		<view class="input-group padding-lr">
			<view class="desc">
			为确保能一次性通过审核，请按照以下几点上传				
			</view>
			<view class="desc">
			1. 所有收款方式的实名信息必须和要提交实名认证的名字一致				
			</view>
			<view class="desc">
			2. 支付宝账号一定要确保输入账号能进行付款操作，不要关闭支付宝应用中的 “通过邮箱找到我” 或者 “通过手机号找到我” 的功能。			
			</view>
			<view class="desc">
			3. 微信不要关闭 “通过手机添加好友” 的功能。				
			</view>
			<view class="desc text-green">
			4. 至少要上传支付宝，微信，银行卡，三种收款方式。				
			</view>
			<view class="desc text-red">
			*** 请认真填写并上传收款方式，一旦通过审核，不得再修改 ***			
			</view>
			
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="doChange">添加</button>
		</view>
	</view>
</template>

<script>
	import mInput from '../../../components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				list: {},
				switchB: false,
			}
		},
		onShow() {
			this.$userinfo = JSON.parse(uni.getStorageSync("userinfo"))
			uni.request({
				url: this.$url + '/__api.php',
				method: 'GET',
				data: {
					'a': 'list-card',
					token: this.$userinfo.token
				},
				success: res => {
					this.list = res.data.list;
					this.net_error = false;
				},
				fail: res => {
					this.net_error = true;
				},
				complete: () => {
				}
			})
		},
		methods: {
			SwitchB(e) {
				this.switchB = e.detail.value
			},
			doChange() {
				uni.redirectTo({
					url: "/pages/user/bankcard2"
				})
			}		
		}
	}
</script>

<style lang="scss">
	/* 头条小程序需要把 iconfont 样式放到组件外 */
	@import "../../components/m-icon/m-icon.css";

	/*每个页面公共css */
	page {
		min-height: 100vh;
		display: flex;
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
		font-size: 14px;
	}
	.desc {
		margin-bottom: 8px;
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
		width: 90px;
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
	
	.bank {
		//font-size: 14px;
	}
	.cu-item {
		border-bottom: 0.1px solid $uni-gray-4;
		padding: 7px 0px;
		display: flex;
		font-size: 13px;
	
		.img1 {
			display: block;
			float: left;
			text-align: right;
			margin: 15px 0px 0px 15px;
			width: 40px;
			height: 40px;
		}
		
		.img2 {
			display: block;
			float: left;
			text-align: right;
			margin: 20px 0px 0px 15px;
			width: 40px;
			height: 30px;
		}
	

		.desc {
			display: block;
			float: left;
			margin-left:15px;
			width: 180px;
		}
	
		.status1 {
			display: block;
			float: left;
			text-align: right;
			margin-top:25px;
			color: $uni-red-7;
			width: 55px;
			padding-left: 0px;
		}
		.status2 {
			display: block;
			float: left;
			text-align: right;
			margin-top:30px;
			color: $uni-red-7;
			width: 55px;
			padding-left: 0px;
		}
		.slider {
			display: block;
			float: left;
			text-align: right;
			color: $uni-red-7;
			width: 55px;
			padding-left: 0px;
		}
	
	}
	
</style>
