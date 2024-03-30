<!-- 高校 已结束 -->
<template>
	<view class="content">
		<view class="cu-item" v-for="(item,index) in acList" :key="index">
			<view class="cu-card article" :class="isCard?'no-card':''">
					<view class="cu-item shadow">
						<view class="cu-bar bg-white">
							<view class="action">
								<text class="cuIcon-titles text-green"></text>
								<text class="text-xl text-bold">{{item.state}}</text>
							</view>
						</view>
						<view class="title"><view class="text-cut">{{item.title}}</view></view>
						<view class="content">
							<view class="desc">
								<view class="text-content"> 日期: {{item.time}}</view>
								<view class="text-content"> 地点: {{item.place}}</view>
								<view class="text-content"> 岗位: {{item.job}}</view>
								<view class="wordcont">	
									<view class="ackeywords" v-for="(word,index) in item.keywords.split(',')" :key="index">
										<view class="cu-tag bg-red light sm round">{{word}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
			</view>
		</view>
		<view v-if="acList.length === 0" class="no-activities">
    		没有符合要求的活动
  		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				acList:[
					{	
						state: "已结束",
						title: "5月15日实践活动",
						time: "2020-05-15",
						place: "北京",
						job: "志愿者",
						keywords: "服务,实践"
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