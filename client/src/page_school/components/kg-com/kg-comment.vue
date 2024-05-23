<!-- 高校帖子评论列表 -->
<template>
	<view class="warp">
		<view class="cot" v-for="(item,index) in commentList" :key="index">
			<view class="cot_avatar">
				<!-- <u-avatar :src="item.avatarUrl" mode="square" size="80"></u-avatar> -->
				<u-avatar :src="item.comment_detail.team_avatar" mode="square" size="80"></u-avatar>
			</view>
			<view class="cot_flirt">
				<view class="cot_flirt_name">
					{{item.comment_detail.my_name}}
				</view>
				<image v-if="item.comment_detail.del_flag" @click="delCom(item.comment_detail.id)" class="cot_flirt_shanchu" src="http://scu5azomr.hn-bkt.clouddn.com/static/icon/shanchu.png"></image>
			</view>
			<view class="cot_content">
				{{item.comment_detail.content}}
			</view>
			<!-- <view class="">
				<view class="img5">
					<image @tap.stop="previewImage(img, item.comImgs)" :src="img" v-for="(img,index2) in item.comImgs"
						:key="index2" mode="aspectFill"></image>
				</view>
			</view> -->
			<view class="cot_operate">
				<view class="cot_operate_time">
					<!-- 过滤器，之后需要用到的时候再来定义
					{{item.comTime | timeago}}    -->
					{{item.comment_detail.time}}
				</view>
				<view class="cot_operate_icon">
					<image src="http://scu5azomr.hn-bkt.clouddn.com/static/icon/pinglun1.png" mode="" @click="replyContent(item.comment_detail.id)" ></image>
					<view class="" @click="replyContent(item.comment_detail.id)">
						{{item.comment_detail.reply_list_length}}
					</view>
					<image class="like_icon" :src="item.comment_detail.fabulous?'http://scu5azomr.hn-bkt.clouddn.com/static/icon/like_fil.png':'http://scu5azomr.hn-bkt.clouddn.com/static/icon/like_ufil.png'"
					 mode=""  @click="replyLike(item.comment_detail.id)"></image>
					<view class="" @click="replyLike(item.comment_detail.id)">
						{{item.comment_detail.like}}
					</view>
				</view>
			</view>
		
			<view class="reply" v-for="(rep,index2) in item.reply_list" :key="index2">
				<view class="reply_user">
					<view class="reply_user_info">
						<u-avatar :src="rep.team_avatar" mode="square" size="80"></u-avatar>
						<view class="reply_user_info_name">
							{{rep.reply_name}}
						</view>
					</view>
					<view class="reply_user_like">
					 <image class="reply_user_shanchu" :src="getChildSrc(item, rep)" @click="replyLike2(index, index2)"></image>
						{{ rep.like }}
					</view>
					

				</view>
				<view class="reply_content">
					{{rep.content}}
				</view>
				<u-line color="#FFC107" border-style="dotted" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "comment",
		props: {
			commentList: {
				type: Array,
				default:[
				]
			}
		},
		data() {
			return {
				avatarUrl: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.8Zujx-NGIfUypDUetU95JwHaHv?w=153&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
				background: '',
				baseUrl:'',
				replyavatarUrl: 'https://b0.bdstatic.com/f7de28343a3c2ccfb865e2f4f9d0c5fe.jpg@h_1280'
			};
		},
		watch: {
		},
		onLoad() {
			this.background = getApp().globalData.background

		},
		mounted(){
			// console.log("commentList:", this.commentList)
			    // Add watchers for childList items
				if (this.commentList && this.commentList.length) {
					this.commentList.forEach(parentItem => {
						if (parentItem.reply_list && parentItem.reply_list.length) {
						parentItem.reply_list.forEach(childItem => {
							this.$watch(
							() => childItem.fabulous,
							(newVal, oldVal) => {
								// 处理属性变化
								// console.log('childItem.fabulous changed:', newVal);
							}
							);
						});
						}
					});
				}
		},
		methods: {
			getChildSrc(parentItem, childItem) {
				return childItem.fabulous ? 'http://scu5azomr.hn-bkt.clouddn.com/static/icon/like_fil.png' : 'http://scu5azomr.hn-bkt.clouddn.com/static/icon/like_ufil.png';
			},
			delCom(comId){
				this.$emit('delCom',comId)
			},
			replyContent(comId){
				this.$emit('replyContent',comId)

			},
			replyLike(index){
				this.$emit('replyLike',index)
			},
			previewImage(url, urls) {
				uni.previewImage({
					current: url, // 当前显示图片的http链接
					urls: urls // 需要预览的图片http链接列表
				});
			},
			replyLike2(index, index2){
				this.$emit('replyLike2',index, index2)
			}
		}
	};
</script>

<style lang="scss" scoped>
	// 评论
	.cot {
		margin: 15px;
		padding: 10px;
		box-shadow: 0 0 5px #d2d2d2;
		position: relative;
		border-radius: 5px;

		&_avatar {
			position: absolute;
			top: -5%;
		}

		&_flirt {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 50px;


			image {
				width: 22px;
				height: 22px;
			}
		}

		&_content {
			margin-top: 5px;
			margin-bottom: 5px;
			text-indent: 25px;
		}

		&_operate {
			display: flex;
			justify-content: space-between;
			align-items: center;

			&_icon {
				display: flex;
				align-items: flex-end;

				image {
					width: 20px;
					height: 20px;
				}

			}
			&_time{
				color: #bebebe;
				font-size: 12px;
			}
		}
	}

	// 回复
	.reply {
		margin: 10px;

		&_user {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			margin-bottom: 5px;

			&_info {
				display: flex;
				align-items: flex-end;

				&_name {
					margin-left: 5px;
				}
			}

			&_shanchu {
				width: 20px;
				height: 20px;
			}

			&_like {
				display: flex;
				align-items: center;
			}
		}

		&_content {
			margin-bottom: 5px;
		}
	}

	.img5 {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	
		image {
			width: 20%;
			height: 120rpx;
			margin: 1%;
			border-radius: 5px;
		}
	}
	
	.like_icon{
		margin-left: 5px;
	}
</style>
