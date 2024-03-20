<!-- 朋友圈底部导航条 -->
<template>
	<view>
		<!-- <homePage v-if="PageCur=='home'"></homePage> -->
        <view class="cu-bar tabbar bg-white foot">
            <!-- 首页 -->
            <view class="action" :class="PageCur=='home'?'text-green':'text-gray'" 
                data-cur="home"  				@tap="tarTap(tabBars[0])">
                <view class="cuIcon-homefill"></view> 首页
            </view>

            <!-- 中间发布按钮 -->
            <view class="action add-action" :class="PageCur=='sub'?'text-green':'text-gray'"         
                data-cur="sub" @tap="tarTap(tabBars[1])">
                <button class="cu-btn cuIcon-add bg-green shadow"></button>
                发布
            </view>
            
            <!-- 通知、右上角有数字角标 -->
            <view class="action" :class="PageCur=='cart'?'text-green':'text-gray'" 
                data-cur="cart" @tap="tarTap(tabBars[2])">
                <view class="cuIcon-cart">
                    <!-- 数字角标 -->
                    <view class="cu-tag badge">99</view>
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
				// PageCur: 'home'
			}
		},
		methods: {
			tarTap(item){
				this.$emit("TarTap",item)
			}
		}
	}
</script>
