<!-- 高校 活动列表 -->
<template>
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
					<view class="cu-card article" :class="isCard?'no-card':''" @click="todetail">
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
</template>

<script>
	export default {
		props: {
    		acList: Array
  		},
		data() {
			return {
				title: '高校 -- 活动列表'
			}
		},
		onLoad() {

		},
		methods: {
			//前往详情页
			todetail(){
				this.$u.route({
					url: 'pages/details/details',
				  })
			},
		}
	}
</script>
<style scoped>
	/* 活动推荐列表 */
	.cu-item .shadow{
	margin: 0;
	margin-top: 10rpx;
	}

	.cu-bar .action:first-child{
	margin-left: 24rpx;
	}

	/* tag */
	.wordcont{
	margin-top: 10rpx;
	}
	.wordcont view {
		display: inline-block;
	margin-right: 10rpx; /* 可以调整标签之间的水平间距 */
	}
</style>