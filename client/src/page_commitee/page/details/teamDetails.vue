<!--团委 - 高校队伍信息详情 -->
<template>
	<view class="container">
		<!-- 队伍信息 -->
		<view>
			<view class="img">
			 	<image :src="team_info.avatar" mode="aspectFill"></image>
		 	</view>
			<view class="part first">
				<view class="de_total_title sub_title">
					队伍基本信息
				</view>

				<view class="de_key_value">
					<view class="de_content">
						<view class="key">
							队伍名称
						</view>
						<view class="value">
							{{ team_info.team_name }}
						</view>
				</view>
            <view class="de_content">
					<view class="key">
						指导老师姓名
					</view>
					<view class="value">
						{{ team_info.instructor_name }}
					</view>
			</view>
            <view class="de_content">
				<view class="key">
					队长姓名
				</view>
				<view class="value">
					{{ team_info.leader_name }}
				</view>
			</view>
            <view class="de_content">
				<view class="key">
					相关院系
				</view>
				<view class="value">
					{{ team_info.relevant_faculties }}
				</view>
			</view>
            <view class="de_content">
				<view class="key">
					队员人数
				</view>
				<view class="value">
					{{ team_info.mem_num }}
				</view>
			</view>
		</view>
		</view>
		</view>
		<view class="custom-container">
    		<hr class="horizontal-line">
  		</view>

		<!-- 指导老师信息 -->
		<view>
			<view class="part second">
				<view class="de_total_title sub_title">
					指导老师基本信息
				</view>
				<view class="de_key_value">
					<view class="de_content">
						<view class="key">
							指导老师姓名
						</view>
						<view class="value">
							{{ instructor_info.name }}
						</view>
					</view>
          <view class="de_content">
						<view class="key">
							指导老师工号
						</view>
						<view class="value">
							{{ instructor_info.id }}
						</view>
					</view>
          <view class="de_content">
						<view class="key">
							联系电话
						</view>
						<view class="value">
							{{ instructor_info.tel }}
						</view>
					</view>
          <view class="de_content">
						<view class="key">
							所属院系
						</view>
						<view class="value">
							{{ instructor_info.major }}
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
			<view class="part second" style="padding-bottom: 144rpx;">
				<view class="de_total_title sub_title">
					队员信息
				</view>
				<view>
					<view class="cu-item" v-for="(item,index) in memberList" :key="index">
						<view class="cu-card article" :class="isCard?'':'no-card'">
								<view class="cu-item shadow">
									<view class="title"><view class="text-cut">姓名：{{item.name}}</view></view>
									<view class="content">
										<view class="desc">
											<view class="text-content"> 学号: {{item.id}}</view>									
										</view>
										<view class="desc">
											<view class="text-content"> 院系: {{item.major}}</view>									
										</view>
										<view class="desc">
											<view class="text-content"> 年级: {{item.grade}}</view>									
										</view>
										<view class="desc">
											<view class="text-content"> 联系电话: {{item.tel}}</view>									
										</view>
										<view class="desc">
											<view class="text-content"> 邮箱: {{item.email}}</view>									
										</view>
									</view>
								</view>
						</view>
					</view>
			</view>
			</view>
		</view>

    <view class="button-container" v-if="team_info.verification_status === 4">
      <button class="status-label passed" @click="handlePass()">通过</button>
	  <view style="width:20rpx;"></view>
      <button class="status-label rejected" @click="handleReject()" >驳回</button>
    </view>
    <view class="done-container passed" v-else-if="team_info.verification_status === 2">
      <text class="status"  >已通过</text>
    </view>
    <view class="done-container rejected" v-else-if="team_info.verification_status === 3">
      <text class="status">已驳回</text>
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
				team_id: '',
        		team_info: {

        	},
        	instructor_info:{

        	},
			memberList:[

			],
		}
	},
		computed: {
			...mapState(['hasLogin', 'forcedLogin','user_id', 'userInfo'])
		},
		mounted() {
      		console.log("发出请求");
			  console.log("team_id",this.team_id);
			uni.request({
				// url: this.$url.BASE_URL + '/school/teamInfo',
				url: this.$url.BASE_URL + '/school/teamInfo',
				header:{
						Authorization:uni.getStorageSync("token")
					},
				method: 'GET',
				data: {
					id: this.team_id,
					// token: this.$userinfo.token
					// activity_status: this.index
				},
				success: res => {
            		console.log(res.data.data);
            		console.log(res.data.code);
					//队伍信息
					if(res.data.code == 200){
              			this.team_info = res.data.data.team_info;
              			this.instructor_info = res.data.data.instructor_info;
              			this.memberList = res.data.data.members_list;					
					}
            		else if(res.data.code == 500){
						this.$u.toast(`请求失败，队伍不存在！`);
					}
					this.net_error = false;

					},
					fail: res => {
						this.net_error = true;
					},
					complete: () => {
					}
				})
    	},
		onLoad(options) {
			const team_id = options.team_id;
			this.team_id = team_id;
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
			handlePass(){
				console.log("审核：通过");
				uni.request({
					// url: this.$url.BASE_URL + '/school/approveTeam',
					url: this.$url.BASE_URL + '/school/approveTeam',
					header:{
						Authorization:uni.getStorageSync("token")
					},	
					method: 'PUT',
					data: {
						id: this.team_info.id,
						approve: 1
					},
					success: res => {
						if(res.data.code==200){
							this.$u.toast(`审核成功！已通过申请。`);
							// 重新显示
							this.team_info.verification_status = 2;
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
			handleReject(){
				console.log("审核：驳回");
				uni.request({
					// url: this.$url.BASE_URL + '/school/approveTeam',
					url: this.$url.BASE_URL + '/school/approveTeam',
					header:{
						Authorization:uni.getStorageSync("token")
					},	
					method: 'PUT',
					data: {
						id: this.team_info.id,
						approve: 2
					},
					success: res => {
						if(res.data.code==200){
							this.$u.toast(`审核成功！已驳回申请。`);
							// 重新显示
							this.team_info.verification_status = 3;
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
		}
	}
</script>
 
<style>
.page {
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
	padding-right: 25rpx;
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
	display: inline-block;
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
/* 队员列表 */
.content {
  display: flex;
  flex-direction: column;
}

.cu-item{
  margin: 0;
  margin-top: 10rpx;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
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
/*修改入口*/
.margin-left-sm{
	margin-left: auto;
}
.cu-btn{
	border-radius: 10px;
   	background-color: rgb(43 41 41 / 30%);
   	backdrop-filter: blur(10px);
}
.modify{
	display: inline-block;
	margin-left: 300rpx;
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
