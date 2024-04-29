<!--
 * @Author: happy 2630391116@qq.com
 * @Date: 2024-04-29 16:32:53
 * @LastEditors: happy 2630391116@qq.com
 * @LastEditTime: 2024-04-29 17:19:40
 * @FilePath: \socialnexus\client\src\pages\committee\searchSchool\all.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 团委 全部高校队伍 -->
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
								<text class="text-xl text-bold">{{item.state}}</text>
							</view>
							<view class="action right-buttons" v-if="item.state === '待审核'" >
									<button class="cu-btn bg-blue shadow-blur" @click="handlePass(item)">通过</button>
									<button class="cu-btn bg-grey shadow-blur" @click="handleReject(item)">驳回</button>
							</view>
							<view class="action right-buttons" v-if="item.state === '已审核'" >
								<span class="status-label passed" v-if="true">已通过</span>
    							<span class="status-label rejected" v-else>已驳回</span>
							</view>

						</view>
						<view class="title"><view class="text-cut">{{item.name}}</view></view>
						<view class="content">
							<view class="desc">
								<view class="text-content"> 成立日期: {{item.setup_date}}</view>
								<view class="text-content"> 指导老师: {{item.instructor}}</view>
								<view class="text-content"> 领队学生: {{item.leader}}</view>
								<view class="wordcont">	
								</view>
							</view>
						</view>
					</view>
			</view>
		</view>
		<!-- 循环显示卡片结束 -->

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
						state: "已审核",
						name: "中山大学软件工程学院",
						setup_date: "2020-05-15",
						instructor: "王乐球",
						leader:"李华"
					},
					{
						state: "待审核",
						name: "中山大学人工智能学院",
						setup_date: "2020-05-15",
						instructor: "肖云",
						leader:"李华"
					},
					{
						state: "待审核",
						name: "中山大学微电子学院",
						setup_date: "2020-05-15",
						instructor: "保延祥",
						leader:"李华"
					},
					{
						state: "待审核",
						name: "中山大学土木工程学院",
						setup_date: "2020-05-15",
						instructor: "俞烜",
						leader:"李华"
					}
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