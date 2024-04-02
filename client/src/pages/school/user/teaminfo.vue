<!--高校 - 队伍资料 -->
<template>
	<view class="container">
		<!-- 队伍信息 -->
		<view>
			<view class="part second">
				<view class="de_total_title sub_title">
					队伍基本信息
				</view>
				<view class="de_key_value" v-for="(item,index) in baselist" :key="index">
					<view class="de_content">
						<view class="key">
							{{ item.key }}
						</view>
						<view class="value">
							{{ item.value }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="custom-container">
    		<hr class="horizontal-line">
  		</view>
		<!-- 队员信息 -->
		<view>
			<view class="part second">
				<view class="de_total_title sub_title">
					队员信息
				</view>
				<!-- <view class="de_key_value">
					<view class="de_content">
						<view class="key">
							时间段
						</view>
						<view class="value">
							2024/3/31 10:00-12:00
						</view>
					</view>
					<view class="de_content">
						<view class="key">
							招募人数
						</view>
						<view class="value">
							12
						</view>
					</view>
					<view class="de_content">
						<view class="key">
							招募岗位
						</view>
						<view class="value">
							志愿者
						</view>
					</view>
				</view> -->
				<view>
					<view class="cu-item" v-for="(item,index) in memberList" :key="index">
						<view class="cu-card article" :class="isCard?'':'no-card'">
								<view class="cu-item shadow">
									<view class="title"><view class="text-cut">姓名：{{item.name}}</view></view>
									<view class="content">
										<view class="desc">
											<view class="text-content"> 学号: {{item.id}}</view>									
										</view>
									</view>
								</view>
						</view>
					</view>
			</view>
			</view>
		</view>

		<!-- 到时候可以在这里加入修改资料的入口 -->
		<!-- <view style="position: fixed; bottom: 0; width: 100%;">
			<bttab></bttab>
		</view> -->
	</view> 
</template>
 
<script>
import bttab from '../../../components/detail-btm/uni-goods-nav.vue';

	export default {
    components: {
			bttab,
		},
		data(){
			return{
				baselist:[
					{
						key:'队伍名称',
						value:'某一个高校队伍'
					},
					{
						key:'负责人姓名',
						value:'人'
					},
					{
						key:'负责人联系电话',
						value:'123456789'
					},
					{
						key:'队员人数',
						value:'20'
					},
				],
				memberList:[
					{
						name: "第一个队员",
						id: "21311212"
					},
					{
						name: "第二个队员",
						id: "21311988"
					},
				]
			}
		},
	}
</script>
 
<style>
	page {
		background: #f8f8f8;
		padding-bottom: 160rpx;
	}
 
	.container {
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}

	.part{
		padding-left: 25rpx;
	}

	.de_total_title {
		font-size: 42rpx;
		font-weight: 900;
		color: #333333;
		margin-top: 30rpx;
		margin-bottom: 20rpx;
	}

	.sub_title{
		font-size: 36rpx;
		font-weight: 600;
	}

	.de_key_value{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-bottom: 20rpx;
		color: gray;
		line-height: 20rpx;
	}
	.de_content{
		display: flex;
		line-height: 60rpx;
    	font-size: larger;
		/* justify-content: space-between;  */
	}
	.keywords{
		display: inline-block; 
  		margin-right: 10px; /* 可根据需求调整按钮之间的间距 */
		margin-bottom: 10px;
		padding: 0 8px; /* 调整内边距来控制块的大小 */
	}
	
	/* 灰线 */
	.custom-container {
	text-align: center; /* 可根据需要调整水平对齐方式 */
	margin: 0 25rpx;
	}

	.horizontal-line {
	border: none; /* 移除默认的边框样式 */
	border-top: 1px solid #ccc; /* 设置上边框为 1px 灰色实线 */
	width: 100%; /* 设置水平线的宽度为容器的宽度 */
	}

	.key{
		display: inline-block;
		width: 600rpx;
	}
	.value{
		display: inline-block;
		/* margin-left: 30rpx; */
		color: black;
		/* flex-grow: 1; */
		padding-right: 25rpx;
		width: 1200rpx;
	}

	/* 活动简介的样式，比较特殊 */
	.last-key{   
		display: inline-block;
		width: 600rpx;
	}

	/* 队员列表 */
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
	.wordcont .ackeywords {
		display: inline-block;
	margin-right: 10rpx; /* 可以调整标签之间的水平间距 */
	}
</style>
\