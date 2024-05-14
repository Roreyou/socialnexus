<!-- 高校队伍注册页面 -->

<template>
	<view class="content back">
		<!-- 切换身份按钮 -->
		<view style="padding: 30rpx;">
			<!-- 由于应用场景可能存在边距，所有组件中没有默认设置边距，可以通过父元素来控制 -->
			<YtabBtns :data="list" :index.sync="index" @change="change" ></YtabBtns>
		</view>

    	<view class="container">
			<u-upload :class="{ 'banner': avatar === '' }" @on-success="handleSuccess" @on-remove="handleRemove" :custom-btn="true" :max-count="1" ref="uUpload" 
						:action="action" :file-list="avatarList" :auto-upload="true" style="display: flex; align-items: center; ">
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<image :class="{ 'banner': avatar === '' } " src="http://scu5azomr.hn-bkt.clouddn.com/static/icon/upload.png"></image>
				</view>
			</u-upload>
		</view>

			<!-- 高校队伍进行注册 -->
			<view class="input-group" style="margin-top: 60rpx;" v-if="index == 0">
				<view class="input-row border">
					<text class="title">队长ID：</text>
					<m-input type="text" focus clearable v-model="account" placeholder="请输入队长ID"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">队伍名称：</text>
					<m-input type="text" focus clearable v-model="team_name" placeholder="请输入队伍名称"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">简介：</text>
					<m-input type="text" focus clearable v-model="remark" placeholder="请输入简介"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">密码：</text>
					<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">确认密码：</text>
					<m-input type="password" displayable v-model="confirm_pwd" placeholder="确认密码"></m-input>
				</view>
			</view>

			<!-- 社区基层人员进行注册 -->
			<view class="input-group" style="margin-top: 60rpx;" v-else>
				<view class="input-row border">
					<text class="title">账号：</text>
					<m-input type="text" focus clearable v-model="account" placeholder="请输入账号"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">名字：</text>
					<m-input type="text" focus clearable v-model="name" placeholder="请输入名字"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">联系方式：</text>
					<m-input type="text" focus clearable v-model="tel" placeholder="请输入联系方式"></m-input>
				</view>
				<view class="input-row border">
					<button @tap="open">选择地区</button>
					<cityPicker :column="city_picker.column" :default-value="city_picker.defaultValue" :mask-close-able="city_picker.maskCloseAble" 
								@confirm="confirm" @cancel="cancel" :visible="city_picker.visible"/>
					<text class="title">省：</text>
					<m-input type="text" focus clearable v-model="province" placeholder="请输入省"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">市：</text>
					<m-input type="text" focus clearable v-model="city" placeholder="请输入市"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">详细地址：</text>
					<m-input type="text" focus clearable v-model="address" placeholder="请输入详细地址"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">简介：</text>
					<m-input type="text" focus clearable v-model="account" placeholder="请输入简介"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">密码：</text>
					<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">确认密码：</text>
					<m-input type="password" displayable v-model="confirm_pwd" placeholder="确认密码"></m-input>
				</view>
			</view>

			<view class="btn-row">
				<button class="cu-btn bg-green block lg" @tap="register">注册</button>
			</view>
		</view>
</template>

