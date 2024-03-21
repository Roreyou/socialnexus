<!-- 高校 朋友圈 -->
<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view> -->
		<home v-if="currentTabComponent === 'home'"></home>
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
					<u-upload :custom-btn="true" max-count="4" ref="uUpload"  :action="action" :file-list="comModal.comImgs" :auto-upload="true">
						<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
							<image src="../../static/icon/upload.png"></image>
						</view>
					</u-upload>
					
					<view class="bodys_btn">
						<u-button :custom-style="customStyles" :ripple="true" class="pl_bt" @click="saveComInfo()"
							ripple-bg-color="#ff9b01">评论</u-button>
				</view>
			</view>
		</u-popup>
		<tongzhi v-if="currentTabComponent === 'tongzhi'"></tongzhi>

		<!-- 底部导航栏 -->
		<view class="uni-padding-wrap uni-common-mt">
			<bttab :tabBars="tabBars" @TarTap="TarData" :tabIndex="tabIndex" @post="post(0)"></bttab>
		</view>
	</view>
</template>

<script>
	import bttab from '../../components/pyq-home/bt-tab.vue';
	import home from './home.vue';
	import fabu from './fabu.vue';
	import tongzhi from './tongzhi.vue';

	export default {
		components: {
			bttab,
			home,
			fabu,
			tongzhi
		},
		
		data() {
			return {
				customStyles: {
					marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					backgroundColor: '#39b54a',
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
					comImgs:[],
				},
			}
			
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
				console.log(this.ispost);
			}
			
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