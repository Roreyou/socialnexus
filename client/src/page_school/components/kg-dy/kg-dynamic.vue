<!-- 朋友圈-详情-帖子的内容 -->
<template>
	<view>
		<view class="dynamic" @click.stop="isInfo?'':goInfo(dyInfo.id)">
			<view class="dynamic_header">
				<view class="dynamic_header_user">
					<view class="dynamic_header_user_avatar">
						<u-avatar :src="dyInfo.team_avatar" size="60"></u-avatar>
					</view>
					<view class="dynamic_header_user_info">
						<view class="dynamic_header_user_info_name">{{dyInfo.team_name}}</view>
						<view class="dynamic_header_user_info_time">{{dyInfo.post_time}}</view>
					</view>
				</view>
				<!-- <view class="dynamic_header_operate">
					<u-button :ripple="true" ripple-bg-color="#003d99" size="mini" type="warning">关注</u-button>
				</view> -->
			</view>

			<view class="dynamic_cont">
				<u-read-more showHeight="1000" :shadowStyle="shadowStyle" :fontSize="10">
					<rich-text :nodes="dyInfo.content"></rich-text>
				</u-read-more>
				<!-- 图片 -->
				<view class="dynamic_cont_img">
					<block v-if="leng > 0">
						<!-- 单张 -->
						<block v-if="leng == 1">
							<image class="iconLevel img1" @tap.stop="previewImage(img, dyInfo.picture)" :src="img"
								v-for="(img,index1) in dyInfo.picture" mode="aspectFill" :key="index1">
							</image>
						</block>
						<!-- 2张 -->
						<block v-if="leng == 2">
							<view class="img2">
								<image @tap.stop="previewImage(img, dyInfo.picture)" :src="img"
									v-for="(img,index2) in dyInfo.picture" :key="index2" mode="aspectFill"></image>
							</view>
						</block>
						<!-- 4张 -->
						<block v-if="leng == 4 ">
							<view class="img4">
								<image @tap.stop="previewImage(img, dyInfo.picture)" :src="img"
									v-for="(img,index3) in dyInfo.picture" :key="index3" mode="aspectFill"></image>
							</view>
						</block>
						<!-- 3/4张以上不包含4张 -->
						<block v-if="leng > 4 || leng == 3">
							<view class="img3">
								<image @tap.stop="previewImage(img, dyInfo.picture)" :src="img"
									v-for="(img,index4) in dyInfo.picture" :key="index4" mode="aspectFill"></image>
							</view>
						</block>
					</block>
				</view>
			</view>

			<!-- tag，先注释掉 -->
			<!-- <view class="dynamic_tag">
				<u-tag class="dynamic_tag_info" :text="'#'+tag.name" :type="tag.type" plain plainFill shape="circle"
					:key="index5" v-for="(tag,index5) in dyInfo.tags"></u-tag>
			</view> -->

			<view class="operate">
				<view class="operate_icon">
					<image src="http://scu5azomr.hn-bkt.clouddn.com/static/icon/address.png" mode=""></image>
					<view class="operate_text">
						{{ dyInfo.province }}
					</view>
				</view>
				<view class="operate_icon">
					<image src="http://scu5azomr.hn-bkt.clouddn.com/static/icon/pinglun1.png" mode="" @click="isInfo?comContent(dyInfo.id):''"></image>
					<view class="" @click="isInfo?comContent(dyInfo.id):''">
						{{dyInfo.com_num}}
					</view>
					<image class="like_icon" :src="dyInfo.fabulous?'http://scu5azomr.hn-bkt.clouddn.com/static/icon/like_fil.png':'http://scu5azomr.hn-bkt.clouddn.com/static/icon/like_ufil.png'"
					 mode="" @click="isInfo?comLike(dyInfo.id):''"></image>
					<view class="" @click="isInfo?comLike(dyInfo.id):''">
						{{dyInfo.like}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "dynamics",
		props: {
			dyInfo: {
				type: Object,
				default: []
			},
			isInfo: {
				type: Boolean
			},
		},
		computed: {
			leng() {
				if (!this.dyInfo || !this.dyInfo.picture) {
					return 0;
				}
				return this.dyInfo.picture.length;
			}
		},

		data() {
			return {
				shadowStyle: {
					backgroundImage: "none",
					paddingTop: "0",
					marginTop: "20rpx",
				},
				dyInfo:{
					picture:['']
				}
			};
		},
		onReady() {
			// console.log("dyInfo,", this.dyInfo);
		},
		methods: {
			previewImage(url, urls) {
				uni.previewImage({
					current: url, // 当前显示图片的http链接
					urls: urls // 需要预览的图片http链接列表
				});
			},
			goInfo(id) {
				uni.navigateTo({
					url: "/page_school/pages/pyq/dynamicInfo?id=" + id
				})
			},
			comContent(id){
				this.$emit('comContent',id)
			},
			comLike(id){
				this.$emit('comLikes',id)
			},
		}
	}
</script>

<style lang="scss">
	// 动态css
	.dynamic {
		background-color: #ffffff;
		padding: 10px 10px 5px 10px;
		margin-bottom: 5px;

		&_header {
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			&_user {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;

				&_avatar {}

				&_info {
					margin-left: 10px;

					&_time {
						color: #bebebe;
						font-size: 12px;
					}
				}
			}

			&_operate {
				margin-top: 10px;
			}
		}

		&_cont {
			margin-top: 10rpx;

			&_img {
				margin-top: 10rpx;

			}

			video {
				width: 100%;
			}
		}




		&_tag {
			margin-top: 5px;

			&_info {
				margin: 10px 2px;
			}
		}
	}



	.operate {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5px 8px;

		&_icon {
			display: flex;
			align-items: flex-end;

			image {
				width: 20px;
				height: 20px;
			}

		}

		&_text {
			font-size: 10px;
		}
	}
	
	.add{
		z-index: 1;
		position: fixed;
		right: 5%;
		bottom: 5%;
		height: 50px;
		width: 50px;
	}
	
	// 图片样式
	.img1 {
		display: block;
		max-height: 600rpx;
		border-radius: 5px;
		overflow: hidden;
	}
	
	
	.img2 {
		display: flex;
		flex-direction: row;
	
		image {
			margin: 5rpx;
			border-radius: 5px;
			width: 50%;
			height: 300rpx;
		}
	}
	
	.img3 {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	
		image {
			width: 31.3%;
			height: 200rpx;
			margin: 1%;
			border-radius: 5px;
		}
	}
	
	.img4 {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	
		image {
			width: 38%;
			height: 250rpx;
			margin: 1%;
			border-radius: 5px;
		}
	}
	
	.dynamic_tag{
		margin-top: 10px;
	}
	.operate{
		margin-top: 5px;
	}
	.dynamic_header{
		font-size: 15px;
	}
	.like_icon{
		margin-left: 5px;
	}
</style>
