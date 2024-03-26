<template>
	<view class="uni-goods-nav">
		<!-- 底部占位 -->
		<view class="uni-tab__seat" />
		<view class="uni-tab__cart-box flex">
			<view class="flex uni-tab__cart-sub-left">
				<view v-for="(item,index) in options" :key="index" class="flex uni-tab__cart-button-left uni-tab__shop-cart" @click="onClick(index,item)">
						<view class="uni-tab__icon">
							<!-- <uni-button type="primary" v-if="index == 0" :icon="item.icon_noac" size="20" color="#646566" open-type="share" @click="onClick(index,item)"></uni-button> -->
							
							<!-- <button v-if="index == 0" type="default" open-type="share" size="20" class="tran-but" >
								<image :src="shareIcon" mode="aspectFit" style="width:20px; height: 20px;"></image>
							</button> -->
							<button v-if="index == 0" type="default" open-type="share" size="20" class="cu-btn tran-but" >
								<image :src="shareIcon" mode="aspectFit" style="width:18px; height: 18px; background-color: white; margin-bottom: -4px;"></image>
							</button>
							<!-- <uni-icons v-if="index == 0" :type="item.icon_noac"></uni-icons> -->
							<uni-icons v-if="index == 1" :type="isActive ? item.icon : item.icon_noac" size="20" color="#646566"></uni-icons>
						<!-- <uni-icons  v-if="isActive1" :type="item.icon" size="20" color="#646566"></uni-icons>
						<uni-icons  v-if="!isActive1" :type="item.icon_noac" size="20" color="#646566"></uni-icons> -->
						<!-- <uni-icons :type="item.icon_noac" size="20" color="#646566"></uni-icons> -->
						<!-- <image class="image" :src="item.icon" mode="widthFix" /> -->
						</view>
					<text class="uni-tab__text">{{ item.text }}</text>
					<view class="flex uni-tab__dot-box">
						<text v-if="item.info" :class="{ 'uni-tab__dots': item.info > 9 }" class="uni-tab__dot " :style="{'backgroundColor':item.infoBackgroundColor?item.infoBackgroundColor:'#ff0000',
						color:item.infoColor?item.infoColor:'#fff'
						}">{{ item.info }}</text>
					</view>
				</view>
			</view>
			<view :class="{'uni-tab__right':fill}" class="flex uni-tab__cart-sub-right ">
				<view v-for="(item,index) in buttonGroup" :key="index" :style="{background:item.backgroundColor,color:item.color}"
				 class="flex uni-tab__cart-button-right" @click="buttonClick(index,item)"><text :style="{color:item.color}" class="uni-tab__cart-button-right-text">{{ item.text }}</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
	initVueI18n
	} from '@dcloudio/uni-i18n'
	import messages from './i18n/index.js'
	const {	t	} = initVueI18n(messages)
	/**
	 * GoodsNav 商品导航
	 * @description 商品加入购物车、立即购买等
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=865
	 * @property {Array} options 组件参数
	 * @property {Array} buttonGroup 组件按钮组参数
	 * @property {Boolean} fill = [true | false] 组件按钮组参数
	 * @property {Boolean} stat 是否开启统计功能
	 * @event {Function} click 左侧点击事件
	 * @event {Function} buttonClick 右侧按钮组点击事件
	 * @example <uni-goods-nav :fill="true"  options="" buttonGroup="buttonGroup"  @click="" @buttonClick="" />
	 */
	export default {
		name: 'UniGoodsNav',
		emits:['click','buttonClick'],
		props: {
			options: {
				type: Array,
				default () {
					return [
						{
						icon_noac: 'paperplane',
						icon: 'paperplane-filled',
						text: t("uni-goods-nav.options.shop"),
					}, 
					{
						icon_noac: 'star',
						icon: 'star-filled',
						text: t("uni-goods-nav.options.cart")
					}]
				}
			},
			buttonGroup: {
				type: Array,
				default () {
					return [
						// {
						// 	text: t("uni-goods-nav.buttonGroup.addToCart"),
						// 	backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
						// 	color: '#fff'
						// },
						{
							text: t("uni-goods-nav.buttonGroup.buyNow"),
							backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
							color: '#fff'
						}
					]
				}
			},
			fill: {
				type: Boolean,
				default: false
			},
			stat:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				isActive: false,
				shareIcon: require('../../static/icon/fenxiangmian.png'),
			}
		},
		methods: {
			onClick(index, item) {
				//分享
				if(index == 0){  
					// uni.share({
					// provider: 'weixin', // 分享的目标平台，比如微信
					// type: 5, // 分享的类型，5为小程序
					// imageUrl: 'https://example.com/share.png', // 分享的图片链接
					// title: '分享标题',
					// success: function (res) {
					// 	console.log('分享成功');
					// },
					// fail: function (err) {
					// 	console.log('分享失败: ' + JSON.stringify(err));
					// }
					// });				
				}
				//收藏
				if(index == 1){
					if (this.isActive) {
						this.isActive = false
						this.$u.toast(`成功取消收藏`);
					} else {
						this.isActive = true
						this.$u.toast(`收藏成功！`);
					}
				}
				// console.log(item.isActive)
				this.$emit('click', {
					index,
					content: item,
				})
			},
			buttonClick(index, item) {
				if (uni.report && this.stat) {
					uni.report(item.text, item.text)
				}
				this.$emit('buttonClick', {
					index,
					content: item
				})
			},
			//分享
			// onShareAppMessage(res) {
			// 		console.log('列表信息',res);
			// 	// console.log('列表信息',res.target.dataset.eventParams.ele.title);
			// 	if (res.from === 'button') { // 来自页面内分享按钮
			// 		console.log(res.target)
			// 	}
			// 	return {
			// 		title: res.target.dataset.eventParams.ele.title, //分享的名称
			// 		path: 'pages/interpretAndDownload/interpretAndDownload?title=模版下载',
			// 		mpId: appid //此处配置微信小程序的AppId
			// 	}
			// },

			// onShareAppMessage(res) {
			// // 判断分享是否来自页面内分享按钮
			// console.log("分享")
			// 	// if (res.from === 'button') {
			// 	// 	console.log(res.target)
			// 	// }
			// 	// return {
			// 	// title: '不凡',
			// 	// path: path
			// 	// }
			// }
		},
		onShareAppMessage: function(res) {
			console.log("分享")

			if (res.from === 'button') {// 判断分享是否来自页面内分享按钮
         		console.log(res.target)
       		}
			return {
				title: '不凡',
				path: ""
			}
		}
}
</script>

