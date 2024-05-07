<template>
	<view class="uni-goods-nav">
		<!-- 底部占位 -->
		<view class="uni-tab__seat" />
		<view class="uni-tab__cart-box flex">
			<view class="flex uni-tab__cart-sub-left">
				<view v-for="(item,index) in options" :key="index" class="flex uni-tab__cart-button-left uni-tab__shop-cart" @click="onClick(index,item)">
						<view class="uni-tab__icon">
							<uni-icons v-if="index == 0" :type="item.icon_noac"></uni-icons> 
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
				<view v-if="!ismyacti" v-for="(item,index) in buttonGroup" :key="index" :style="{background:item.backgroundColor,color:item.color}"
				 class="flex uni-tab__cart-button-right" @click="application()"><text :style="{color:item.color}" class="uni-tab__cart-button-right-text">报名活动</text></view>
				 <view v-if="ismyacti && acti_status == 1" v-for="(item,index) in buttonGroup" :key="index" :style="{background:item.backgroundColor,color:item.color}"
				 class="flex uni-tab__cart-button-right" @click="cancelacti()"><text :style="{color:item.color}" class="uni-tab__cart-button-right-text">取消报名</text></view>
				 <view v-if="ismyacti && acti_status == 2" v-for="(item,index) in buttonGroup" :key="index" :style="{background:item.backgroundColor,color:item.color}"
				 class="flex uni-tab__cart-button-right disable_but"><text :style="{color:white}" class="uni-tab__cart-button-right-text">活动开展中</text></view>
				 <view v-if="ismyacti && acti_status == 3" v-for="(item,index) in buttonGroup" :key="index" :style="{background:item.backgroundColor,color:item.color}"
				 class="flex uni-tab__cart-button-right disable_but"><text :style="{color:white}" class="uni-tab__cart-button-right-text">活动已结束</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
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
			// ismyacti: {
			// 	type: Boolean,
			// 	default: false
			// },  
			//是不是我的活动，是的话按钮就是“取消报名”

			team_id: String,
			acti_id: String,

			options: {
				type: Array,
				default () {
					return [
						{
						icon_noac: 'paperplane',
						icon: 'paperplane-filled',
						text: "生成海报"
					}, 
					{
						icon_noac: 'star',
						icon: 'star-filled',
						text:"收藏活动"
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
							// text: t("uni-goods-nav.buttonGroup.buyNow"),
							text: '报名活动',
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
				ismyacti: false,
				isActive: false,
				// shareIcon: require('../../static/icon/fenxiangmian.png'),
				shareIcon: '',
				acti_status: 1
			}
		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin','user_id','userInfo'])
		},

		methods: {
			onClick(index, item) {
				//生成海报
				if(index == 0){
					const id = this.acti_id
					// this.$u.route({
            		// 	url: 'pages/school/poster/poster?acti_id=' + id
           			// })
					
					uni.navigateTo({
						url:'/page_school/pages/poster/poster?acti_id=' + id
					});
				}
				//收藏
				if(index == 1){
				if(!this.userInfo.isUser){
				const _this = this;
				uni.showModal({
						title: '',
						content: '请登录后报名活动。是否前去登录？',
						success: function(res) {
						if (res.confirm) {
							// 用户点击了确定
							uni.reLaunch({
								url: '/pages/login/login'
							})
							// 在这里可以编写用户点击确定后的逻辑
						} else if (res.cancel) {
							// 用户点击了取消
							return;
							// 在这里可以编写用户点击取消后的逻辑
						}
						}
					});
				}else{
					let favor = this.isActive ? 1 : 0;  //1就是要取消收藏，0就是要收藏
					uni.request({
						url: this.$url.BASE_URL + '/4142061-0-default/schoolteam/favor',
						header:{
							Authorization:uni.getStorageSync("token")
						},
						method: 'PUT',
						data: {
							team_id: this.user_id,
							acti_id: this.acti_id,
							favor: favor
						},
						success: res => {
							if(res.data.code==200){
								if(favor==1){
									this.$u.toast(`成功取消收藏`);
									this.isActive = false
								}else{
									this.$u.toast(`收藏成功！`);
									this.isActive = true
								}
							}else if(res.data.code == 401){
								console.log("token过期");
								uni.showModal({
								title: '',
								content: '登录已过期。是否前去登录？',
								success: function(res) {
								if (res.confirm) {
									// 用户点击了确定
									uni.reLaunch({
										url: '/pages/login/login',
									})
								} else if (res.cancel) {
									// uni.navigateBack()
									return;							
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
			application(){
			if(!this.userInfo.isUser){
				const _this = this;
				uni.showModal({
						title: '',
						content: '请登录后查看。是否前去登录？',
						success: function(res) {
						if (res.confirm) {
							// 用户点击了确定
							console.log('用户点击了确定');
							_this.$u.route({
								url: 'pages/login/login',
								params: {
									team_id: this.user_id,
									acti_id: this.acti_id,
								}
							})
							// 在这里可以编写用户点击确定后的逻辑
						} else if (res.cancel) {
							// 用户点击了取消
							console.log('用户点击了取消');
							return;
							// 在这里可以编写用户点击取消后的逻辑
						}
						}
					});
			}else{
				uni.navigateTo({
					url:'/page_school/pages/details/application?team_id=' + this.user_id + '&acti_id=' + this.acti_id
				});
				
			}
			},
			cancelacti(){  //取消报名
			uni.request({
				url: this.$url.BASE_URL + '/4142061-0-default/schoolteam/cancelRegisterEvent',
				header:
				{
					Authorization:uni.getStorageSync("token")
				},				
				method: 'DELETE',
				data: {
					team_id: this.team_id,
					activ_id: this.acti_id,
				},
				success: res => {
					if(res.data.code==200){
						this.$u.toast(`成功取消报名`);
						this.ismyacti = false;
					}else if(res.data.code == 401){
						console.log("token过期");
						uni.showModal({
						title: '',
						content: '登录已过期。是否前去登录？',
						success: function(res) {
						if (res.confirm) {
							uni.reLaunch({
								url: '/pages/login/login',
							})
						} else if (res.cancel) {
							uni.navigateBack()
							return;							
						}
						}
					});
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
		},
		onShareAppMessage: function(res) {
			// console.log("分享")

			if (res.from === 'button') {// 判断分享是否来自页面内分享按钮
         		console.log(res.target)
       		}
			return {
				title: '不凡',
				path: ""
			}
		},
		mounted(){
			uni.request({
				url: this.$url.BASE_URL + '/4142061-0-default/schoolteam/getisregister',
				header:{
					Authorization:uni.getStorageSync("token")
				},				
				method: 'GET',
				data: {
					team_id: this.team_id,
					acti_id: this.acti_id,
				},
				success: res => {
					if(res.data.code==200){
						if(res.data.data.flag=="1"){
							this.ismyacti = true; //已经是我报过的活动了
							this.acti_status = res.data.data.acti_status
						}else{
							this.ismyacti = false;
						}
					}else if(res.data.code == 401){
						console.log("token过期");
						uni.showModal({
						title: '',
						content: '登录已过期。是否前去登录？',
						success: function(res) {
						if (res.confirm) {
							// 用户点击了确定
							uni.reLaunch({
								url: '/pages/login/login',
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

	//不能点击的按钮
	.disable_but{
		background-color: #646566;
	}
</style>
