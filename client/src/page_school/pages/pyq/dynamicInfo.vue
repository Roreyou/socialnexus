<!-- 帖子详情 -->
<template>
	<view>
		<!-- <u-navbar :is-back="true" title="动态详情">
		</u-navbar> -->
		
		<view class="warp" >
			<kgDynamics v-if="dyinfoshow" :dyInfo="dyInfo" :isInfo="true"  @comContent="comContent" @comLikes="comLikes" ></kgDynamics>
			<view class="fenge">
				<u-section title="评论内容" :arrow="false" :color="bgColor" :sub-title="leng + '条评论'"></u-section>
			</view>
			<kgComment v-if="showCom" :commentList="comList" @delCom="delCom()" @replyContent="replyContent" @replyLike="replyLike" @replyLike2="replyLike2" ></kgComment>
				
			<u-popup v-model="comShow" mode="bottom" border-radius="14">
				<view class="bodys">
					<u-form :model="comModal" :rules="rules" ref="comForm" :errorType="errorType">
						<u-form-item :border-bottom="false"  prop="comInfo">
							<u-input v-model="comModal.comInfo" type="textarea" placeholder="请输入评论内容" :border="border"
								:border-color="borderColor" :height="height" :auto-height="autoHeight" />
						</u-form-item>
					</u-form>
					<!-- <view class="cardZw">
						上传照片
					</view>
					<u-upload :custom-btn="true" max-count="4" ref="uUpload"  :action="action" :file-list="comModal.comImgs" :auto-upload="true">
						<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
							<image src="http://scu5azomr.hn-bkt.clouddn.com/static/icon/upload.png"></image>
						</view>
					</u-upload> -->
					
					<view class="bodys_btn">
						<u-button :custom-style="customStyles" :ripple="true" @click="saveComInfo()"
							ripple-bg-color="#ff9b01">评论</u-button>
					</view>
				</view>
			</u-popup>
			
			<u-popup v-model="repShow" mode="bottom" border-radius="14">
				<view class="bodys">
					<u-form :model="repModal" :rules="rules" ref="repForm" :errorType="errorType">
						<u-form-item :border-bottom="false"  prop="replyInfo">
							<u-input :style="{ fontSize: '25rpx' }" v-model="repModal.replyInfo" type="textarea" placeholder="请输入回复内容" :border="border"
								:border-color="borderColor" :height="height" :auto-height="autoHeight" />
						</u-form-item>
					</u-form>
					<view class="bodys_btn">
						<u-button :custom-style="customStyles" :ripple="true" @click="saveReplyInfo()"
							ripple-bg-color="#ff9b01">回复</u-button>
					</view>
				</view>
			</u-popup>
		</view>

		
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import kgComment from "../../../page_school/components/kg-com/kg-comment.vue"
	import kgDynamics from "../../../page_school/components/kg-dy/kg-dynamic.vue"
	export default {
		components: {
			kgComment,
			kgDynamics
		},
		data() {
			return {
				dyinfoshow: true,
				showCom: true,
				customStyles: {
					marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					backgroundColor: '#ffcc01',
					boxShadow: '0 0 0px #ffcc01',
				},
				dyId:null,
				loading: true,
				background: '',
				dyInfo: {
				},
				comList: [{
				}],
				bgColor: '#ffcc01',
				baseUrl:'',
				comModal: {
					userId:null,
					dyId:null,
					comInfo:'',
					comImgs:[],
				},
				repModal: {
					userId:null,
					dyId:null,
					comId:null,
					replyInfo:'',
				},
				comShow: false,
				repShow: false,
				action:'',
				rules: {
					comInfo: [{
							required: true,
							message: '请填写评论信息'
						},
						{
							min: 1,
							message: '评论信息不能少于1个字',
							trigger: 'change',
						},
					],
					replyInfo: [{
							required: true,
							message: '请填写评论信息'
						},
						{
							min: 1,
							message: '评论信息不能少于1个字',
							trigger: 'change',
						},
					],
				},
				errorType: ['toast'],
				border: true,
				height: 300,
				autoHeight: true,
				borderColor: '#000000',
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin','user_id','userInfo']),
			leng() {
				return this.comList.length;
			},
		},
		onLoad(options) {
			const id = options.id;
			//发送获取这条帖子详情的请求
			uni.request({
				url: this.$url.BASE_URL + '/schoolteam/pyq/getdetail',
				
				header:{
							Authorization:uni.getStorageSync("token")
						},
				method: 'GET',
				data: {
					post_id: id,
					team_id: this.user_id,
					// token: this.$userinfo.token
				},
				success: res => {
					this.dyInfo = res.data.data.post_detail;
					this.dyInfo.fabulous = res.data.data.post_detail.fabulous;  
					this.comList = res.data.data.comment_list;
					// this.dyInfo.keywords = "服务,实践"
					// console.log(this.acList)
					this.net_error = false;
				},
				fail: res => {
					this.net_error = true;
				},
				complete: () => {
				}
			})
		},

		watch: {
		},

		methods: {
			// 评论消息
			comContent(id){
				this.comShow = true;
				this.comModal.dyId = id;
				// this.comModal.userId = this.$userinfo.id;
			},
			// 评论消息
			//回复评论
			replyContent(id){  //id是评论id
				this.repShow = true
				this.repModal.comId = id
			},
			saveReplyInfo(){
				if(!this.userInfo.isUser){
				const _this = this;
				uni.showModal({
						title: '',
						content: '请登录后发表回复。是否前去登录？',
						success: function(res) {
						if (res.confirm) {
							// 用户点击了确定
							uni.reLaunch({
								url: '/pages/login/login'
							})
							// 在这里可以编写用户点击确定后的逻辑
						} else if (res.cancel) {
							// 用户点击了取消
							return;
							// 在这里可以编写用户点击取消后的逻辑
						}
						}
					});
					return
				}
				if(!this.userInfo.isleader){
					this.$u.toast(`只有队长能回复评论！`);
					return;
				}
				const id = this.repModal.comId
				// console.log("id: ",id)
					//在这里得到回复内容，发请求
					uni.request({
					url: this.$url.BASE_URL + '/schoolteam/pyq/reply',
					
					header:{
							Authorization:uni.getStorageSync("token")
						},
					method: 'POST',
					data: {
						comment_id: id,
						reply_content: this.repModal.replyInfo,
						team_id: this.user_id,
					},
					success: res => {
						let code = res.data.code;
						// console.log(this.acList)
						if(code == 200){
							uni.showToast({
								title: `回复成功`
							})
							this.repShow = false //关掉回复窗口
							
							let new_like_list = res.data.data.reply_list;
							// 更新这条评论的回复列表
							for (let i = 0; i < this.comList.length; i++) {
								if (this.comList[i].comment_detail.id === id) {
									this.comList[i].reply_list = new_like_list;
									this.comList[i].comment_detail.reply_list_length = this.comList[i].comment_detail.reply_list_length + 1;
									break; // 找到匹配对象后跳出循环
								}
							}
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

					},
					fail: res => {
						this.net_error = true;
					},
					complete: () => {
					}
				})
			},
			saveComInfo(){
				if(!this.userInfo.isUser){
				const _this = this;
				uni.showModal({
						title: '',
						content: '请登录后发表评论。是否前去登录？',
						success: function(res) {
						if (res.confirm) {
							// 用户点击了确定
							uni.reLaunch({
								url: '/pages/login/login'
							})
							// 在这里可以编写用户点击确定后的逻辑
						} else if (res.cancel) {
							// 用户点击了取消
							return;
							// 在这里可以编写用户点击取消后的逻辑
						}
						}
					});
					return
				}
				const id = this.comModal.dyId
				// console.log("id: ",id)
					//在这里得到回复内容，发请求
					uni.request({
					url: this.$url.BASE_URL + '/schoolteam/pyq/comment',
					
					header:{
					Authorization:uni.getStorageSync("token")
				},	
					method: 'POST',
					data: {
						post_id: id,
						text: this.comModal.comInfo,
						team_id: this.user_id,
					},
					success: res => {
						let code = res.data.code;
						// console.log(this.acList)
						if(code == 200){
							uni.showToast({
								title: `评论成功`
							})
							// console.log("评论成功")
							this.comShow = false //关掉回复窗口
							
							let newlist = res.data.data.comment_list;
							// console.log("newlist:", newlist)
							this.comList = newlist;
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

					},
					fail: res => {
						this.net_error = true;
					},
					complete: () => {
					}
				})
			},

			//喜欢数
			comLikes(id){   //id是帖子id
				if(!this.userInfo.isUser){
				const _this = this;
				uni.showModal({
						title: '',
						content: '请登录后点赞帖子。是否前去登录？',
						success: function(res) {
						if (res.confirm) {
							// 用户点击了确定
							uni.reLaunch({
								url: '/pages/login/login'
							})
							// 在这里可以编写用户点击确定后的逻辑
						} else if (res.cancel) {
							// 用户点击了取消
							return;
							// 在这里可以编写用户点击取消后的逻辑
						}
						}
					});
				}
				else{

				uni.request({
					url: this.$url.BASE_URL + '/schoolteam/pyq/likepost',  //点赞和取消点赞会发请求，后端决定怎么处理
					
					header:{
					Authorization:uni.getStorageSync("token")
				},	
					method: 'POST',
					data: {
						post_id: id,
						team_id: this.user_id
						// reply_content: this.repModal.replyInfo
					},
					success: res => {
						let code = res.data.code;
						// console.log(this.acList)
						if(code == 200){
							if(this.dyInfo.fabulous){
								this.$u.toast(`成功取消点赞`);
								this.dyInfo.like = this.dyInfo.like - 1
							}
							else{
								this.$u.toast(`点赞成功`);
								this.dyInfo.like = this.dyInfo.like + 1
							}
							//UI效果
							this.dyInfo.fabulous = (!this.dyInfo.fabulous)
							
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

					},
					fail: res => {
						this.net_error = true;
					},
					complete: () => {
					}
				})
				}
			},
			replyLike(id){   //评论的点赞（但不是评论的回复的点赞, 回复的点赞还要另外加函数）
				if(!this.userInfo.isUser){
				const _this = this;
				uni.showModal({
						title: '',
						content: '请登录后点赞评论。是否前去登录？',
						success: function(res) {
						if (res.confirm) {
							// 用户点击了确定
							uni.reLaunch({
								url: '/pages/login/login'
							})
							// 在这里可以编写用户点击确定后的逻辑
						} else if (res.cancel) {
							// 用户点击了取消
							return;
							// 在这里可以编写用户点击取消后的逻辑
						}
						}
					});
					return
				}
				uni.request({
					url: this.$url.BASE_URL + '/schoolteam/pyq/likecom', //点赞和取消点赞 评论
					header:{
					Authorization:uni.getStorageSync("token")
				},					
					method: 'POST',
					data: {
						comment_id: id,
						team_id: this.user_id,
						// reply_content: this.repModal.replyInfo
					},
					success: res => {
						let code = res.data.code;
						// console.log(this.acList)
						if(code == 200){
							let index = 0;
							let list = this.comList;

							for (let i = 0; i < this.comList.length; i++) {
								if (this.comList[i].comment_detail.id === id) {
									index = i 
									// console.log("this.comList[index]: ", this.comList[index])
									break; 
								}
							}

							if(this.comList[index].comment_detail.fabulous){
								this.$u.toast(`成功取消点赞`);
								this.comList[index].comment_detail.like = this.comList[index].comment_detail.like - 1
							}
							else{
								this.$u.toast(`点赞成功`);
								this.comList[index].comment_detail.like = this.comList[index].comment_detail.like + 1
							}
							//UI效果
							this.comList[index].comment_detail.fabulous = (!this.comList[index].comment_detail.fabulous)
							
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

					},
					fail: res => {
						this.net_error = true;
					},
					complete: () => {
					}
				})
			},

			//回复的点赞和取消点赞
			replyLike2(com_index, index2){
				if(!this.userInfo.isUser){
				const _this = this;
				uni.showModal({
						title: '',
						content: '请登录后点赞回复。是否前去登录？',
						success: function(res) {
						if (res.confirm) {
							// 用户点击了确定
							uni.reLaunch({
								url: '/pages/login/login'
							})
							// 在这里可以编写用户点击确定后的逻辑
						} else if (res.cancel) {
							// 用户点击了取消
							return;
							// 在这里可以编写用户点击取消后的逻辑
						}
						}
					});
					return
				}
			uni.request({
				url: this.$url.BASE_URL + '/schoolteam/pyq/likereply', //点赞和取消点赞 评论
				header:{
				Authorization:uni.getStorageSync("token")
			},					
				method: 'POST',
				data: {
					reply_id: this.comList[com_index].reply_list[index2].id,
					team_id: this.user_id,
					// reply_content: this.repModal.replyInfo
				},
				success: res => {
					let code = res.data.code;
					if(code == 200){
						if(this.comList[com_index].reply_list[index2].fabulous){
							this.$u.toast(`成功取消点赞`);
							this.comList[com_index].reply_list[index2].like = this.comList[com_index].reply_list[index2].like - 1
						}
						else{
							this.$u.toast(`点赞成功`);
							this.comList[com_index].reply_list[index2].like = this.comList[com_index].reply_list[index2].like + 1
						}
						//UI效果
						this.comList[com_index].reply_list[index2].fabulous = (!this.comList[com_index].reply_list[index2].fabulous)			
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

						},
						fail: res => {
							this.net_error = true;
						},
						complete: () => {
						}
					})
					},


			// 删除评论
			delCom(comId){   
				uni.request({
					url: this.$url.BASE_URL + '/schoolteam/pyq/delcomment', //删除评论
					header:{
					Authorization:uni.getStorageSync("token")
				},				
					method: 'POST',
					data: {
						comment_id: comId,
					},
					success: res => {
						let code = res.data.code;
						// console.log(this.acList)
						code = 0  //先强制
						if(code == 0){
							this.$u.toast(`删除成功！`);
							const filteredList = this.comList.filter(item => item.comment_detail.id !== comId);
							this.comList = filteredList;
						}

					},
					fail: res => {
						this.net_error = true;
					},
					complete: () => {
					}
				})

			},
			previewImage(url, urls) {
				uni.previewImage({
					current: url, // 当前显示图片的http链接
					urls: urls // 需要预览的图片http链接列表
				});
			},
			
			
		}

	}
</script>

<style lang="scss" scoped>
	.warp {
		background-color: #FFFFFF;
		margin-bottom: 100px;
	}

	.fenge {
		padding: 10px;
	}

	.load_more {
		margin-top: 100px;
	}

	.bodys{
		padding: 20px;	
	}
	
	.cardZw {
		margin: 10px 0px;
	}
	.slot-btn {
		width: 200rpx;
		height: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(244, 245, 246);
		border-radius: 10rpx;
	
		image {
			width: 60px;
			height: 60px;
		}
	}
	
	.slot-btn__hover {
		background-color: rgb(235, 236, 238);
	}
	.info_iput {
		padding: 20px;
		font-weight: 600;
	
	}
	
	.u-input--border {
		border-radius: 30rpx !important;
		border: 2px solid #000000 !important;
	}
	
	.u-form-item {
		padding: 10rpx 0 !important;
	}
</style>
