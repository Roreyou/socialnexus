<!--
 * @Author: 19875196595 2458190458@qq.com
 * @Date: 2024-03-20 12:25:21
 * @LastEditors: 19875196595 2458190458@qq.com
 * @LastEditTime: 2024-03-20 12:33:52
 * @FilePath: \socialnexus\client\src\components\login-tab\YtabBtns.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
/**
* 切换按钮组
* index 参数必须绑定 绑定方式 :index.sync='参数'
* 若未绑定无法切换按钮
*
* change 事件 返回选中按钮所传的所有参数
*/

<!-- 登录页面切换身份按钮 -->
<template>
	<view>
		<view class="list" :style="{border:`1rpx solid ${borderColor}`}">
			<view class="item" @tap="tap_item(ind,item)" v-for="(item,ind) in data" :style="{color:index ==ind?background:color,background:ind == index?color:background,borderLeft:ind != 0?'1rpx solid '+borderColor:''}">
				{{item[listKey]}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			/**
			 * 展示字段的key 值为一个字符串
			 */
			listKey: {
				type: String,
				default: 'name'
			},
			/**
			 * 按钮列表 [{name:'按钮1', ...其他参数},{name:'按钮2', ...其他参数}]
			 */
			data: {
				type: Array,
				default: []
			},
			/**
			 * 前景色 文字 边框 及选中时的背景颜色
			 */
			color: {
				type: String,
				default: '#39b54a'
			},

			/**
			 * 背景色 未选中时背景色 及 选中时的文字颜色
			 */
			background: {
				type: String,
				default: '#FFFFFF'
			},
			/**
			 * 索引值 用来指定选中的值 绑定时需使用 .sync 
			 */
			borderColor: {
				type: String,
				default: '#39b54a'
			},
			/**
			 * 索引值 用来指定选中的值 绑定时需使用 .sync 
			 */
			index: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {};
		},
		methods: {
			tap_item(ind, item) {
				this.$emit('change', item)
				this.$emit('update:index', ind)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		display: flex;
		border-radius: 10rpx;
		max-width: 690rpx;
		flex-wrap: nowrap;
		overflow-x: scroll;

		.item {
			flex: 1;
			display: flex;
			justify-content: center;
			white-space: nowrap;
			padding: 10rpx 30rpx;
			color: #FFFFFF;
			font-size: 14px;
			transition: 0.2s;
		}
	}
</style>
