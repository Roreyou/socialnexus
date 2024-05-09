<!-- 团委 全部社区需求 -->
<template>
	<view class="content">
		<!-- 循环显示卡片 -->
		<view class="cu-item" v-for="(item,index) in acList" :key="index">
			<view class="cu-card article" :class="isCard?'no-card':''">
					<view class="cu-item shadow">
						<view class="cu-bar bg-white">

							<!-- 卡片的最上面一行 -->
							<view class="action">
								<text class="cuIcon-titles text-green"></text>
								<text class="text-xl text-bold">{{item.veri_status}}</text>
							</view>
							<view class="action right-buttons" v-if="item.veri_status === '未审核'" >
									<button class="cu-btn bg-blue shadow-blur" @click="handlePass(item)">通过</button>
									<button class="cu-btn bg-grey shadow-blur" @click="handleReject(item)">驳回</button>
							</view>
							<view class="action right-buttons" v-if="item.veri_status === '已审核'" >
								<span class="status-label passed" v-if="item.veri_status === '通过'">已通过</span>
    							<span class="status-label rejected" v-if="item.veri_status === '驳回'">已驳回</span>
							</view>

						</view>
						<view class="title"><view class="text-cut">{{item.name}}</view></view>
						<view class="content">
							<view class="desc">
								<view class="text-content"> 发布日期: {{item.setup_date}}</view>
								<view class="text-content"> 所属社区: {{item.community_name}}</view>
								<view class="text-content"> {{item.province}} {{item.city}} {{item.address}}</view>
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
		<!-- 循环显示卡片结束 -->

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
					// {	
					// 	veri_status: "已审核",
					// 	name: "5月15日实践活动",
					// 	setup_date: "2020-05-15",
					// 	address: "北京",
					// 	job: "志愿者",
					// 	keywords: "服务,实践"
					// },
					// {
					// 	veri_status: "未审核",
					// 	name: "5月5日实践活动",
					// 	setup_date: "2020-05-5",
					// 	address: "深圳",
					// 	job: "志愿者",
					// 	keywords: "支教,教育"
					// },
					// {
					// 	veri_status: "未审核",
					// 	name: "5月5日实践活动",
					// 	setup_date: "2020-05-5",
					// 	address: "深圳",
					// 	job: "志愿者",
					// 	keywords: "支教,教育"
					// },
					// {
					// 	veri_status: "未审核",
					// 	name: "5月5日实践活动",
					// 	setup_date: "2020-05-5",
					// 	address: "深圳",
					// 	job: "志愿者",
					// 	keywords: "支教,教育"
					// }
				]
			}
		},
		onLoad() {
			
		},
		methods: {
			// 审核通过
			handlePass(item){
				console.log("点击通过");
			},
			// 驳回
			handleReject(item){
				console.log("点击驳回");
			}
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
.wordcont .ackeywords {
	display: inline-block;
  margin-right: 10rpx; /* 可以调整标签之间的水平间距 */
}
.right-buttons {
  /* margin-left: auto; */
  margin-right: 0;
}
.status-label {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  margin-right: 8px;
}

.passed {
  background-color: green;
}

.rejected {
  background-color: red;
}
</style>