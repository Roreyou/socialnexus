<!-- 高校 评论点赞通知 -->
<template>
<view class="main">
	<view class="cu-bar bg-white solid-bottom margin-top">
		<view class="action">
			<text class="cuIcon-title text-green "></text> 新消息
		</view>
	</view>
	<view class="cu-list menu-avatar">
		<!-- 评论 -->
		<view class="cu-item" v-for="(item,index) in comment_list" :key="index" @click="gotopost(item.post_id)">
			<view class="cu-avatar radius lg" :style="{ 'background-image': 'url(' + item.team_avatar + ')' }"></view>
			<view class="content">
				<view class="text-pink"><view class="text-cut">{{item.team_name}}</view></view>
				<view class="text-gray text-sm flex"> <view class="text-cut">{{item.content}}</view></view>
			</view>
			<view class="action">
				<view class="text-grey text-xs">{{item.time}}</view>
				<view class="cu-tag round bg-red sm">1</view>
			</view>
		</view>

		<!-- 点赞 -->
		<view class="cu-item" v-for="(item,index) in like_list" :key="index" @click="gotopost(item.post_id)">
			<view class="cu-avatar radius lg" :style="{ 'background-image': 'url(' + item.team_avatar + ')' }"></view>
			<view class="content">
				<view>
					<view class="text-cut">{{item.team_name}}</view>
					<!-- <view class="cu-tag round bg-orange sm">断开连接...</view> -->
				</view>
				<view class="text-gray text-sm flex"> <view class="text-cut"> 点赞了你的帖子</view></view>
			</view>
			<view class="action">
				<view class="text-grey text-xs">{{item.time}}</view>
				<view class="cu-tag round bg-grey sm">1</view>
			</view>
		</view>

		<!-- 瓦罗兰大陆-睡衣守护者-新手保护营 -->
		<!-- <view class="cu-item cur">
			<view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg);">
				<view class="cu-tag badge"></view>
			</view>
			<view class="content">
				<view>
					<view class="text-cut">瓦罗兰大陆-睡衣守护者-新手保护营</view>
					<view class="cu-tag round bg-orange sm">6人</view>
				</view>
				<view class="text-gray text-sm flex">
					<view class="text-cut"> 伊泽瑞尔：<text class="cuIcon-locationfill text-orange margin-right-xs"></text> 传送中...</view></view>
			</view>
			<view class="action">
				<view class="text-grey text-xs">22:20</view>
				<view class="cuIcon-notice_forbid_fill text-gray"></view>
			</view>
		</view> -->
	</view>
</view>

</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				comment_list: [],
				like_list: [],
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin','user_id'])
		},
		mounted() {
        uni.request({
				url: this.$url.BASE_URL + '/schoolteam/pyq/getnotice',
				// url: 'https://mock.apifox.coml/m1/schoolteam/getRecommend',
				header:{
					Authorization:uni.getStorageSync("token")
				},	
				method: 'GET',
				data: {
					team_id: this.user_id,
				},
				success: res => {
					if(res.data.code == 200){
						this.comment_list = res.data.data.comment_list;
						// console.log(this.acList)
						this.like_list = res.data.data.like_list;
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


		methods: {
			gotopost(id){
				uni.request({
				url: this.$url.BASE_URL + '/schoolteam/pyq/delnotice',				
				method: 'POST',
				data: {
					team_id: this.user_id,
					post_id: id,
				},
				success: res => {
					if(res.data.code == 200){
						this.comment_list = this.comment_list.filter(item => item.post_id !== id);
						this.like_list = this.like_list.filter(item => item.post_id !== id);
						uni.navigateTo({
							url: "/page_school/pages/pyq/dynamicInfo?id=" + id
						})
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
.main{
	margin-top: -40px;
}
.content{
	margin-top: 5px;
}
</style>