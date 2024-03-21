<!-- 朋友圈底部导航条 -->
<template>
	<view>
		<!-- <homePage v-if="PageCur=='home'"></homePage> -->
        <view class="cu-bar tabbar bg-white foot">
            <!-- 首页 -->
            <view class="action" :class="PageCur=='discover'?'text-green':'text-gray'" 
                data-cur="discover" @click="NavChange" @tap="tarTap(tabBars[0])">
                <view class="cuIcon-discoverfill" @click="badgeChange1">                    
                    <!-- 红色圆点（数字角标） -->
                    <view v-if="badge1" class="cu-tag badge"></view>
                </view> 动态
            </view>

            <!-- 中间发布按钮 -->
            <view class="action add-action" :class="PageCur=='sub'?'text-green':'text-gray'"         
                data-cur="sub" @click="NavChange" @tap="tarTap(tabBars[1])">
                <button class="cu-btn cuIcon-add bg-green shadow" @click="post(0)"></button>
                发布
            </view>
            
            <!-- 通知、右上角有数字角标 -->
            <view class="action" :class="PageCur=='message'?'text-green':'text-gray'" 
                data-cur="message" @click="NavChange" @tap="tarTap(tabBars[2])">
                <view class="cuIcon-message" @click="badgeChange2">
                    <!-- 数字角标 -->
                    <view v-if="badge2" class="cu-tag badge">99</view>
                </view>
                通知
            </view>
        </view>

	</view>
</template>
 
<script>
	export default {
        props:{
			tabBars: Array,
			tabIndex: String
		},
		data() {
		    return {
				PageCur: 'discover',
                badge1: false,    
                badge2: true
			}
		},
		methods: {
			tarTap(item){
				this.$emit("TarTap",item)
			},
            NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			},
            badgeChange1: function() {
                this.badge1 = false
            },
            badgeChange2: function() {
                this.badge2 = false
            },
            post(id){
                this.$emit("post",id)
            }
		}
	}
</script>
<style>
.tabbar{
    height: 55px;
}
.action {
  transform: scale(1.2); /* 将元素放大为原来的 1.2 倍 */
}
</style>
