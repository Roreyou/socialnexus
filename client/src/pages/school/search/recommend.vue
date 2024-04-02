<!-- 高校活动推荐 -->
<template>
	<view class="content">
		<!-- 活动推荐列表 -->
		<view>
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>
					<text class="text-xl text-bold">活动推荐</text>
				</view>
			</view>
			<view>
				<view class="cu-item" v-for="(item,index) in acList" :key="index">
					<view class="cu-card article" :class="isCard?'no-card':''">
							<view class="cu-item shadow">
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
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// title: '高校 -- 活动推荐'
				acList:[
					{	
						state: "已结束",
						title: "5月15日实践活动",
						time: "2020-05-15",
						place: "北京",
						job: "志愿者",
						keywords: "服务,实践"
					},
					{
						state: "开展中",
						title: "5月5日实践活动",
						time: "2020-05-5",
						place: "深圳",
						job: "志愿者",
						keywords: "支教,教育"
					},
					{
						state: "开展中",
						title: "5月5日实践活动",
						time: "2020-05-5",
						place: "深圳",
						job: "志愿者",
						keywords: "支教,教育"
					},
					{
						state: "开展中",
						title: "5月5日实践活动",
						time: "2020-05-5",
						place: "深圳",
						job: "志愿者",
						keywords: "支教,教育"
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
<style lang="scss" scoped>
	.cu-item .shadow{
	margin: 0;
	margin-top: 10rpx;
	}

	.cu-bar .action:first-child{
	margin-left: 24rpx;
	}

	.wordcont{
	margin-top: 10rpx;
	}
	.wordcont .ackeywords {
		display: inline-block;
	margin-right: 10rpx; /* 可以调整标签之间的水平间距 */
	}
</style>