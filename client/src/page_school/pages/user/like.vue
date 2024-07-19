<!-- 高校 活动收藏 -->
<template>
	<view class="content">
		<view class="cu-item" v-for="(item,index) in acList" :key="index" @click="todetail(item.id)">
			<view class="cu-card article others" :class="isCard?'no-card':''">
					<view class="cu-item shadow">
						<view class="title"><view class="text-cut">{{item.name}}</view></view>
						<view class="content">
							<view class="desc">
								<view class="text-content"> 时间: {{item.start_time}}-{{item.end_time}}</view>
								<view class="text-content"> 地点: {{item.address}}</view>
								<view class="text-content"> 活动类别: {{item.category_name}}</view>
								<view class="wordcont">	
									<view class="ackeywords" v-for="(word,index) in item.keywords.split(',')" :key="index">
										<view class="cu-tag bg-red light sm round">{{word}}</view>
									</view>
								</view>
							</view>
							<view class="favorite-button">
        						<button class="cancel-favorite" @click="cancelFavorite(item.id)">取消收藏</button>
      						</view>
						</view>
					</view>
			</view>
		</view>
		<u-empty v-if="acList.length == 0" text="暂无收藏，快去浏览活动吧" mode="favor" margin-top="60" font-size="35"></u-empty>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				acList: [],
				click_but: false
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin','user_id'])
		},
		onLoad() {
			uni.request({
				url: this.$url.BASE_URL + '/schoolteam/getteamfavor',
				
				header:{
					Authorization:uni.getStorageSync("token")
				},	
				method: 'GET',
				data: {
					team_id: this.user_id,
					// token: this.$userinfo.token
				},
				success: res => {
					if(res.data.code==200){
						this.acList = res.data.data.acti_list;
					// this.acList[0].keywords = "服务,实践"
					this.net_error = false;
					}else if(res.data.code == 401){
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
											uni.navigateBack()
											return;							
										}
										}
									});
									}

				},
				fail: res => {
					this.net_error = true;
				},
				complete: () => {
				}
			})
		},
		onshow(){

		},
		methods: {
			cancelFavorite(likeid){
				if(!this.userInfo.isUser){
					const _this = this;
					uni.showModal({
						title: '',
						content: '目前为游客模式，请登录后操作。是否前去登录？',
						success: function(res) {
							if (res.confirm) {
								// 用户点击了确定
								uni.reLaunch({
									url: '/pages/login/login'
								})
							} else if (res.cancel) {
								return;
							}
						}
					});
				}

				this.click_but = true
				uni.showModal({
    			    title: '确认取消收藏',
    			    content: '确定取消收藏吗？',
    			    success: (res) => {
    			      if (res.confirm) {
    			        // 用户点击了确认按钮

						uni.request({
							url: this.$url.BASE_URL + '/schoolteam/favor',
							header:{
								Authorization:uni.getStorageSync("token")
							},	
							method: 'PUT',
							data: {
								team_id: this.user_id,
								acti_id: likeid,
								favor: 1
							},
							success: res => {
								if(res.data.code==200){
									const filteredList = this.acList.filter(item => item.id !== likeid);
									this.acList = filteredList;
									this.$u.toast(`取消收藏成功！`);
								}else if(res.data.code == 401){
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
								else{
									this.$u.toast(`请重试`);
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
    			});
			},
			todetail(id){
				if(this.click_but){
					this.click_but = false;
					return
				}
				console.log("id:", id)
				// uni.navigateTo({
				// 	//注意用这个的话page前面有一个斜杠，不然会说找不到这个组件
				// 	url: '../../page_school/pages/details/details?acti_id=' + id
				// })
				uni.navigateTo({
					url:'/page_school/pages/details/details?acti_id=' + id
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
	margin-top: 10px;
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
.favorite-button{
	display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
}
.cancel-favorite{
	font-size: small;
}
.cancel-favorite {
    background: linear-gradient(to right, #ff4e50, #f9d423);
    color: white;
    border: none;
    padding: 0px 10px;
    text-align: center;
    font-size: 11px;
    border-radius: 20px;
    margin-top: 100rpx;
}

/* 卡片样式 */
.others{
	background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  margin-left: 25rpx;
  margin-right: 25rpx;
    margin-top: 10rpx;
}
</style>