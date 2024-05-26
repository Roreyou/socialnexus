<!--高校 - 队伍资料 -->
<template>
	<view class="container">
		<!-- 队伍信息 -->
		<view>
			<view class="part first">
				<view class="de_total_title sub_title">
					队伍基本信息
				</view>
				<view class="modify">
					<view class="cu-btn bg-blue margin-left-sm" @click="modifyInfo" style="font-family: pmkaiti;" v-if="userInfo.verification_status==2 && userInfo.modification_status!==1">修改资料</view>
				</view>
				<view class="modify">
					<view class="cu-btn bg-blue margin-left-sm" style="font-family: pmkaiti;" v-if="userInfo.verification_status==2 && userInfo.modification_status==1">资料修改审核中</view>
				</view>
				<view class="de_key_value" v-for="(item,index) in baselist" :key="index">
					<view class="de_content">
						<view class="key">
							{{ item.key }}
						</view>
						<view class="value">
							{{ item.value }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="custom-container">
    		<hr class="horizontal-line">
  		</view>

		<!-- 指导老师信息 -->
		<view>
			<view class="part second">
				<view class="de_total_title sub_title">
					指导老师基本信息
				</view>
				<view class="de_key_value" v-for="(item,index) in instructorList" :key="index">
					<view class="de_content">
						<view class="key">
							{{ item.key }}
						</view>
						<view class="value">
							{{ item.value }}
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="custom-container">
    		<hr class="horizontal-line">
  		</view>
		<!-- 队员信息 -->
		<view>
			<view class="part second">
				<view class="de_total_title sub_title">
					队员信息
				</view>
				<view>
					<view class="cu-item" v-for="(item,index) in memberList" :key="index">
						<view class="cu-card article" :class="isCard?'':'no-card'">
								<view class="cu-item shadow">
									<view class="title"><view class="text-cut">姓名：{{item.name}}</view></view>
									<view class="content">
										<view class="desc">
											<view class="text-content"> 学号: {{item.id}}</view>									
										</view>
										<view class="desc">
											<view class="text-content"> 院系: {{item.major}}</view>									
										</view>
										<view class="desc">
											<view class="text-content"> 年级: {{item.grade}}</view>									
										</view>
										<view class="desc">
											<view class="text-content"> 联系电话: {{item.tel}}</view>									
										</view>
										<view class="desc">
											<view class="text-content"> 邮箱: {{item.email}}</view>									
										</view>
									</view>
								</view>
						</view>
					</view>
			</view>
			</view>
		</view>

		<!-- 到时候可以在这里加入修改资料的入口 -->
		<!-- <view style="position: fixed; bottom: 0; width: 100%;">
			<bttab></bttab>
		</view> -->
	</view> 
</template>
 
<script>
import {
		mapState,
	} from 'vuex'
import bttab from '../../../components/detail-btm/uni-goods-nav.vue';

	export default {
    components: {
			bttab,
		},
		data(){
			return{
				baselist:[
					{
						key:'队伍名称',
						value:''
					},
					{
						key:'指导老师姓名',
						value:''
					},
					{
						key:'队长姓名',
						value:''
					},
					{
						key:'相关院系',
						value:''
					},
					{
						key:'队员人数',
						value:''
					},
					{
						key:'队伍简介',
						value:''
					}
				],
				memberList:[
					{
						name: "第一个队员",
						id: "21311212"
					},
					{
						name: "第二个队员",
						id: "21311988"
					},
				],
				instructorList:[
					{
						key:'指导老师姓名',
						value:''
					},
					{
						key:'指导老师工号',
						value:''
					},
					{
						key:'联系电话',
						value:''
					},
					{
						key:'所属院系',
						value:''
					},
				]
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin','user_id', 'userInfo'])
		},
		mounted() {
			uni.request({
					url: this.$url.BASE_URL + '/schoolteam/getteamInfo',
					header:{
							Authorization:uni.getStorageSync("token")
						},
					method: 'GET',
					data: {
						team_id: this.user_id,
						// token: this.$userinfo.token
						// activity_status: this.index
					},
					success: res => {
						//队伍信息
						if(res.data.code == 200){
							const basedata = res.data.data.team_info;
							this.baselist[0].value = basedata.team_name;
							this.baselist[1].value = basedata.instructor_name;
							this.baselist[2].value = basedata.leader_name;
							this.baselist[3].value = basedata.relevant_faculties;						
							this.baselist[4].value = basedata.mem_num;
							this.baselist[5].value = basedata.remark;
							
							//队员信息
							this.memberList = res.data.data.member_info;

							//老师信息
							const instrdata = res.data.data.instructor_info;
							this.instructorList[0].value = instrdata.name;
							this.instructorList[1].value = instrdata.id;
							this.instructorList[2].value = instrdata.tel;
							this.instructorList[3].value = instrdata.major;						
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
						this.net_error = false;
					},
					fail: res => {
						this.net_error = true;
					},
					complete: () => {
					}
				})
    	},
		methods:{
			phoneOn() {
				wx.makePhoneCall({
					phoneNumber: this.detail.tel, //此号码仅用于测试
					success: function () {
						console.log("拨打电话成功！")
					},
					fail: function () {
						console.log("拨打电话失败！")
					}
				})
			},
			modifyInfo(){
				uni.navigateTo({
					url: '/page_school/pages/user/teaminfomodify'
				})	
			}
		}
	}
</script>
 
<style>
	page {
		background: #f8f8f8;
		padding-bottom: 160rpx;
	}
 
	.container {
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}

	.part{
		padding-left: 25rpx;
		padding-right: 25rpx;
	}

	.de_total_title {
		font-size: 42rpx;
		font-weight: 900;
		color: #333333;
		margin-top: 30rpx;
		margin-bottom: 20rpx;
	}

	.sub_title{
		font-size: 36rpx;
		font-weight: 600;
		display: inline-block;
	}

	.de_key_value{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-bottom: 20rpx;
		color: gray;
		line-height: 20rpx;
	}
	.de_content{
		display: flex;
		line-height: 60rpx;
    	font-size: larger;
		/* justify-content: space-between;  */
	}
	.keywords{
		display: inline-block; 
  		margin-right: 10px; /* 可根据需求调整按钮之间的间距 */
		margin-bottom: 10px;
		padding: 0 8px; /* 调整内边距来控制块的大小 */
	}
	
	/* 灰线 */
	.custom-container {
	text-align: center; /* 可根据需要调整水平对齐方式 */
	margin: 0 25rpx;
	}

	.horizontal-line {
	border: none; /* 移除默认的边框样式 */
	border-top: 1px solid #ccc; /* 设置上边框为 1px 灰色实线 */
	width: 100%; /* 设置水平线的宽度为容器的宽度 */
	}

	.key{
		display: inline-block;
		width: 600rpx;
	}
	.value{
		display: inline-block;
		/* margin-left: 30rpx; */
		color: black;
		/* flex-grow: 1; */
		padding-right: 25rpx;
		width: 1200rpx;
	}

	/* 活动简介的样式，比较特殊 */
	.last-key{   
		display: inline-block;
		width: 600rpx;
	}

	/* 队员列表 */
	.content {
	  display: flex;
	  flex-direction: column;
	}

	.cu-item{
	margin: 0;
	margin-top: 10rpx;
	background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
	}

	.cu-bar .action:first-child{
	margin-left: 24rpx;
	}

	/* tag */
	.wordcont{
	margin-top: 10rpx;
	}
	.wordcont .ackeywords {
		display: inline-block;
	margin-right: 10rpx; /* 可以调整标签之间的水平间距 */
	}

	/*修改入口*/
	.margin-left-sm{
		margin-left: auto;
	}
	.cu-btn{
		border-radius: 10px;
    	background-color: rgb(43 41 41 / 30%);
    	backdrop-filter: blur(10px);
	}
	.modify{
		display: inline-block;
		margin-left: 300rpx;
	}
</style>
\