<script>
	import mInput from '../../components/m-input.vue';
	import YtabBtns from '../../components/login-tab/YtabBtns.vue'
	import cityPicker from '@/uni_modules/piaoyi-cityPicker/components/piaoyi-cityPicker/piaoyi-cityPicker'
    

	export default {
		components: {
			mInput,
			YtabBtns,
			cityPicker,
		},
		data() {
			return {
				// 选择注册的身份
				index: 0,
				list: [
					{
						name: '高校队伍',
						id: 1,
					}, 
					{
						name: '基层工作人员',
						id: 2,
					}
				],

				// identity: '', //指示高校/社区
				// 高校队伍注册需要的信息
				account: '',
				password: '',
				confirm_pwd: '',
				team_name: '',
				setup_date: '',
				remark: '',
				leader_id: '',
				avatar:'',
				avatarList: [
					// {
					// 	url: null,
					// }
				],

				// 社区基层人员注册需要的信息
				name: '',
				tel: '',
				province: '',
				city: '',
				address: '',

				
				// 省市区级联选择器
				city_picker:{
					visible: false,
					maskCloseAble: true,
               		str: '',
               		defaultValue: '420103',
               		// defaultValue: ['河北省','唐山市','丰南区'],
               		column: 3
				},

				// 传给后端，拿到地址
				action: this.$url.BASE_URL + '/4142061-0-default/schoolteam/pyq/createpost/uploadpics',
			}
		},
		computed: {
			identity(){
				return this.index==0 ? 'team' : 'community' ;
			}
		},
		onShow(){
			console.log('this.avatarList', this.avatarList, this.avatarList.length);
		},
		methods: {
			register() {
				console.log('注册');
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if(this.index === 0){
					console.log('高校队伍注册');
					if(this.account == '' || this.team_name == '' || this.remark == ''){
						uni.showToast({
							icon: 'error',
							title: '请填写完整信息！'
						}); 
						return ;
					}
					if(this.password != this.confirm_pwd){
						uni.showToast({
							icon: 'error',
							title: '前后密码不一致！'
						}); 
						return ;
					}
					if(this.avatar == ''){
						uni.showToast({
							icon: 'error',
							title: '请上传头像！'
						}); 
						return ;
					}
					const data = {
						identity: this.identity,
						leader_id: this.account,
						pwd: this.password,
						team_name: this.team_name,
						remark: this.remark,
						avatar: this.avatar

					}
					console.log('data',data)
					uni.request({
						// 高校
						url: this.$url.BASE_URL + '/4142061-0-default/auth/register/schoolteam',
						method: 'POST',
						data: data,
						success: res => {
							if(res.data.code == 200){
								console.log("注册成功-高校队伍",res.data.data);
								uni.showToast({
									icon: 'success',
									title: '注册成功，前往登录界面',
								});
								uni.navigateTo({
									url:'../login/login'
								});
							}
							else if(res.data.code == 500){
								uni.showModal({
								    title: '提示',
								    content: '用户已存在，是否直接去登录？',
								    success: function (res) {
								        if (res.confirm) {
								            console.log('确定去登录');
											uni.reLaunch({
												url:'../login/login'
											});
								        } 
										else if (res.cancel) {
								            console.log('取消去登录');
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
			open(){
				this.city_picker.visible = true;
			},
			confirm (val) {
                console.log(val);
                this.city_picker.str = JSON.stringify(val);
                this.city_picker.visible = false;
            },
            cancel () {
                this.city_picker.visible = false;
            },

			// 上传成功时，赋值给avatar
			handleSuccess(data, index, lists, index2){
				console.log('上传图片成功，链接为',data);
				console.log('index',index);
				console.log('lists',lists);
				console.log('index2',index2);
				console.log('avatarList',this.avatarList);
				if(index ===0 ){
					this.avatar = data;
				}
				
				
			},
			//删除时
			handleRemove(index, lists, name){
				console.log('删除图片',index,lists,name);
				console.log('删除图片',index,lists,name);
				this.avatar = '';
				console.log('删除图片',index,lists,name);
			},
			change(){
				console.log('转换身份',this.avatar);
				console.log('转换身份',this.$refs.uUpload.lists);
				this.account = '';
				this.password= '';
				this.confirm_pwd= '';
				this.team_name= '';
				this.setup_date= '';
				this.remark= '';
				this.leader_id= '';
				this.avatar='';
				this.avatarList= [
					// {url: '',}
				];

				// 社区基层人员注册需要的信息
				this.name= '';
				this.tel= '';
				this.province= '';
				this.city= '';
				this.address= '';
				this.$refs.uUpload.clear();
				console.log('转换身份',this.avatar);
				console.log('转换身份',this.$refs.uUpload.lists);
			},
		}
	}
</script>

<style>
@import url("../../static/styles/login.css");

  .title {
    width: 90px;
  }
  .banner {
    margin: 10rpx auto;;
    width: 100rpx;
    height: 100rpx;
	align-items: center;
	max-width: 100%;
  	max-height: 100%;
  }
  .banner2 {
    margin: 10rpx auto;;
    width: 100rpx;
    height: 100rpx;
	align-items: center;
  }
  .sms {
    margin-top: 3px;
  }
  .cty {
    margin-top: 10px;
    padding: 5px 5px;
  }
  .input-row{
	display: flex;
	flex-direction: row;
	position: relative;
	font-size: 13px;
	line-height: 40px;
  }
  .back{
	background-image: url(http://scu5azomr.hn-bkt.clouddn.com/static/bg_img/11.png);
	background-size: cover;
    background-attachment: fixed;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30rpx;
}
/* .slot-btn {
	width: 329rpx;
	height: 140rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgb(244, 245, 246);
	border-radius: 10rpx;
}

.slot-btn__hover {
	background-color: rgb(235, 236, 238);
} */
.noCSS{

}
</style>
