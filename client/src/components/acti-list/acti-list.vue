<!-- 高校 活动列表 -->
<template>
		<view :class="{'others-all': !isindex}">
			<!-- <text class="cuIcon-titles text-green"></text> -->
			<!-- <view class="cu-bar bg-white">
				<view class="action">					
					<text class="text-xl text-bold" style="font-family: 'pangmen'; font-style: italic; font-size: 52rpx; font-weight: 600">活动推荐</text>
				</view>
			</view> -->
			<view>
				<view class="cu-item" v-for="(item,index) in newAcList" :key="index">
					<view class="cu-card article" :class="isCard?'no-card':''" @click="todetail(item.id)">
							<view class="cu-item shadow" :class="{'indexstyle': isindex, 'others': !isindex}">
								<!-- 活动状态 -->							
								<view class="cu-bar bg-white" v-if="ismyac">
									<view class="action">
										<text class="cuIcon-titles text-green"></text>
										<text class="text-xl text-bold">{{item.my_state}}</text>
									</view>
								</view>

								<view class="title"><view :class="{ 'title-font': !ismyac, 'text-cut': ismyac}">{{item.name}}</view></view>
								<view class="conpic">
									<view class="content">
										<view class="desc">
											<view class="text-content"> 日期: {{item.start_time}}</view>
											<view class="text-content"> 省份: {{item.province}}</view>
											<view class="text-content"> 详细地址: {{item.address}}</view>
											
											<view v-if="ismyac" class="text-content"> 录取状态: {{item.admission_status}}</view>
											
											<view class="wordcont">	
												<view class="ackeywords" v-for="(word,index) in item.keywords" :key="index">
													<view class="cu-tag bg-red light sm round">{{word}}</view>
												</view>
											</view>
										</view>
									</view>
									<view class="pic">
										<img class="avatar" :src="item.picture" alt="Avatar">
										<!-- <img class="avatar" src="http://scu5azomr.hn-bkt.clouddn.com/static/4.png" alt="Avatar"> -->
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
		 watch: {
			acList(newVal, oldVal){
				const newadd = newVal.map(item => {
					let keywords = [];
					if (typeof item.keywords === 'string') {
						keywords = item.keywords.split(',');
					}
					return { ...item, keywords };
				});
				// this.newAcList = this.newAcList.concat(newadd)
				this.newAcList = newadd
			}
		},

		data() {
			return {
				newAcList: []
			}
		},
		mounted() {
			// item.keywords.split(',')// console.log("acti--list:", this.acList)
			this.newAcList = this.acList.map(item => {
				let keywords = [];
				if (typeof item.keywords === 'string') {
					keywords = item.keywords.split(',');
				}
				return { ...item, keywords };
			});

		},
		methods: {
			//前往详情页
			todetail(id){
				console.log("id:", id)
				// uni.navigateTo({
				// 	//注意用这个的话page前面有一个斜杠，不然会说找不到这个组件
				// 	url: '../../page_school/pages/details/details?acti_id=' + id
				// })
				uni.navigateTo({
					url:'/page_school/pages/details/details?acti_id=' + id
				});
				// this.$u.route({
				// 	url: 'pages/school/details/details?acti_id=' + id
				// })
			},
		}
	}
</script>
<style scoped>
	.others-all{
		margin-top: 10rpx;
	}
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
	font-size: 30rpx;
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

	/* 标题 */
	.title{
		margin-right: -20rpx;
	}

	/* 首页推荐列表样式 */
	/* 标题 */

	.title-font{
		margin-bottom: -10rpx;
		font-size: 35rpx;
	} 

	.indexstyle{
	margin: 0 20rpx;
    /* border-radius: 10px; */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}
	
	/* 首页之外的卡片样式 */
	.others{
		background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
	}

	/* 加了图片 */
	.conpic{
		overflow: hidden; /* 清除浮动后的高度塌陷问题 */
		display: flex;
		align-items: center;
		width: 680rpx;
	}
	.pic{
		/* float: left;  */
		margin-left: 40rpx; /* 设置图片和内容之间的间距 */
	}
	.content{
		padding: 20rpx; /* 内容的内边距，rpx是uni-app中的单位 */
	}
	.avatar {
 	width: 200rpx;
 	height: 200rpx;
 	/* border-radius: 50%; */
	object-fit: cover; 
 	background-color: #ffffff;
 	margin-right: 40rpx;
	}
</style>