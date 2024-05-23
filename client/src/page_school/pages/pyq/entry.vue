<!-- 高校 朋友圈 包含发布页面 -->
<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view> -->
		<home v-if="(currentTabComponent === 'home')&& posted"></home>
		<!-- <fabu v-if="currentTabComponent === 'fabu'"></fabu> -->
		<u-popup v-model="ispost" mode="bottom" border-radius="14">
				<view class="bodys">
					<u-form :model="comModal" :rules="rules" ref="comForm" :errorType="errorType">
						<u-form-item :border-bottom="false"  prop="comInfo">
							<u-input v-model="comModal.comInfo" type="textarea" placeholder="分享你的感受..." :border="border"
								:border-color="borderColor" :height="height" :auto-height="autoHeight" />
						</u-form-item>
					</u-form>
					<view class="cardZw">
						上传照片
					</view>
					<u-upload @on-success="handleSuccess" :custom-btn="true" max-count="4" ref="uUpload" :action="action" :file-list="comModal.comImgs" :auto-upload="false">
						<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
							<image src="http://scu5azomr.hn-bkt.clouddn.com/static/icon/upload.png"></image>
						</view>
					</u-upload>
					<view class="bodys_btn">
						<u-button :custom-style="customStyles" :ripple="true" class="pl_bt" @click="saveComInfo()"
							ripple-bg-color="#39b54a">发布</u-button>
				</view>
			</view>
		</u-popup>
		<tongzhi v-if="currentTabComponent === 'tongzhi'"></tongzhi>

		<!-- 底部导航栏 -->
		<view class="uni-padding-wrap uni-common-mt">
			<bttab :tabBars="tabBars" @TarTap="TarData" :tabIndex="tabIndex" @post="post(0)" :notice_num="notice_num"></bttab>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	import bttab from '../../../page_school/components/pyq-home/bt-tab.vue';
	import home from './home.vue';
	// import fabu from './fabu.vue';
	import tongzhi from './tongzhi.vue';

	export default {
		components: {
			bttab,
			home,
			// fabu,
			tongzhi
		},

		data() {
			return {
				posted: true, //用来刷新主页页面
				customStyles: {
					marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					backgroundColor: '#6dd57b',
					boxShadow: '0 0 0px #ffcc01',
					color: '#fff'
				},


				tabIndex: "home",
				currentTabComponent: "home",
				tabBars:[
					{
						name: "动态",
						id: "home"
					},
					{
						name:"发布",
						id: this.currentTabComponent
					},
					{
						name: "通知",
						id: "tongzhi"
					}
				],
			

				//是否发帖
				ispost: false,
				comModal: {
					userId:null,
					dyId:null,
					comInfo:'',
					comImgs:[],  //预览的链接
					submitImgs:[]  //要提交第二个请求的链接
				},

				//上传路径？
				// action: 'http://127.0.0.1:4523/m1/schoolteam/pyq/createpost/uploadpics',
				action: this.$url.BASE_URL + '/uploadImage',
				//应该是后端返回的图片路径列表？
				filesArr: [],
				notice_num: '' //通知数量
			}
			
		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin','user_id', 'userInfo'])
		},

		onReachBottom() {
			uni.$emit('pyqonReachBottom');
			console.log('触底了');
		},

		methods:{
			TarData(item){
				//设置id，来显示选中那个标签，显示下划线
				this.tabIndex = item.id;
				//显示标签对应的组件内容
				this.currentTabComponent = item.id
			},
			post(item){
				this.ispost = !this.ispost;
			},
			//发布帖子
			//先上传图片，拿到路径再发送发表请求
			saveComInfo(){
				this.$refs.uUpload.upload();
			},
			postAll(){
				console.log("provice: this.userInfo.provice:", this.userInfo.provice)
				uni.request({
							url: this.$url.BASE_URL + '/schoolteam/pyq/createpost',
							header:{
					Authorization:uni.getStorageSync("token")
				},	
							method: 'POST',
							data: {
								team_id: this.user_id,  
								content: this.comModal.comInfo,
								picture: this.comModal.submitImgs,
								province: this.userInfo.province,
								city: this.userInfo.city
							},
							success: res => {
								if(res.data.code==200){
									this.$u.toast(`发帖成功`);
									this.ispost = false;
									//刷新首页（把新的这篇刷出来）
									this.posted = false;
									this.$nextTick(() => {
										this.posted = true;
									});
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
			},
			handleSuccess(data, index, lists, index2){
				// console.log("lists: ",lists);
				this.comModal.submitImgs = lists.map(item => item.response);
				// console.log("index, lists: ",index, lists)
				if (index==lists.length-1){   //是最后一张
					//发帖请求
					this.postAll();
				}
			},

		},

		mounted(){
			uni.request({
				url: this.$url.BASE_URL + '/schoolteam/pyq/noticenum',
				// url: 'https://mock.apifox.coml/m1/schoolteam/getRecommend',	
			
				method: 'GET',
				data: {
					team_id: this.user_id
				},
				success: res => {
					this.notice_num = res.data.data.notice_num;
					this.net_error = false;
				},
				fail: res => {
					this.net_error = true;
				},
				complete: () => {
				}
			})
		}
	}
</script>
<style lang="scss" scoped>
/* 发布帖子 */
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

	.bodys_btn{
		margin-top: 10px;
	}

	.pl_bt{
		background-color: #39b54a;
	}
</style>