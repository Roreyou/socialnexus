<!--高校 - 报名详情 -->
<template>
	<view class="container">
		<!-- 第一块 -->
		<view>
			<view class="part first">
				<view class="de_total_title">
					队伍信息
				</view>
				<view class="de_key_value">
					<view class="de_content">
						<view class="key">
              				队伍名
						</view>
						<view class="value">
              				{{team_detail.team_name}}
						</view>
					</view>
          			<view class="de_content">
						<view class="key">
							指导老师姓名
						</view>
						<view class="value">
							{{team_detail.instructor_name}}
						</view>
					</view>
					<view class="de_content">
						<view class="key">
							队长姓名
						</view>
						<view class="value">
							{{team_detail.leader_name}}
						</view>
					</view>
					<view class="de_content">
						<view class="key">
							指导老师手机号码
						</view>
						<view class="value">
							{{team_detail.instructor_tel}}
						</view>
					</view>
					<view class="de_content">
						<view class="key">
							队长手机号码
						</view>
						<view class="value">
							{{team_detail.leader_tel}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="custom-container">
    		<hr class="horizontal-line">
  		</view>
		<!-- 第二块 -->
		<view>
			<view class="part first">
				<view class="de_total_title">
					活动信息
				</view>
				<view class="de_key_value">
					<view class="de_content">
						<view class="key">
              				活动名称
						</view>
						<view class="value">
              				{{acti_detail.name}}
						</view>
					</view>
          			<view class="de_content">
						<view class="key">
							活动详细地址
						</view>
						<view class="value">
							{{acti_detail.address}}
						</view>
          			</view>
					<view class="de_content">
						<view class="key">
							活动时间
						</view>
						<view class="value">
							<text>{{acti_detail.start_time}} 开始</text><br>

  							<text>{{acti_detail.end_time}} 结束</text>
						</view>
          			</view>
					<view class="de_content">
						<view class="key">
							活动报名截止时间
						</view>
						<view class="value">
							{{acti_detail.application_deadline}}
						</view>
					</view>
				</view>
			</view>
		</view>
    <!-- 确认按钮 -->
    	<view>
      		<button @click="submit" :class="{ activeButton: isActive, inactiveButton: !isActive }">{{ buttonText }}</button>
    	</view>
	</view> 
</template>
 
<script>
import bttab from '../../../components/detail-btm/uni-goods-nav.vue';

	export default {
    components: {
			bttab,
		},
	data() {
      return {
        isActive: false,
        buttonText: '报名活动',
		team_detail:{},
		acti_detail:{},
		net_error: false,
		activity_id: '0',
		team_id: '0',
    	}
	},

	mounted(){
		console.log("报名详情页面");
			// 获取query对象
			const query = this.$mp.query;
			// const query = this.$route.query;
			const team_id = query.team_id;
			const acti_id = query.acti_id;
			this.team_id = team_id;
			this.activity_id = acti_id;
			// console.log(id)
			uni.request({
				url: this.$url.BASE_URL + '/4142061-0-default/schoolteam/activsquare/register_details',
				// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
				
				method: 'GET',
				data: {
					team_id: team_id,
					acti_id: this.activity_id,
					// token: this.$userinfo.token
				},
				success: res => {
					this.team_detail = res.data.data.team_detail;
					this.acti_detail = res.data.data.acti_detail;
					// this.detail.keywords = "服务,实践"
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
      submit(){  //提交报名或者取消报名活动

        if(!this.isActive){
			uni.request({
				url: this.$url.BASE_URL + '/4142061-0-default/schoolteam/activsquare/register_event',				
				method: 'POST',
				data: {
					team_id: this.team_id,
					activity_id: this.activity_id,
				},
				success: res => {
					if(res.data.code==200){
						this.$u.toast(`成功报名活动!`);
						this.buttonText = "取消报名";
          				this.isActive = !this.isActive
					}else{
						this.$u.toast(`报名失败，请重试`);
					}
				},
				fail: res => {
					this.net_error = true;
				},
				complete: () => {
				}
		})
        }
        else{
			uni.request({
				url: this.$url.BASE_URL + '/4142061-0-default/schoolteam/cancelRegisterEvent',				
				method: 'DELETE',
				data: {
					team_id: this.team_id,
					activ_id: this.activity_id,
				},
				success: res => {
					if(res.data.code==200){
						this.$u.toast(`成功取消报名`);
						this.buttonText = "报名活动";
          				this.isActive = !this.isActive
					}else{
						this.$u.toast(`取消报名失败，请重试`);
					}
				},
				fail: res => {
					this.net_error = true;
				},
				complete: () => {
				}
		})
        }
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
	}

	.de_total_title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
		margin-top: 30rpx;
		margin-bottom: 20rpx;
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
	}
	
	/* 灰线 */
	.custom-container {
	text-align: center; 
	margin: 0 25rpx;
	}
	.horizontal-line {
	border: none; /* 移除默认的边框样式 */
	border-top: 1px solid #ccc; /* 设置上边框为 1px 灰色实线 */
	width: 100%; /* 设置水平线的宽度为容器的宽度 */
	}
  
	.key{
		display: inline-block;
		width: 700rpx;
	}
	.value{
		display: inline-block;
		/* margin-left: 30rpx; */
		color: black;
		/* flex-grow: 1; */
		padding-right: 25rpx;
		width: 1200rpx;
	}
  button {
    position: fixed;
  bottom: 20rpx; /* 调整按钮距离页面底部的距离 */
  left: 50%; /* 将按钮水平居中 */
  transform: translateX(-50%); /* 通过平移来实现水平居中 */
  /* background: linear-gradient(to bottom right, #ff4d4d, #ff1a1a);
  color: white;
  border: none; */
  border-radius: 10px;
  padding: 10px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 90%;
  padding: 5rpx;
  font-size: 38rpx;
  }

  .inactiveButton{
    background: linear-gradient(to bottom right, #ff4d4d, #ff1a1a);
  color: white;
  border: none;
  }

  .activeButton{
    border: 0.5px solid #ff0000; /* 红色边框 */
  background-color: transparent; /* 透明背景 */
  color: #ff0000; /* 红色字体 */
  }
</style>