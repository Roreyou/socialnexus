<!--高校 - 活动详情 -->
<template>
	<view class="container">
		<!-- 第一块 -->
		<view>
			<view class="part first">
				<view class="de_total_title">
					博物馆研学关注日活动
				</view>
				<view class="de_key_value">
					<view class="de_content">
						<view class="key">
							发布组织
						</view>
						<view class="value">
							博物馆研学
						</view>
					</view>
					<view class="de_content">
						<view class="key">
							活动编号
						</view>
						<view class="value">
							1555596663
						</view>
					</view>
				</view>
				<view>
					<view class="keywords cu-tag bg-red light sm round">
						文化
					</view>
					<view class="keywords cu-tag bg-red light sm round">
						文艺
					</view>
				</view>
			</view>
		</view>
		<view class="custom-container">
    		<hr class="horizontal-line">
  		</view>
		<!-- 第二块 -->
		<view>
			<view class="part second">
				<view class="de_total_title sub_title">
					活动信息
				</view>
				<view class="de_key_value">
					<view class="de_content">
						<view class="key">
							活动地点
						</view>
						<view class="value">
							广州市 香洲区
						</view>
					</view>
					<view class="de_content">
						<view class="key">
							联系方式
						</view>
						<view class="value">
							19875196595
						</view>
					</view>
				</view>
				<!-- <view>
					<view class="keywords cu-tag bg-red light sm round">
						文化
					</view>
					<view class="keywords cu-tag bg-red light sm round">
						文艺
					</view>
				</view> -->
			</view>
		</view>
		<view class="custom-container">
    		<hr class="horizontal-line">
  		</view>
		<!-- 第三块 -->
		<view>
			<view class="part second">
				<view class="de_total_title sub_title">
					志愿者招募详情
				</view>
				<view class="de_key_value">
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
				</view>
			</view>
		</view>
		<view class="custom-container">
    		<hr class="horizontal-line">
  		</view>
		<!-- 第四块 -->
		<view>
			<view class="part">
				<view class="de_total_title sub_title">
					报名须知
				</view>
				<view class="de_key_value">
					<view class="de_content">
						<view class="key">
							报名限制
						</view>
						<view class="value">
							无限制
						</view>
					</view>
					<view class="de_content">
						<view class="key">
							报名截止时间：
						</view>
						<view class="value">
							2000000000058
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="custom-container">
    		<hr class="horizontal-line">
  		</view>

		  <view>
			<view class="part">
				<view class="de_total_title sub_title">
					活动介绍
				</view>
				<view class="de_key_value">
					<view class="de_content">
						<view class="last-key">
							活动简介
						</view>
						<view class="value">
							由乐善"耆”乐手工队成员编织各式各样的手工艺品，并在公益市集上等价交换，凑集善款，为社区的特殊群体创造更好的生活环境。
						</view>
					</view>
					<view class="de_content">
						<view class="last-key">
							活动内容
						</view>
						<view class="value">
							由乐善"耆”乐手工队成员编织各式各样的手工艺品，并在公益市集上等价交换，凑集善款，为社区的特殊群体创造更好的生活环境。(仅录用有藤编和串珠基础的志愿者)
						</view>
					</view>
					<!-- <view class="de_content">报名截止时间：8450345</view> -->
				</view>
			</view>
		</view>

		<view style="position: fixed; bottom: 0; width: 100%;">
			<bttab></bttab>
		</view>
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
</style>