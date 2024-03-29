<!-- 高校 全部 -->
<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image>
		<image class="logo" src="/static/logo.png"></image>
		<image class="logo" src="/static/logo.png"></image>
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view> -->
		<view class="cu-item" v-for="(item,index) in acList" :key="index">
			<view class="cu-card article" :class="isCard?'no-card':''">
					<view class="cu-item shadow">
						<view class="cu-bar bg-white">
							<view class="action">
								<text class="cuIcon-titles text-green"></text>
								<text class="text-xl text-bold">{{item.state}}</text>
							</view>
						</view>
						<view class="title"><view class="text-cut">{{item.name}}</view></view>
						<view class="content">
							<view class="desc">
								<view class="text-content"> 活动: {{item.activity}}</view>
								<view class="text-content"> 开始时间: {{item.startTime}}</view>
								<view class="text-content"> 结束时间: {{item.endTime}}</view>
								<view class="wordcont">	
								</view>
							</view>
						</view>
					</view>
			</view>
		</view>
		<view v-if="acList.length === 0" class="no-activities">
    		没有符合要求的队伍
  		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				acList:[
					{
						state: "待评价",
						name: "中山大学人工智能学院",
						activity: "2月15日实践活动",
						startTime: "2024-02-15",
						endTime: "2024-03-15",
					},
					{
						state: "待评价",
						name: "中山大学微电子学院",
						activity: "3月15日实践活动",
						startTime: "2024-03-15",
						endTime: "2024-03-25",
					}
				]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>
<style scoped>
.no-activitis{
	text-align: center;
    line-height: 100rpx;
}

.text-cut{
	margin-top: -15rpx;
	line-height: 60rpx;
}
.cu-bar .action:first-child{
	margin-left: 24rpx;
}

.cu-item .shadow{
	margin: 0;
	margin-top: 10rpx;
}
.text-content{
	height: auto;
}
.wordcont{
	margin-top: 10rpx;
}
.wordcont view {
	display: inline-block;
  margin-right: 10rpx; /* 可以调整标签之间的水平间距 */
}
</style>