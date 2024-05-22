<!--团委 - 活动详情 -->
<template>
	<view class="container">
		<!-- 第一块 -->
		<view>
			<view class="img">
			 	<image :src="detail.picture" mode="aspectFill"></image>
		 	</view>
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
    <!-- 分割线 -->
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

			<!-- <bttab v-if="hasactiid" :team_id="user_id" :acti_id="acti_id"></bttab> -->
      <view class="button-container" v-if="detail.verification_status === 1">
        	<button class="status-label passed" @click="handlePass()">通过</button>
			<view style="width:20rpx;"></view>
        	<button class="status-label rejected" @click="handleReject()" >驳回</button>
      </view>
      <view class="done-container passed" v-else-if="detail.verification_status === 2">
        <text class="status "  >已通过</text>
      </view>
      <view class="done-container rejected " v-else-if="detail.verification_status === 3">
        <text class="status ">已驳回</text>
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
					keywords: "",
          			verification_status: 0
				},
				// hasactiid:false
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin','user_id'])
		},
		onLoad(options) {
			console.log('activity details options.acti_id=',options.acti_id);
			this.acti_id = options.acti_id;
		},
		mounted(){
			// 获取query对象，传递过来的参数
			const query = this.$mp.query;
			// const query = this.$route.query;
			const id = query.acti_id;
			// console.log("id:",id)
			this.acti_id = id;
			// this.hasactiid = true;
			// 获取活动详情api
			uni.request({
				// url: this.$url.BASE_URL + '/school/activityInfo',
				url: this.$url.BASE_URL + '/school/activityInfo',
				header:{
					Authorization:uni.getStorageSync("token")
				},					
				method: 'GET',
				data: {
					id: id,
					// token: this.$userinfo.token
				},
				success: res => {
					this.detail = res.data.data;
          			console.log(this.detail)
					this.net_error = false;
				},
				fail: res => {
					this.net_error = true;
				},
				complete: () => {
				}
			})
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
			},
      		// 审核：通过
			handlePass(item){
				console.log("详情页面审核：通过");
				uni.request({
					// url: this.$url.BASE_URL + '/school/approveActivity',
					url: this.$url.BASE_URL + '/school/approveActivity',
					header:{
						Authorization:uni.getStorageSync("token")
					},	
					method: 'PUT',
					data: {
						id: this.acti_id,
						approve: 1
					},
					success: res => {
						if(res.data.code==200){
							this.$u.toast(`审核成功！已通过申请。`);
							// 重新显示
							this.detail.verification_status = 2;
						}
						else if(res.data.code == 401){
							console.log("token过期");
							uni.showModal({
							title: '',
							content: '登录已过期。是否前去登录？',
							success: function(res) {
							if (res.confirm) {
								// 用户点击了确定
								uni.reLaunch({
									url: '../../../pages/login/login',
								})
							} else if (res.cancel) {
								// uni.navigateBack()
								return;							
							}
							}
						});
						}
						else if(res.data.code == 500){
							this.$u.toast(`审核失败，活动不存在！`);
							this.getAllUnreviewed();
						}
					},
					fail: res => {
						this.net_error = true;
					},
					complete: () => {
					}
				})
			},
			// 审核：驳回
			handleReject(item){
				console.log("详情页面审核：驳回");
				uni.request({
					// url: this.$url.BASE_URL + '/school/approveActivity',
					url: this.$url.BASE_URL + '/school/approveActivity',
					header:{
						Authorization:uni.getStorageSync("token")
					},	
					method: 'PUT',
					data: {
						id: this.acti_id,
						approve: 2
					},
					success: res => {
						if(res.data.code==200){
							this.$u.toast(`审核成功！已驳回申请。`);
							// 重新显示
							this.detail.verification_status = 3;
						}
						else if(res.data.code == 401){
							console.log("token过期");
							uni.showModal({
							title: '',
							content: '登录已过期。是否前去登录？',
							success: function(res) {
							if (res.confirm) {
								// 用户点击了确定
								uni.reLaunch({
									url: '../../../pages/login/login',
								})
							} else if (res.cancel) {
								// uni.navigateBack()
								return;							
							}
							}
						});
						}
						else if(res.data.code == 500){
							this.$u.toast(`审核失败，活动不存在！`);
							this.getAllUnreviewed();
						}
					},
					fail: res => {
						this.net_error = true;
					},
					complete: () => {
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
	/* .keywords{
		display: inline-block; 
  		margin-right: 10px; /* 可根据需求调整按钮之间的间距 */
		/* margin-bottom: 10px; */
		/* padding: 0 8px; 调整内边距来控制块的大小 */
	/*} 
	*/
	
	/* 灰线 */
	.custom-container {
	text-align: center; /* 可根据需要调整水平对齐方式 */
	margin: 0 25rpx;
	}

	.horizontal-line {
	border: none; /* 移除默认的边框样式 */
	border-top: 2rpx solid #ccc; /* 设置上边框为 1px 灰色实线 */
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
.passed {
  background-color: green;
}

.rejected {
  background-color: red;
}
.button-container {
	display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    height: 130rpx;
    width: inherit;
    background-color: white;
    padding: 0 20rpx;
}
.status-label {
  display: inline-block;
  padding: 8rpx 16rpx;
  border-radius: 24rpx;
  color: #fff;
  font-size: 32rpx;
  font-weight: bold;
  /* margin-right: 16rpx; */
  width: 50%;
}
.done-container{
	display: flex;
  	flex-direction: column;
  	justify-content: center;
  	position: fixed;
  	bottom: 0;
  	left: 0;
	width: inherit;
}
.status{
	color: #fff;
    font-size: 34rpx;
    font-weight: bold;
    height: 50rpx;
    margin: 20rpx auto;
}
</style>