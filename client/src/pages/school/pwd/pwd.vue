<!--
 * @Author: 19875196595 2458190458@qq.com
 * @Date: 2024-03-19 18:02:01
 * @LastEditors: 19875196595 2458190458@qq.com
 * @LastEditTime: 2024-03-19 20:52:02
 * @FilePath: \socialnexus\client\src\pages\pwd\pwd.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 统一找回密码页面 -->
<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row">
				<text class="title">邮箱：</text>
				<m-input type="text" focus clearable v-model="email" placeholder="请输入邮箱"></m-input>
			</view>
		</view>

		<view class="btn-row">
			<button class="cu-btn bg-green lg block" @click="findPassword">提交</button>
		</view>
	</view>
</template>

<script>
	import service from '../../../service.js';
	import mInput from '../../../components/m-input.vue';

	export default {
		components: {
			mInput
		},
		data() {
			return {
				email: ''
			}
		},
		methods: {
			findPassword() {
				/**
				 * 仅做示例
				 */
				if (this.email.length < 3 || !~this.email.indexOf('@')) {
					uni.showToast({
						icon: 'none',
						title: '邮箱地址不合法',
					});
					return;
				}
				uni.showToast({
					icon: 'none',
					title: '已发送重置邮件至注册邮箱，请注意查收。',
					duration: 3000
				});
			}
		}
	}
</script>

<style>
@import url("../../../static/styles/login.css");
</style>
