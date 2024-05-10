<!--
 * @Author: happy 2630391116@qq.com
 * @Date: 2024-04-29 16:32:53
 * @LastEditors: happy 2630391116@qq.com
 * @LastEditTime: 2024-05-10 14:52:31
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
								<text class="text-xl text-bold">{{item.veri_status}}</text>
							</view>
							<view class="action right-buttons" v-if="item.veri_status === '待审核'" >
									<button class="cu-btn bg-blue shadow-blur" @click="handlePass(item)">通过</button>
									<button class="cu-btn bg-grey shadow-blur" @click="handleReject(item)">驳回</button>
							</view>
							<view class="action right-buttons" v-if="item.veri_status === '已审核'" >
								<span class="status-label passed" v-if="item.verification_status === 2">已通过</span>
    							<span class="status-label rejected" v-if="item.verification_status === 3">已驳回</span>
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

				],
				isSearch: false
			}
		},
		onLoad() {

		},
		mounted() {
			console.log("this.isSearch"+this.isSearch)
			// 组件被挂载后发起请求
			if(!this.isSearch) //搜索的话不调用这个接口
				this.getAll();
		},
		methods: {
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
			},
			// 获取全部活动
			getAll(){
				console.log("获取全部this.isSearch="+this.isSearch);
				uni.request({
					url: this.$url.BASE_URL + '/4142061-0-default/school/teams',
					// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
                	header:{
						Authorization:uni.getStorageSync("token")
					},	
					method: 'GET',
					data: {
						// community_id: '0',
						// token: this.$userinfo.token
                	    // activity_status: this.index
						status: 0
					},
					success: res => {						
						this.acList = res.data.data.list;
						console.log("成功请求-查询高校队伍列表-全部");
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
			updateIsSearch(newVal){
				this.isSearch = newVal;
				// 触发事件通知父组件更新数据
				this.$emit('update:is-search', this.isSearch);
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
.avatar {
	width: 50rpx;
	height: 50rpx;
	border-radius: 50%;
	background-color: #ffffff;
	margin-right: 10px;
}
</style>