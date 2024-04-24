<!-- 高校 活动列表 -->
<template>
		<view>
			<!-- <text class="cuIcon-titles text-green"></text> -->
			<!-- <view class="cu-bar bg-white">
				<view class="action">					
					<text class="text-xl text-bold" style="font-family: 'pangmen'; font-style: italic; font-size: 52rpx; font-weight: 600">活动推荐</text>
				</view>
			</view> -->
			<view>
				<view class="cu-item" v-for="(item,index) in acList" :key="index">
					<view class="cu-card article" :class="isCard?'no-card':''" @click="todetail(item.id)">
							<view class="cu-item shadow" :class="{ 'indexstyle': isindex }">
							<!-- 活动状态 -->							
							<view class="cu-bar bg-white" v-if="ismyac">
								<view class="action">
									<text class="cuIcon-titles text-green"></text>
									<text class="text-xl text-bold">{{item.my_state}}</text>
								</view>
							</view>

								<view class="title"><view  :class="{ 'text-cut': ismyac}">{{item.name}}</view></view>
								<view class="content">
									<view class="desc">
										<view class="text-content"> 日期: {{item.start_time}}</view>
										<view class="text-content"> 省份: {{item.province}}</view>
										<view class="text-content"> 详细地址: {{item.address}}</view>
										
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
    		acList: Array,
			isindex:{
				type:Boolean,
				default:false
			},   //是不是首页推荐列表
			ismyac:{
				type:Boolean,
				default:false  //是不是我的活动列表
			}
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
			todetail(id){
				uni.navigateTo({
					//注意用这个的话page前面有一个斜杠，不然会说找不到这个组件
					url: '/pages/school/details/details?acti_id=' + id
				})
				// this.$u.route({
				// 	url: 'pages/school/details/details?acti_id=' + id
				// })
			},
		}
	}
</script>
<style scoped>
	/* 活动推荐列表 */
	.cu-item .shadow{
	/* margin: 0; */
	margin-top: 10rpx;
	margin-bottom: 15rpx;
	}

	.cu-bar .action:first-child{
	margin-left: 24rpx;
	}

	.text-cut{
	margin-top: -15rpx;
	line-height: 60rpx;
}

	.text-content{
	height: auto;
	}

	/* tag */
	.wordcont{
	margin-top: 10rpx;
	}
	.wordcont .ackeywords {
		display: inline-block;
	margin-right: 10rpx; /* 可以调整标签之间的水平间距 */
	}



	/* 首页推荐列表样式 */
	.indexstyle{
	margin: 0 20rpx;
    /* border-radius: 10px; */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}
	
</style>