<!-- 帖子详情 -->
<template>
	<view>
		<!-- <u-navbar :is-back="true" title="动态详情">
		</u-navbar> -->
		
		<view class="warp" >
			<kgDynamics :dyInfo="dyInfo" :isInfo="true"  @comContent="comContent" @comLikes="comLikes" ></kgDynamics>
			<view class="fenge">
				<u-section title="评论内容" :arrow="false" :color="bgColor" :sub-title="comList.length + '条评论'"></u-section>
			</view>
			<kgComment :commentList="comList" @delCom="delCom()" @replyContent="replyContent" @replyLike="replyLike" ></kgComment>
				
			<u-popup v-model="comShow" mode="bottom" border-radius="14">
				<view class="bodys">
					<u-form :model="comModal" :rules="rules" ref="comForm" :errorType="errorType">
						<u-form-item :border-bottom="false"  prop="comInfo">
							<u-input v-model="comModal.comInfo" type="textarea" placeholder="请输入评论内容~" :border="border"
								:border-color="borderColor" :height="height" :auto-height="autoHeight" />
						</u-form-item>
					</u-form>
					<view class="cardZw">
						上传照片
					</view>
					<u-upload :custom-btn="true" max-count="4" ref="uUpload"  :action="action" :file-list="comModal.comImgs" :auto-upload="true">
						<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
							<image src="../../../static/icon/upload.png"></image>
						</view>
					</u-upload>
					
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
							<u-input v-model="repModal.replyInfo" type="textarea" placeholder="请输入回复内容~" :border="border"
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
	import kgComment from "../../../components/kg-com/kg-comment.vue"
	import kgDynamics from "../../../components/kg-dy/kg-dynamic.vue"
	export default {
		components: {
			kgComment,
			kgDynamics
		},
		data() {
			return {
				customStyles: {
					marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					backgroundColor: '#ffcc01',
					boxShadow: '0 0 0px #ffcc01',
				},
				dyId:null,
				loading: true,
				background: '',
				dyInfo: {
					// id:1,
					// type: 1,
					// avatarUrl: 'https://img0.baidu.com/it/u=1801510667,176844939&fm=26&fmt=auto',
					// userName: '的分布',
					// pushTime: '2021-12-17 12:51:55',
					// content: '山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？',
					// dyImgs: [
					// 	'https://tse3-mm.cn.bing.net/th/id/OIP-C.g9UbVfyVZX-SfD09JcYr5QHaEK?w=246&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
					// 	'https://tse3-mm.cn.bing.net/th/id/OIP-C.g9UbVfyVZX-SfD09JcYr5QHaEK?w=246&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
					// ],
					// tags: [{
					// 		name: '顺丰客服',
					// 		type: 'success'
					// 	},
					// 	{
					// 		name: '2222',
					// 		type: 'info'
					// 	}, {
					// 		name: '3333',
					// 		type: 'info'
					// 	}, {
					// 		name: 'ashdfknasdf',
					// 		type: 'info'
					// 	},

					// ],
					// fabulous:false,
					// dyLike: 10,
				},
				comList: [{
						// id:1,
						// avatarUrl: "https://tse3-mm.cn.bing.net/th/id/OIP-C.g9UbVfyVZX-SfD09JcYr5QHaEK?w=246&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
						// nickName: "阿康",
						// comInfo: "评论",
						// comImgs: ["https://tse3-mm.cn.bing.net/th/id/OIP-C.g9UbVfyVZX-SfD09JcYr5QHaEK?w=246&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7","https://tse3-mm.cn.bing.net/th/id/OIP-C.g9UbVfyVZX-SfD09JcYr5QHaEK?w=246&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"],
						// comTime: "2022-03-12 17:20:55",
						// fabulous:false,
						// comLike: 99,
						// replyList: [{
						// 	id:1,
						// 	avatarUrlr: "https://tse3-mm.cn.bing.net/th/id/OIP-C.g9UbVfyVZX-SfD09JcYr5QHaEK?w=246&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
						// 	nickNamer: "阿康",
						// 	replyInfo: "评论的回复"
						// }]
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
		onLoad(options) {
			const id = options.id;
			//发送获取这条帖子详情的请求

			console.log("onload")
			uni.request({
				url: this.$url.BASE_URL + '/4142061-0-default/schoolteam/pyq/getdetail',
				// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
				
				method: 'GET',
				data: {
					post_id: id,
					// token: this.$userinfo.token
				},
				success: res => {
					console.log("res.data,", res.data)
					this.dyInfo = res.data.date.post_detail;  //不知道为什么mock的时候是date，明明文档是data，到时候记得改一下
					this.dyInfo.fabulous = false;  
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
		methods: {
			// 评论消息
			comContent(id){
				this.comShow = true
			},
			// 评论消息
			replyContent(id){
				this.repShow = true
			},
			
			//喜欢数
			comLikes(id){
				if(this.dyInfo.fabulous){
					//去掉点赞逻辑
					this.dyInfo.fabulous = false
					this.dyInfo.dyLike = this.dyInfo.dyLike - 1
					this.$u.toast(`成功取消点赞`);
					return
				}
				this.dyInfo.fabulous = true
				this.dyInfo.dyLike = this.dyInfo.dyLike + 1
				this.$u.toast(`点赞成功~`);
			},
			replyLike(index){
				if(this.dyInfo.comList[index].fabulous){
					this.dyInfo.comList[index].fabulous = false
					this.dyInfo.comList[index].comLike = this.dyInfo.comList[index].comLike - 1
					// this.$set(this.dyInfo.comList[index], 'dyLike', this.dyInfo.comList[index].dyLike - 1);
					this.$u.toast(`成功取消点赞`);
					return
				}
				this.dyInfo.comList[index].fabulous = true
				this.dyInfo.comList[index].comLike = this.dyInfo.comList[index].comLike + 1
				this.$u.toast(`点赞成功~`);
			},
			// 删除评论
			delCom(comId){
				//这里需要发送一个删除这条评论的请求
				//先在前端删掉
				const filteredList = this.dyInfo.comList.filter(item => item.id !== comId);
				this.dyInfo.comList = filteredList;
				this.$u.toast(`删除成功！`);
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
