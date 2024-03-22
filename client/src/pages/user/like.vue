<!-- 高校 活动收藏 -->
<template>
	<view class="content">
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
							<view class="favorite-button">
        						<button class="cancel-favorite" @click="cancelFavorite(item.id)">取消收藏</button>
      						</view>
						</view>
					</view>
			</view>
		</view>
		<view v-if="acList.length === 0" class="no-activities">
    		没有收藏的活动
  		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				acList:[
					{
						id: 0,
						state: "开展中",
						title: "5月5日实践活动",
						time: "2020-05-5",
						place: "深圳",
						job: "志愿者",
						keywords: "支教,教育"
					},
					{
						id: 1,
						state: "开展中",
						title: "5月5日实践活动",
						time: "2020-05-5",
						place: "深圳",
						job: "志愿者",
						keywords: "支教,教育"
					},
					{	
						id: 2,
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
			cancelFavorite(likeid){
				uni.showModal({
    			    title: '确认取消收藏',
    			    content: '确定取消收藏吗？',
    			    success: (res) => {
    			      if (res.confirm) {
    			        // 用户点击了确认按钮
						const filteredList = this.acList.filter(item => item.id !== likeid);
						this.acList = filteredList;
						this.$u.toast(`取消收藏成功！`);
    			      }
    			    }
    			});
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
	margin-top: 10px;
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
.favorite-button{
	display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
}
.cancel-favorite{
	font-size: small;
}
</style>