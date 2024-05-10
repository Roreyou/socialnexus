<!--
 * @Author: happy 2630391116@qq.com
 * @Date: 2024-04-29 14:38:05
 * @LastEditors: happy 2630391116@qq.com
 * @LastEditTime: 2024-05-10 09:38:51
 * @FilePath: \socialnexus\client\src\pages\committee\searchActivity\reviewed.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--团委 已审核的社区需求 -->
<template>
	<view class="content">
		<!-- 循环显示卡片 -->
		<view class="cu-item" v-for="(item,index) in acList" :key="index">
			<view class="cu-card article" :class="isCard?'no-card':''" @click="todetail(item.id)" >
					<view class="cu-item shadow">
						<view class="cu-bar bg-white">
							<view class="action">
								<text class="cuIcon-titles text-green"></text>
								<text class="text-xl text-bold">{{item.veri_status}}</text>
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
					// 	title: "5月15日实践活动",
					// 	time: "2020-05-15",
					// 	place: "北京",
					// 	job: "志愿者",
					// 	keywords: "服务,实践"
					// }
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
					url: this.$url.BASE_URL + '/4142061-0-default/school/activities',
					// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
                	header:{
						Authorization:uni.getStorageSync("token")
					},	
					method: 'GET',
					data: {
						community_id: '0',
						// token: this.$userinfo.token
                	    // activity_status: this.index
						status: '已审核'
					},
					success: res => {						
						this.acList = res.data.data;
						console.log("成功请求-查询社区需求列表-已审核");
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
					url:'/page_commitee/page/details/details?acti_id=' + id
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
.desc{
	margin-bottom: 8px;
    margin-left: 25rpx;
}
</style>