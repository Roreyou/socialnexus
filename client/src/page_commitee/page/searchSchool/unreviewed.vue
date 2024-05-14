<!-- 团委 待审核的高校队伍 -->
<template>
	<view class="content">
		<view class="cu-item" v-for="(item,index) in acList" :key="index">
			<view class="cu-card article" :class="isCard?'no-card':''" @click="todetail(item.id)" >
					<view class="cu-item shadow">
						<view class="cu-bar bg-white">
							<!-- 卡片的最上面一行 -->
							<view class="action">
								<text class="cuIcon-titles text-green"></text>
								<text class="text-xl text-bold">{{item.veri_status}}</text>
							</view>
							<view class="action right-buttons" v-if="item.veri_status === '未审核'" >
									<button class="cu-btn bg-green shadow-blur" @click="handlePass(item)">通过</button>
									<button class="cu-btn bg-grey shadow-blur" @click="handleReject(item)">驳回</button>
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
    		没有符合要求的队伍
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
			this.getAllUnreviewed();
		},
		methods: {
			getAllUnreviewed(){
				uni.request({
					url: this.$url.BASE_URL + '/4142061-0-default/school/teams',
					// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
                	header:{
						Authorization:uni.getStorageSync("token")
					},	
					method: 'GET',
					data: {
						// token: this.$userinfo.token
                	    // activity_status: this.index
						status: 2
					},
					success: res => {						
						this.acList = res.data.data.list;
						console.log("成功请求-获取高校队伍列表-未审核");
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
					url:'/page_commitee/page/details/teamDetails?team_id=' + id
				});
				// this.$u.route({
				// 	url: 'pages/school/details/details?acti_id=' + id
				// })
			},
			// 审核：通过
			handlePass(item){
				console.log("审核：通过");
				uni.request({
					url: this.$url.BASE_URL + '/4142061-0-default/school/approveTeam',
					header:{
						Authorization:uni.getStorageSync("token")
					},	
					method: 'PUT',
					data: {
						id: item.id,
						approve: 1
					},
					success: res => {
						if(res.data.code==200){
							this.$u.toast(`审核成功！已通过申请。`);
							// 重新显示
							this.getAllUnreviewed();
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
				console.log("审核：驳回");
				uni.request({
					url: this.$url.BASE_URL + '/4142061-0-default/school/approveTeam',
					header:{
						Authorization:uni.getStorageSync("token")
					},	
					method: 'PUT',
					data: {
						id: item.id,
						approve: 2
					},
					success: res => {
						if(res.data.code==200){
							this.$u.toast(`审核成功！已驳回申请。`);
							// 重新显示
							this.getAllUnreviewed();
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
<style scoped>
.no-activities{
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