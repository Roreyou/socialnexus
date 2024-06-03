<!--
 * @Author: happy 2630391116@qq.com
 * @Date: 2024-04-29 14:38:05
 * @LastEditors: happy 2630391116@qq.com
 * @LastEditTime: 2024-06-03 14:05:12
 * @FilePath: \socialnexus\client\src\pages\committee\searchActivity\reviewed.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--团委 已审核的高校队伍 -->
<template>
	<view class="content">
		<!-- 循环显示卡片 -->
		<view class="cu-item" v-for="(item,index) in acList" :key="index">
			<view class="cu-card article" :class="isCard?'no-card':''" @click="todetail(item.modified_id)"  >
					<view class="cu-item shadow">
						<view class="cu-bar bg-white">
							<view class="action">
								<text class="cuIcon-titles text-green"></text>
								<text class="text-xl text-bold">{{item.modi_status}} 信息修改</text>
							</view>
							
							<view class="action right-buttons" v-if="item.modi_status === '已审核'" >
								<span class="status-label passed" v-if="item.modified_status === 2">已通过</span>
    							<span class="status-label rejected" v-if="item.modified_status === 3">已驳回</span>
							</view>
							
						</view>
						<view class="title"><view class="text-cut">{{item.team_name}}</view></view>
						<view class="content">
							<img class="avatar" :src="item.avatar" alt="Avatar">
							<view class="desc">
								<view class="text-content"> 成立日期: {{item.setup_date}}</view>
								<view class="text-content"> 指导老师: {{item.instructor_name}}</view>
								<view class="text-content"> 领队学生: {{item.leader_name}}</view>
								<view class="wordcont">	
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
					
				]
			}
		},
		onLoad() {

		},
		mounted() {
			// 组件被挂载后发起请求
			this.getAllReviewed();
		},
		methods: {
			getAllReviewed(){
				uni.request({
					url: this.$url.BASE_URL + '/school/getUpdatedTeams',
					
                	header:{
						Authorization:uni.getStorageSync("token")
					},	
					method: 'GET',
					data: {
						// token: this.$userinfo.token
                	    // activity_status: this.index
						status: 1
					},
					success: res => {						
						this.acList = res.data.data;
						console.log("成功请求-查询信息修改列表-已审核");
						console.log(this.acList);
						this.net_error = false;
					},
					fail: res => {
						this.net_error = true;
					},
					complete: () => {
					}
				})
			},
			//前往详情页
			todetail(id){
				console.log("id:", id)
				// uni.navigateTo({
				// 	//注意用这个的话page前面有一个斜杠，不然会说找不到这个组件
				// 	url: '../../page_school/pages/details/details?acti_id=' + id
				// })
				uni.navigateTo({
					url:'/page_commitee/page/details/modifiedDetails?modified_id=' + id
				});
				// this.$u.route({
				// 	url: 'pages/school/details/details?acti_id=' + id
				// })
			},
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
.status-label {
  display: inline-block;
  padding: 8rpx 16rpx;
  border-radius: 24rpx;
  color: #fff;
  font-size: 32rpx;
  font-weight: bold;
  margin-right: 16rpx;
}

.passed {
  background-color: green;
}

.rejected {
  background-color: red;
}
.avatar {
	width: 50rpx;
	height: 50rpx;
	border-radius: 50%;
	background-color: #ffffff;
	margin-right: 10rpx;
}
.desc{
	margin-bottom: 8rpx;
    margin-left: 25rpx;
}

</style>