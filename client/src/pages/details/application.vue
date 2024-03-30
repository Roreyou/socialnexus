<!--高校 - 活动详情 -->
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
              高校队伍一
						</view>
					</view>
          <view class="de_content">
						<view class="key">
							负责人姓名
						</view>
						<view class="value">
							包原畅
						</view>
          </view>
					<view class="de_content">
						<view class="key">
							负责人手机号码
						</view>
						<view class="value">
							1555596663
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
              202403011直街社区藤编及串珠志愿服务活动
						</view>
					</view>
          <view class="de_content">
						<view class="key">
							活动地点
						</view>
						<view class="value">
							广东省 佛山市 南海区 南海区直街社区幸福院
						</view>
          </view>
					<view class="de_content">
						<view class="key">
							活动截止时间
						</view>
						<view class="value">
							2024-03-11 17:00:00
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
import bttab from '../../components/detail-btm/uni-goods-nav.vue';

	export default {
    components: {
			bttab,
		},
		data() {
      return {
        isActive: false,
        buttonText: '报名活动'
    }
		},
    methods: {
      submit(){
        if(!this.isActive){
          this.$u.toast(`成功报名活动!`);
          this.buttonText = "取消报名";
          this.isActive = !this.isActive
        }
        else{
          this.$u.toast(`成功取消报名`);
          this.buttonText = "确认报名"
          this.isActive = !this.isActive
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