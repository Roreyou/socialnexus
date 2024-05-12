<!-- 统一登录界面 -->
<template>
	<view class="content back">
		<!-- 选择角色 -->
		<view class="container" v-if="step === 0">
			<view class="text1">选择登录角色</view>
    		<view class="team-box"  :class="selectedRole == item.id ? 'selected' : 'team-box'" v-for="item in list" :key="item.id" @click="selectRole(item.id)">
				<img class="avatar" :src="item.avatarUrl" alt="Avatar">
				<view class="team-name">{{ item.name }}</view>
			</view>
		</view>

		<!-- 团委/社区基层登录 -->
		<view class="container" v-else-if="step === 1 || step === 3">
			<view class="text1">选择登录角色</view>
			<view>
				<view class="input-group">
					<view class="input-row border">
						<text class="title">账号：</text>
						<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
					</view>
					<view class="input-row">
						<text class="title">密码：</text>
						<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
					</view>
				</view>
				<!-- 直接登录 -->
				<view class="btn-row">
					<button class="cu-btn bg-green block lg" @tap="bindLogin">登录</button>
				</view>
				<view class="back-button" bindtap="navigateBack"></view>
			</view>
		</view>

		<!-- 高校队伍登录 -->
		<view class="container" v-else-if="step === 2">
			<view class="text1">选择登录角色</view>
    		<view class="team-box"  :class="selectedRole == item.id ? 'selected' : 'team-box'" v-for="item in list" :key="item.id" @click="selectRole(item.id)">
				<img class="avatar" :src="item.avatarUrl" alt="Avatar">
				<view class="team-name">{{ item.name }}</view>
			</view>
		</view>

		
		<!-- 切换身份按钮 -->
		<!-- <view style="padding: 30rpx;">
			<YtabBtns :data="list" :index.sync="index"></YtabBtns>
		</view> -->

		<view v-show="!chooseTeam">
			<!-- 高校队伍成员登录 -->
			<view v-if="index==1">
				<view class="input-group" >
					<view class="input-row border" v-if="index==1">
						<text class="title">个人ID：</text>
						<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入个人ID"></m-input>
					</view>
				</view>
				<!-- 高校队伍成员登录，下一步 -->
				<view class="btn-row" v-if="index==1">
					<button class="cu-btn bg-green block lg" @tap="teamNext">下一步</button>
				</view>

			</view>

			<!-- 团委/社区基层登录 -->
			<view v-else>
				<view class="input-group">
					<view class="input-row border">
						<text class="title">账号：</text>
						<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
					</view>
					<view class="input-row">
						<text class="title">密码：</text>
						<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
					</view>
				</view>
				<!-- 团委/社区基层直接登录 -->
				<view class="btn-row">
					<button class="cu-btn bg-green block lg" @tap="bindLogin">登录</button>
				</view>
			</view>
		</view>

		<!-- 高校成员选择队伍 -->
		<view v-show="chooseTeam">
			<view class="team-box"  :class="selectedTeam == item.team_id ? 'selected' : 'team-box'" v-for="item in teamList" :key="item.team_id" @click="selectTeam(item.team_id)">
					<img class="avatar" :src="item.avatarUrl" alt="Avatar">
					<view class="team-name">{{ item.team_name }}</view>
			</view>
			<m-input class="input-pwd" type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			<button style="margin-top: 10px;" class="cu-btn bg-green block lg" @tap="bindLogin">登录</button>

		</view>

		<view class="action-row">
			<navigator url="../reg/reg">注册账号</navigator>
			<text>|</text>
			<navigator url="../pwd/pwd">忘记密码</navigator>
			<text>|</text>
			<navigator url="../school/index/index" open-type="reLaunch">游客模式</navigator>
			<!-- <button class="guest-button" @click="gotoIndex">游客模式</button> -->
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'
	import YtabBtns from '../../components/login-tab/YtabBtns.vue'
	
	export default {
		components: {
			mInput,
			YtabBtns
		},
		data() {
			return {
				// 身份按钮
				index: 0,
				list: [
					{
						name: '我是校团委',
						id: 1,
						avatarUrl: 'https://imagepphcloud.thepaper.cn/pph/image/294/493/450.jpg',
					},
					{
						name: '我是高校队伍',
						id: 2,
						avatarUrl: 'https://bpic.588ku.com/element_pic/23/04/23/aaecb8696eb1b5818cbe3d3b296ee5bd.png!/fw/150/unsharp/true/compress/true',
					},
					{
						name: '我是基层工作人员',
						id: 3,
						avatarUrl: 'https://pic.616pic.com/ys_img/00/82/30/uBXdSziguA.jpg',
					}, 
					{
						name: '我只是一名游客',
						id: 4,
						avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn6i34jCCfME1TIH_gJK7Kr-JKWFe3VGlPXQ&usqp=CAU',
					},
				],

				index1: 0,

				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0,
				isDevtools: false,
				teamList:[
					{
						team_id: 1,
						team_name: "队伍1",
						avatarUrl: 'https://photo.16pic.com/00/93/96/16pic_9396213_b.jpg'
					},
					{
						team_id: 2,
						team_name: "队伍2",
						avatarUrl: 'https://www.zmtc.com/wp-content/uploads/2023/0308/20230308090400294.jpg'
					}
				],
				selectedTeam: 1,
				chooseTeam: false,
				selectedRole: null,
				step: 0,
			}
		},
		computed: mapState(['forcedLogin']),
		onLoad: function(options) {
			wx.hideHomeButton();
		},
		methods: {
			...mapMutations(['login']),
			
			gotoIndex(){
				uni.reLaunch({
						url: '../school/index/index',   /*进入高校首页*/
					});
			},
			teamNext(){
				this.chooseTeam = true;
			},
			// 选择登录的队伍
			selectTeam(teamID){
				console.log("选择的队伍", teamID);
				console.log("this.selectedTeam before", this.selectedTeam);
				this.selectedTeam = teamID;
				console.log("this.selectedTeam after", this.selectedTeam);
			},
			// 我是xxx
			selectRole(roleID){
				console.log("选择的角色", roleID);
				this.selectedRole = roleID;
				if(this.selectedRole === 1){
					// 校团委
					this.step = 1;
				}
				else if(this.selectedRole === 2){
					// 高校队伍
					this.step = 2;
				}
				else if(this.selectedRole === 3){
					// 社区基层
					this.step = 3;
				}
				else if(this.selectedRole === 4){
					// 游客
					uni.navigateTo({
							url:'../../page_school/pages/index/index'
						});
				}
			},

			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				/* 先删掉校验逻辑，之后再来补充
				if (this.account.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}*/

				const identity = "school"
				const data = {
					identity: identity,
					id: this.account,  //team_id
					pwd: this.password
				};

				//发请求
				uni.request({
					url: this.$url.BASE_URL + '/4142061-0-default/auth/login?apifoxApiId=154463358',			
					method: 'POST',
					data: data,
					success: res => {
						if(res.data.code == 200){
	
							if(identity == "school"){  //登录的是高校队伍，响应里有审核状态
								const verification_status = res.data.data.verification_status;
								const team_name =  res.data.data.team_name;
								const avatar = res.data.data.avatar;
								// console.log("data.id:", data.id)
								const isleader = res.data.data.isleader;
								this.toMain(data.id, verification_status, team_name, avatar, isleader);	
							}
							// 保存 token
							uni.setStorageSync('token', res.data.data.token);
						}else{
							uni.showToast({
								icon: 'none',
								title: '用户账号或密码不正确',
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
			getUserInfo({
				detail
			}) {
				if (detail.userInfo) {
					this.toMain(detail.userInfo.nickName);
				} else {
					uni.showToast({
						icon: 'none',
						title: '登陆失败'
					});
				}
			},
			toMain(team_id, verification_status, team_name, avatar, isleader) {
				// console.log("tomain-avatar", avatar)
				const user_id = team_id;
				const user_name = team_name;
				this.login({user_id, verification_status, user_name, avatar, isleader});
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */


				//开发用的
				if (this.forcedLogin) {
					if(this.account == '1'){
						uni.reLaunch({
						url: '../school/index/index',   /*进入高校首页*/
					});
					} else if(this.account == '2'){
					uni.reLaunch({
						url: '../../page_commitee/page/index/index',   /*进入团委首页*/
					});
				}else if(this.account == '3'){
					uni.reLaunch({
						url: '../../page_community/page/index',   /*进入社区首页*/
					});
				}

				}
				else {
					uni.navigateBack();
				}

			},
			
			// 身份按钮
			change(info) {
				// 可以通过change事件来获取切换 也可以通过watch来监听index变化来获取切换
				uni.showToast({
					title: `你点击了${info.name}`
				})
				console.log("切换用户类别");
				this.chooseTeam = false;
				
			}
		},
		watch:{
			index(newIndex) {
      			// 在 index 变化时执行逻辑
      			this.chooseTeam = false;
      		}    		
		},
		onReady() {
			this.initPosition();
    	},


	}
</script>

<style lang="scss" scoped>
@import url("../../static/styles/login.css");
	.action-row {
		margin-top: 10px;
		display: flex;
		flex-direction: row;
		justify-content: center;
    color: #39B54A;
	}

	.action-row navigator {
    color: #39B54A;
		padding: 0 10px;
	}

  .logo {
    width: 250upx;
    height: 250upx;
    border-radius: 50%;
    margin: 50px auto 20px auto;
  }
  
  .guest-button {
    color: #39B54A;
    border: 2px solid #000000; 
    padding: 12px 24px;
    font-size: 10px;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
  }
  .team-box {
	display: flex;
    align-items: center;
    padding: 30rpx;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 30rpx;
    cursor: pointer;
    margin-bottom: 18rpx;
}

.selected {
  border:2rpx solid#39B54A;
}

.avatar {
	width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    margin-right: 44rpx;
}

.team-name {
  font-weight: bold;
  font-size: 16px;
}
.input-pwd{
  margin-top: 10px; 
  font-size: 12px;
  background-color: white;
  border-radius: 10px;
  border-color: balck;
  height: 30px;
}
.next{
  background-image: url(http://scu5azomr.hn-bkt.clouddn.com/static/Next.png);
//   background-image: url('https://w7.pngwing.com/pngs/444/482/png-transparent-computer-icons-next-button-miscellaneous-angle-number.png');
  background-size: cover;
  background-color: transparent;
  width: 30px; /* 设置按钮的宽度 */
  height: 30px; /* 设置按钮的高度 */
  border: 0; /* 去除按钮的边框 */
//   margin-right: 10px;
  border-color: white ;
}
.back{
	background-image: url(http://scu5azomr.hn-bkt.clouddn.com/static/bg_img/11.png);
	background-size: 100% 100%;
    height: 100vh;
	background-attachment: fixed;
}
.container{
	// border-radius: 30rpx;
	background-color: rgba(255,255,255,0.3);
	margin-top: 300rpx;
}
.text1{
	font-size: 30rpx;
    font-family: 'Arial';
    margin-top: 20rpx;
    margin-left: 20rpx;
	margin-bottom: 20rpx;
    font-weight: bold;  
}
.back-button {
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  background-color: transparent;
  border: 1px solid #cccccc;
  border-radius: 4px;
  color: #333333;
  font-size: 14px;
  cursor: pointer;
  background-image: url(https://pic.616pic.com/ys_img/00/05/51/scUAovfXGL.jpg);
  background-size: 100% 100%;
}

</style>