<style lang="scss" >
	.flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.uni-goods-nav {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
	}

	.uni-tab__cart-box {
		flex: 1;
		height: 50px;
		background-color: #fff;
		z-index: 900;
	}

	.uni-tab__cart-sub-left {
		padding: 0 5px;
	}

	.uni-tab__cart-sub-right {
		flex: 1;
	}

	.uni-tab__right {
		margin: 5px 0;
		margin-right: 10px;
		border-radius: 100px;
		overflow: hidden;
	}

	.uni-tab__cart-button-left {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		// flex: 1;
		position: relative;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: 0 10px;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.uni-tab__icon {
		width: 18px;
		height: 18px;
		// background-image: url('../../static/icon/fenxiangmian.png'); 
	}

	.image {
		width: 18px;
		height: 18px;
	}

	.uni-tab__text {
		margin-top: 3px;
		font-size: 12px;
		color: #646566;
	}

	.uni-tab__cart-button-right {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		flex: 1;
		justify-content: center;
		align-items: center;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.uni-tab__cart-button-right-text {
		font-size: 14px;
		color: #fff;
	}

	.uni-tab__cart-button-right:active {
		opacity: 0.7;
	}

	.uni-tab__dot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		position: absolute;
		right: -2px;
		top: 2px;
		justify-content: center;
		align-items: center;
		// width: 0;
		// height: 0;
	}

	.uni-tab__dot {
		// width: 30rpx;
		// height: 30rpx;
		padding: 0 4px;
		line-height: 15px;
		color: #ffffff;
		text-align: center;
		font-size: 12px;
		background-color: #ff0000;
		border-radius: 15px;
	}

	.uni-tab__dots {
		padding: 0 4px;
		// width: auto;
		border-radius: 15px;
	}

	//图标按钮
	.icon-button {
    width: 18px; /* 设置按钮宽度为图标的宽度 */
    height: 18px; /* 设置按钮高度为图标的高度 */
    padding: 0; /* 移除按钮的内边距 */
    background: none; /* 移除背景色 */
    border: none; /* 移除边框 */
	}

	//透明按钮
	.tran-but{
		height: 14px;
		width: 18px;
		padding: 0;
		background-color: transparent;
		border: none;
		background:#fff;
		// background-image: url('../../static/icon/fenxiangmian.png'); 

	}
	.tran-but::after{
		background:#fff;
		border:none;
	}
	
	.cu-btn{
		background: #fff;
	}
	.cu-btn::after{
		background:#fff;
		border:none;
	}
</style>
