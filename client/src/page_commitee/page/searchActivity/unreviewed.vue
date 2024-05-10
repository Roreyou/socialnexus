<!-- 团委 待审核的社区需求 -->
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
							<view class="action right-buttons" v-if="item.veri_status === '待审核'" >
									<button class="cu-btn bg-blue shadow-blur" @click="handlePass(item)">通过</button>
									<button class="cu-btn bg-grey shadow-blur" @click="handleReject(item)">驳回</button>
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
					// 	veri_status: "待审核",
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
			this.getAllUnreviewed();
		},
		methods: {
			getAllUnreviewed(){
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
						status: '未审核'
					},
					success: res => {						
						this.acList = res.data.data;
						console.log("成功请求-查询社区需求列表-未审核");
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
			// 审核：通过
			handlePass(item){
				console.log("审核：通过");
				uni.request({
					url: this.$url.BASE_URL + '/4142061-0-default/school/approveActivity',
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
					url: this.$url.BASE_URL + '/4142061-0-default/school/approveActivity',
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
</style>