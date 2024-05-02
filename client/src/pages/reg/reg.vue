<!-- 高校队伍注册页面 -->

<template>
	<view class="content">
		<!-- 切换身份按钮 -->
		<view style="padding: 30rpx;">
			<!-- 由于应用场景可能存在边距，所有组件中没有默认设置边距，可以通过父元素来控制 -->
			<YtabBtns :data="list" :index.sync="index"></YtabBtns>
		</view>

    	<!-- <image class="banner" src="../../static/logo.png"></image> -->
		<u-upload class="banner" @on-success="handleSuccess" :custom-btn="true" max-count="4" ref="uUpload" :action="action" :file-list="comModal.comImgs" :auto-upload="false">
			<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
				<image class="banner" src="http://scu5azomr.hn-bkt.clouddn.com/static/icon/upload.png"></image>
				<view style="font-size: 10px;">上传头像</view>
			</view>
		</u-upload>

			<!-- 高校队伍进行注册 -->
			<view class="input-group" v-if="index == 0">
				<view class="input-row border">
					<text class="title">账号：</text>
					<m-input type="text" focus clearable v-model="account" placeholder="请输入账号"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">队伍名称：</text>
					<m-input type="text" focus clearable v-model="team_name" placeholder="请输入队伍名称"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">学校ID：</text>
					<m-input type="text" focus clearable v-model="school_id" placeholder="请输入学校ID"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">领队学生ID：</text>
					<m-input type="text" focus clearable v-model="leader_id" placeholder="请输入领队学生ID"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">简介：</text>
					<m-input type="text" focus clearable v-model="remark" placeholder="请输入简介"></m-input>
				</view>
				
				<!-- <view class="input-row border">
					<text class="title">手机号：</text>
					<m-input type="text" focus clearable v-model="phone" placeholder="请输入手机号码"></m-input>
					<button class="cty cu-btn bg-green">+86</button><button class="cty cu-btn line-green">大陆号码</button>
				</view> -->
				<!-- <view class="input-row border">
					<text class="title">验证码：</text>
					<m-input type="text" focus clearable v-model="verification" placeholder="短信验证码"></m-input>
					<button class="sms cu-btn bg-green">获取验证码</button>
				</view> -->
				<!-- <view class="input-row border">
					<text class="title">邮箱：</text>
					<m-input type="text" clearable v-model="email" placeholder="请输入邮箱"></m-input>
				</view> -->
				<view class="input-row border">
					<text class="title">密码：</text>
					<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">确认密码：</text>
					<m-input type="password" displayable v-model="confirm_pwd" placeholder="确认密码"></m-input>
				</view>
			</view>

			<!-- 社区基层人员进行注册 -->
			<view class="input-group" v-else>
				<view class="input-row border">
					<text class="title">账号：</text>
					<m-input type="text" focus clearable v-model="account" placeholder="请输入账号"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">名字：</text>
					<m-input type="text" focus clearable v-model="name" placeholder="请输入名字"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">联系方式：</text>
					<m-input type="text" focus clearable v-model="tel" placeholder="请输入联系方式"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">省：</text>
					<m-input type="text" focus clearable v-model="province" placeholder="请输入省"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">市：</text>
					<m-input type="text" focus clearable v-model="city" placeholder="请输入市"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">详细地址：</text>
					<m-input type="text" focus clearable v-model="address" placeholder="请输入详细地址"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">简介：</text>
					<m-input type="text" focus clearable v-model="account" placeholder="请输入简介"></m-input>
				</view>
				<!-- <view class="input-row border">
					<text class="title">手机号：</text>
					<m-input type="text" focus clearable v-model="phone" placeholder="请输入手机号码"></m-input>
					<button class="cty cu-btn bg-green">+86</button><button class="cty cu-btn line-green">大陆号码</button>
				</view> -->
				<!-- <view class="input-row border">
					<text class="title">验证码：</text>
					<m-input type="text" focus clearable v-model="verification" placeholder="短信验证码"></m-input>
					<button class="sms cu-btn bg-green">获取验证码</button>
				</view> -->
				<!-- <view class="input-row border">
					<text class="title">邮箱：</text>
					<m-input type="text" clearable v-model="email" placeholder="请输入邮箱"></m-input>
				</view> -->
				<view class="input-row border">
					<text class="title">密码：</text>
					<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">确认密码：</text>
					<m-input type="password" displayable v-model="confirm_pwd" placeholder="确认密码"></m-input>
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
	import YtabBtns from '../../components/login-tab/YtabBtns.vue'

	export default {
		components: {
			mInput,
			YtabBtns
		},
		data() {
			return {
				// 高校队伍注册需要的信息
				account: '',
				password: '',
				confirm_pwd: '',
				team_name: '',
				school_id: '',
				setup_date: '',
				remark: '',
				leader_id: '',
				identity: '',
				// email: '',
				// phone: '',
				// verification: '',

				// 社区基层人员注册需要的信息
				name: '',
				tel: '',
				province: '',
				city: '',
				address: '',

				// 选择注册的身份
				index: 0,
				list: [
					{
						name: '高校队伍',
						id: 1,
					}, 
					{
						name: '基层工作人员',
						id: 2,
					}
				],
			}
		},
		computed: {
			identity(){
				return index==0 ? 'team' : 'community' ;
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
@import url("../../static/styles/login.css");

  .title {
    width: 90px;
  }
  .banner {
    margin: 0 auto;;
    width: 50px;
    height: 50px;
	align-items: center;
  }
  .sms {
    margin-top: 3px;
  }
  .cty {
    margin-top: 10px;
    padding: 5px 5px;
  }
  .input-row{
	display: flex;
	flex-direction: row;
	position: relative;
	font-size: 13px;
	line-height: 40px;
  }
</style>
