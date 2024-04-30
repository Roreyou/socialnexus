<!--高校 - 活动详情 -->
<template>
	<view class="container">
		<!-- 第一块 -->
		<view>
			<view class="part first">
				<view class="de_total_title">
					{{ detail.name }}
					<view class="wordcont">
						<view class="ackeywords" v-for="(word,index) in detail.keywords.split(',')" :key="index">
							<view class="cu-tag bg-red light sm round">{{word}}</view>
						</view>
					</view>
				</view>
				<view class="de_key_value">
					<view class="de_content">
						<view class="key">
							社区基层名称
						</view>
						<view class="value">
							{{ detail.community_name }}
						</view>
					</view>
					<view class="de_content">
						<view class="key">
							活动编号
						</view>
						<view class="value">
							{{ acti_id }}
						</view>
					</view>
					<view class="de_content">
						<view class="key">
							活动类别
						</view>
						<view class="value">
							{{ detail.category_name }}
						</view>
					</view>


				</view>
				<!-- <view class="wordcont">
					<view class="ackeywords" v-for="(word,index) in detail.keywords.split(',')" :key="index">
						<view class="cu-tag bg-red light sm round">{{word}}</view>
					</view>
				</view> -->
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
							{{detail.province}} {{detail.city}}
						</view>
					</view>
					<view class="de_content">
						<view class="key">
							详细地址
						</view>
						<view class="value">
							{{detail.address}}
						</view>
					</view>
					<view class="de_content">
						<view class="key">
							联系方式
						</view>
						<view class="value phone" @click="phoneOn">
							{{detail.tel}}
						</view>
					</view>
				</view>
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
							<text>{{detail.start_time}} 开始</text><br>
							<text>{{detail.end_time}} 结束</text>
						</view>
					</view>
					<view class="de_content">
						<view class="key">
							招募队伍数
						</view>
						<view class="value">
							{{ detail.vacancies }}
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
							{{detail.application_deadline}}
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
							活动内容
						</view>
						<view class="value">
							{{detail.remark}}
						</view>
					</view>
				</view>
			</view>
		</view>

		<view style="position: fixed; bottom: 0; width: 100%;">
			<bttab :team_id="user_id" :acti_id="acti_id"></bttab>
		</view>

		<!-- 以下是尝试把海报迁移到这个页面 -->
		<view>
			
		</view>
	</view> 
</template>
 
<script>
	import {
		mapState,
	} from 'vuex'
import bttab from '../../../components/detail-btm/uni-goods-nav.vue';

	export default {
    	components: {
			bttab,
		},
		data(){
			return{
				acti_id:'',
				detail:{
					keywords: ""
				},
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin','user_id'])
		},
		mounted(){
			// 获取query对象
			const query = this.$mp.query;
			// const query = this.$route.query;
			const id = query.acti_id;
			this.acti_id = id;
			uni.request({
				url: this.$url.BASE_URL + '/4142061-0-default/schoolteam/getactidetail',
				// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
				header:{
					Authorization:uni.getStorageSync("token")
				},					
				method: 'GET',
				data: {
					acti_id: id,
					// token: this.$userinfo.token
				},
				success: res => {
					this.detail = res.data.data.detail;
					this.detail.keywords = "服务,实践"
					this.net_error = false;
				},
				fail: res => {
					this.net_error = true;
				},
				complete: () => {
				}
			})
		},
		onload(option){
			console.log("onload")
			const id = option.id;
			// uni.request({
			// 	url: this.$url.BASE_URL + '/4142061-0-default/schoolteam/getactidetail',
			// 	// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
				
			// 	method: 'GET',
			// 	data: {
			// 		acti_id: id,
			// 		// token: this.$userinfo.token
			// 	},
			// 	success: res => {
			// 		this.detail = res.data.data.detail;
			// 		this.detail.keywords = "服务,实践"
			// 		this.net_error = false;
			// 	},
			// 	fail: res => {
			// 		this.net_error = true;
			// 	},
			// 	complete: () => {
			// 	}
			// })
		},
		methods:{
			phoneOn() {
				wx.makePhoneCall({
					phoneNumber: this.detail.tel, //此号码仅用于测试
					success: function () {
						console.log("拨打电话成功！")
					},
					fail: function () {
						console.log("拨打电话失败！")
					}
				})
			}
    	}
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

		/* tag */
		.wordcont{
	margin-top: 10rpx;
	}
	.wordcont .ackeywords {
		display: inline-block;
	margin-right: 10rpx; /* 可以调整标签之间的水平间距 */
	}

	.phone{
		color: red
	}
</style>