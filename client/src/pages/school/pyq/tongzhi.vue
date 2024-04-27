<!-- 高校 评论点赞通知 -->
//可以用colorUI的消息列表
<template>
<view class="main">
	<view class="cu-bar bg-white solid-bottom margin-top">
		<view class="action">
			<text class="cuIcon-title text-orange "></text> 消息列表
		</view>
	</view>
	<view class="cu-list menu-avatar">
		<!-- 凯尔 -->
		<!-- <view class="cu-item">
			<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
			<view class="content">
				<view class="text-grey">凯尔</view>
				<view class="text-gray text-sm flex">
					<view class="text-cut">
						<text class="cuIcon-infofill text-red  margin-right-xs"></text>
						我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。
					</view>
				</view>
			</view>
			<view class="action">
				<view class="text-grey text-xs">22:20</view>
				<view class="cu-tag round bg-grey sm">5</view>
			</view>
		</view> -->

		<!-- 瓦洛兰之盾-塔里克 -->
		<!-- <view class="cu-item">
			<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Taric.png);">
				<view class="cu-tag badge">99+</view>
			</view>
			<view class="content">
				<view class="text-grey">
					<view class="text-cut">瓦洛兰之盾-塔里克</view>
					<view class="cu-tag round bg-orange sm">战士</view>
				</view>
				<view class="text-gray text-sm flex">
					<view class="text-cut">
						塔里克是保护者星灵，用超乎寻常的力量守护着符文之地的生命、仁爱以及万物之美。塔里克由于渎职而被放逐，离开了祖国德玛西亚，前去攀登巨神峰寻找救赎，但他找到的却是来自星界的更高层的召唤。现在的塔里克与古代巨神族的神力相融合，以瓦洛兰之盾的身份，永不疲倦地警惕着阴险狡诈的虚空腐化之力。
					</view>
				</view>
			</view>
			<view class="action">
				<view class="text-grey text-xs">22:20</view>
				<view class="cuIcon-notice_forbid_fill text-gray"></view>
			</view>
		</view> -->

		<!-- <view class="cu-item ">
			<view class="cu-avatar radius lg" style="background-image:url(https://n.sinaimg.cn/sinacn21/200/w500h500/20180710/24f8-hfefkqp7840363.jpg);"></view>
			<view class="content">
				<view class="text-pink"><view class="text-cut">人工智能学院</view></view>
				<view class="text-gray text-sm flex"> <view class="text-cut">评论评论评论评论评论评论</view></view>
			</view>
			<view class="action">
				<view class="text-grey text-xs">22:20</view>
				<view class="cu-tag round bg-red sm">1</view>
			</view>
		</view> -->
		<!-- 评论 -->
		<view class="cu-item" v-for="(item,index) in comment_list" :key="index">
			<view class="cu-avatar radius lg" style="background-image:url(https://c-ssl.dtstatic.com/uploads/blog/202207/28/20220728161450_66b3d.thumb.1000_0.jpg);"></view>
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
		<view class="cu-item" v-for="(item,index) in like_list" :key="index">
			<view class="cu-avatar radius lg" style="background-image:url(https://ts1.cn.mm.bing.net/th/id/R-C.b3fc225f8d8274008f6e26ac7446cd99?rik=pvTqzLJCPQzY4A&riu=http%3a%2f%2fpic24.photophoto.cn%2f20120701%2f0005018385696950_b.jpg&ehk=vnpcrOQ7aNi3mpjFrBJtM1CecIwXAYZbAvGrn5C3wBM%3d&risl=&pid=ImgRaw&r=0);"></view>
			<view class="content">
				<view><view class="text-cut">{{item.team_name}}</view>
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
	export default {
		data() {
			return {
				comment_list: [],
				like_list: [],
			}
		},
		onLoad() {
			console.log('onLoad')
		},
		mounted() {
        uni.request({
				url: this.$url.BASE_URL + '/4142061-0-default/schoolteam/pyq/getnotice',
				// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
				
				method: 'GET',
				data: {
					team_id: '1',
				},
				success: res => {
					this.comment_list = res.data.data.comment_list;
					// console.log(this.acList)
					this.like_list = res.data.data.like_list;
				},
				fail: res => {
					this.net_error = true;
				},
				complete: () => {
				}
			})
    },


		methods: {

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