<template>
	<view class="content">
    <image class="banner" src="../../static/logo.png"></image>
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账号：</text>
				<m-input type="text" focus clearable v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">手机号：</text>
				<m-input type="text" focus clearable v-model="phone" placeholder="请输入手机号码"></m-input>
				<button class="cty cu-btn bg-green">+86</button><button class="cty cu-btn line-green">大陆号码</button>
			</view>
			<view class="input-row border">
				<text class="title">验证码：</text>
				<m-input type="text" focus clearable v-model="verification" placeholder="短信验证码"></m-input>
				<button class="sms cu-btn bg-green">获取验证码</button>
			</view>
			<view class="input-row border">
				<text class="title">邮箱：</text>
				<m-input type="text" clearable v-model="email" placeholder="请输入邮箱"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">确认密码：</text>
				<m-input type="password" displayable v-model="confirm" placeholder="确认密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button class="cu-btn bg-green block lg" @tap="register">注册</button>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';

	export default {
		components: {
			mInput
		},
		data() {
			return {
				account: '',
				password: '',
				email: '',
				phone: '',
				verification: '',
				confirm: ''
			}
		},
		methods: {
			register() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */

				 /*
				if (this.account.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				if (this.email.length < 3 || !~this.email.indexOf('@')) {
					uni.showToast({
						icon: 'none',
						title: '邮箱地址不合法'
					});
					return;
				}
				*/

				const data = {
					account: this.account,
					password: this.password,
					email: this.email
				}
				service.addUser(data);
				uni.showToast({
					title: '注册成功'
				});   
				// uni.navigateBack({
				// 	delta: 1
				// });
				setTimeout(function() {
					uni.navigateBack({
						delta: 1
					});
				}, 1000);  //延时解决不弹出的问题
			}
		}
	}
</script>

<style>
  .title {
    width: 90px;
  }
  .banner {
    margin: 0 auto;;
    width: 600upx;
    height: 350upx;
  }
  .sms {
    margin-top: 3px;
  }
  .cty {
    margin-top: 10px;
    padding: 5px 5px;
  }
</style>
