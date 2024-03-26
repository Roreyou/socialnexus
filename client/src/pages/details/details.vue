<!--高校 - 活动详情 -->
<template>
	<view class="container">
		<!-- 商品轮播图 -->
		<view class="carousel">
			<!--轮播图-->
			<swiper class="home-swiper" indicator-dots="true" :autoplay="autoplay" :interval="interval" :circular="circular"
			 :duration="duration">
				<block v-for="(item,key) in lunboData" :key="key">
					<swiper-item class="swiper-item">
						<image :src="item.imgurl" class="slide-image" />
					</swiper-item>
				</block>
			</swiper>
		</view>
		<view class="introduce-section" :key="index" v-for="(goodsInf,index) in goodsInf">
			<text class="title">{{goodsInf.goodsTitle}}</text>
			<view class="price-box">
				<text class="price-tip">￥</text>
				<text class="price">{{goodsInf.goodsPirce}}</text>
				<text class="m-price">￥{{goodsInf.goodsMPrice}}</text>
				<text class="coupon-tip">{{goodsInf.goodsCoupon}}</text>
			</view>
			<view class="bot-row">
				<text>销量：{{goodsInf.goodsSales}}</text>
				<text>库存：{{goodsInf.goodsInventory}}</text>
				<text>浏览量：{{goodsInf.goodsBrowse}}</text>
			</view>
		</view>
		<!-- 分享 -->
		<view class="share-section" @click="shareShowMethod">
			<view class="share-icon">
				<text class="yticon icon-xingxing"></text>
				返
			</view>
			<text class="tit">该商品分享可领49减10红包</text>
			<text class="yticon icon-bangzhu1"></text>
			<view class="share-btn">
				立即分享 >
				<text class="yticon icon-you"></text>
			</view>
		</view>
		<van-action-sheet @close="onClose" overlay close-on-click-overlay round :show="shareShow" :title="shareTitle">
			<!-- 分享信息 -->
			<view class="shareInformation">
				<van-grid :gutter="3" square column-num="3">
					<van-grid-item @click="shareTo(item.text)" v-for="(item,key) in shareInf" :key="key" :url="item.toUrl" :text="item.text"
					 :icon="item.photoSrc" />
				</van-grid>
			</view>
		</van-action-sheet>
		<!-- 中间部分  -购买类型 -->
		<view class="c-list" @click="typeShowMethod">
			<van-cell is-link>
				<view slot="title">
					<view class="van-cell-text">购买类型</view>
					<view class="con">
						<text class="select-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">{{sItem.name}}</text>
					</view>
				</view>
			</van-cell>
		</view>
		<van-action-sheet @close="onClose" overlay close-on-click-overlay round :show="typeShow" :title="typeTitle">
			<!-- 类型信息 -->
			<view class="typeInformation">
				<view class="a-t">
					<image src="https://inews.gtimg.com/om_bt/OjPq2cnMN_-ivDKjxpCZ2kk_ab8YC5VMnL-0pQ21fUvd4AA/1000" role="img"></image>
					<view class="right" :key="index" v-for="(goodsInf,index) in goodsInf">
						<text class="price">￥{{goodsInf.goodsPirce}}</text>
						<text class="stock">库存：{{goodsInf.goodsInventory}}件</text>
						<view class="selected">
							已选：
							<text class="select-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">{{sItem.name}}</text>
						</view>
					</view>
				</view>
				<view v-for="(item,index) in specList" :key="index" class="attr-list">
					<text>{{item.name}}</text>
					<view class="item-list">
						<text v-for="(childItem, childIndex) in specChildList" v-if="childItem.pid === item.id" :key="childIndex" class="tit"
						 :class="{selected: childItem.selected}" @click="selectSpec(childIndex, childItem.pid)">
							{{childItem.name}}
						</text>
					</view>
				</view>
				<view class="vButton">
					<van-button plain round block color="#fa436a" type="primary" @click="onClose">完成</van-button>
				</view>
			</view>
		</van-action-sheet>
 
		<!-- 中间部分 -促销活动 -->
		<view class="c-row b-b">
			<text class="tit">促销活动</text>
			<view class="con-list">
				<text>新人首单送20元无门槛代金券</text>
				<text>订单满300减20</text>
				<text>订单满500减50元</text>
				<text>单笔购买满两件免邮费</text>
			</view>
		</view>
		<!-- 中间部分 -服务 -->
		<view class="c-row b-b">
			<text class="tit">服务</text>
			<view class="bz-list con">
				<text>7天无理由退货 ·</text>
				<text>假一赔十 · </text>
			</view>
		</view>
		<!-- 评价 -->
		<view class="eva-section">
			<view class="e-header">
				<van-cell is-link value="好评率 100%">
					<view slot="title">
						<view class="van-cell-text">评价(68)</view>
					</view>
				</van-cell>
			</view>
			<view class="eva-box">
				<van-image width="100%" height="100%" round class="myPhoto" src="https://inews.gtimg.com/om_bt/OjPq2cnMN_-ivDKjxpCZ2kk_ab8YC5VMnL-0pQ21fUvd4AA/1000">
				</van-image>
				<view class="right">
					<text class="name">张三</text>
					<text class="con">商品收到了，379元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text>
					<view class="bot">
						<text class="attr">购买类型：XL 红色</text>
						<text class="time">2019-04-01 19:21</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 图文详情 -->
		<view class="detail-desc">
			<view class="d-header">
				<text>———— 图文详情 ————</text>
			</view>
			<view class="d-photo">
				<van-image width="100%" height="100%" class="photo" v-for="(photo,index) in photoInformation" :src="photo.photoSrc"
				 :key="index">
				</van-image>
			</view>
		</view>
		<!-- <view class="page-bottom">
			<van-goods-action>
				<van-goods-action-icon icon="home-o" text="首页" link-type="switchTab" url="/pages/index/index" />
				<van-goods-action-icon icon="cart-o" text="购物车" link-type="switchTab" url="/pages/cart/index" />
				<van-goods-action-icon icon="shop-o" text="店铺" link-type="switchTab" url="/pages/shop/index" />
				<van-goods-action-button @click="addToShopCart" text="加入购物车" type="warning" />
				<van-goods-action-button @click="ImmediatePurchase" text="立即购买" />
			</van-goods-action>
		</view> -->
    		<!-- 底部导航栏 -->
		<!-- <view class="uni-padding-wrap uni-common-mt">
			<bttab :tabBars="tabBars" @TarTap="TarData" :tabIndex="tabIndex" @post="post(0)"></bttab>
		</view> -->
    <view style="position: fixed; bottom: 0; width: 100%;">
      <bttab></bttab>
    </view>
		<van-toast id="van-toast" />
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
				//轮播图配置
				lunboData: [],
				autoplay: true, //是否自动切换
				interval: 3000, //自动切换时长
				duration: 1200, //滑动动画时长
				circular: true, //是否自动采用衔接滑动
				//商品信息
				goodsInf: [],
				//分享
				shareShow: false,
				shareTitle: '分享商品',
				shareInf: [],
				//类型
				typeShow: false,
				typeTitle: '商品类型',
				specSelected: [],
 
				specList: [{
						id: 1,
						name: '尺寸',
					},
					{
						id: 2,
						name: '颜色',
					},
				],
				specChildList: [{
						id: 1,
						pid: 1,
						name: 'XS',
					},
					{
						id: 2,
						pid: 1,
						name: 'S',
					},
					{
						id: 3,
						pid: 1,
						name: 'M',
					},
					{
						id: 4,
						pid: 1,
						name: 'L',
					},
					{
						id: 5,
						pid: 1,
						name: 'XL',
					},
					{
						id: 6,
						pid: 1,
						name: 'XXL',
					},
					{
						id: 7,
						pid: 2,
						name: '白色',
					},
					{
						id: 8,
						pid: 2,
						name: '珊瑚粉',
					},
					{
						id: 9,
						pid: 2,
						name: '草木绿',
					},
				],
				//图表详情
				photoInformation: [],
			}
		},
		onLoad() {
			//轮播图
			this.swiperPictures();
			//商品信息
			this.goodsInformation();
			//分享商品
			this.shareInformation();
			//规格 默认选中第一条
			this.specList.forEach(item => {
				for (let cItem of this.specChildList) {
					if (cItem.pid === item.id) {
						this.$set(cItem, 'selected', true);
						this.specSelected.push(cItem);
						break; //forEach不能使用break
					}
				}
			});
			//图文详情信息
			this.getPhotoInformation();
		},
		methods: {
			//轮播图
			swiperPictures() {
				var data = {
					"datas": [{
							"id": 1,
							"imgurl": "https://inews.gtimg.com/om_bt/OjPq2cnMN_-ivDKjxpCZ2kk_ab8YC5VMnL-0pQ21fUvd4AA/1000"
						},
						{
							"id": 2,
							"imgurl": "https://inews.gtimg.com/om_bt/OjPq2cnMN_-ivDKjxpCZ2kk_ab8YC5VMnL-0pQ21fUvd4AA/1000"
						},
						{
							"id": 3,
							"imgurl": "https://inews.gtimg.com/om_bt/OjPq2cnMN_-ivDKjxpCZ2kk_ab8YC5VMnL-0pQ21fUvd4AA/1000"
						},
					]
				};
				this.lunboData = data.datas
			},
			//商品介绍
			goodsInformation() {
				var data = {
					"datas": [{
						"goodsId": '7',
						"goodsTitle": "恒源祥2020春季长袖白色t恤 新款春装", //标题
						"goodsPirce": 350, //现价
						"goodsMPrice": 500, //原价
						"goodsCoupon": "7折", //折扣
						"goodsSales": 216, //销量
						"goodsInventory": 3230, //库存
						"goodsBrowse": 676, //浏览量
					}, ]
				};
				//把数值赋值给goodsInf商品信息介绍
				this.goodsInf = data.datas
			},
			//加载分享弹窗
			shareShowMethod() {
				this.shareShow = true
			},
			//关闭弹窗
			onClose() {
				this.shareShow = false;
				this.typeShow = false;
			},
			//分享商品信息
			shareInformation() {
				var data = {
					"icons": [{
							"photoSrc": "/pagesGoods/static/images/share_wechat.png",
							"text": "微信好友",
							"toUrl": ""
						},
						{
							"photoSrc": "/pagesGoods/static/images/share_moment.png",
							"text": "朋友圈",
							"toUrl": ""
						},
						{
							"photoSrc": "/pagesGoods/static/images/share_qq.png",
							"text": "QQ好友",
							"toUrl": ""
						},
						{
							"photoSrc": "/pagesGoods/static/images/share_qqzone.png",
							"text": "QQ空间",
							"toUrl": ""
						},
					]
				};
				this.shareInf = data.icons
			},
			//分享去向
			shareTo(text) {
				console.log(text)
			},
			//加载类型弹窗
			typeShowMethod() {
				this.typeShow = true;
			},
			//选择规格
			selectSpec(index, pid) {
				let list = this.specChildList;
				list.forEach(item => {
					if (item.pid === pid) {
						this.$set(item, 'selected', false);
					}
				})
 
				this.$set(list[index], 'selected', true);
				//存储已选择
				/**
				 * 修复选择规格存储错误
				 * 将这几行代码替换即可
				 * 选择的规格存放在specSelected中
				 */
				this.specSelected = [];
				list.forEach(item => {
					if (item.selected === true) {
						this.specSelected.push(item);
					}
				})
			},
			//获取图文详情信息
			getPhotoInformation() {
				var data = {
					"icons": [{
							"photoSrc": "/pagesGoods/static/images/xq1.jpg",
						},
						{
							"photoSrc": "/pagesGoods/static/images/xq2.jpg",
						},
						{
							"photoSrc": "/pagesGoods/static/images/xq3.jpg",
						},
						{
							"photoSrc": "/pagesGoods/static/images/xq4.jpg",
						},
						{
							"photoSrc": "/pagesGoods/static/images/xq5.jpg",
						}
					]
				};
				//把数据赋值给photoInformation图文详情
				this.photoInformation = data.icons
			},
			//加入购物车
			addToShopCart() {
				console.log(this.goodsInf[0])
				var goodsinfo = {
					id: this.goodsInf[0].goodsId,
					title: this.goodsInf[0].goodsTitle,
					desc: this.goodsInf[0].goodsTitle,
					price: this.goodsInf[0].goodsPirce * 100,
					oprice: this.goodsInf[0].goodsMPrice * 100,
					num: 1,
					thumb: '/static/images/goodsimg/tu100.png'
				};
				// 
				this.$Toast({
					type: 'success',
					message: '添加成功',
					// duration: 0, // 持续展示 toast
				});
				//调用store 中 mutations来将商品加入到购物车
				this.$store.commit('addToCart', goodsinfo);
 
			},
			//立即购买
			ImmediatePurchase() {
 
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
 
	.carousel {
		height: 722rpx;
		position: relative
	}
 
	/*轮播控件*/
	.home-swiper {
		width: 100%;
		height: 100%;
	}
 
	.swiper-item {
		display: flex;
		justify-content: center;
		align-content: center;
		height: 750upx;
		overflow: hidden;
	}
 
	.slide-image {
		width: 100%;
		height: 100%;
	}
 
	/* 商品介绍 */
	.introduce-section {
		background: #ffffff;
		padding: 20rpx 30rpx;
	}
 
	.introduce-section .title {
		font-size: 32rpx;
		color: #303133;
		height: 50rpx;
		line-height: 50rpx;
	}
 
	.introduce-section .price-box {
		display: flex;
		align-items: baseline;
		height: 50rpx;
		padding: 10rpx 0;
		font-size: 26rpx;
		color: #fa436a;
	}
 
	.introduce-section .price {
		font-size: 34rpx;
	}
 
	.introduce-section .m-price {
		margin: 0 12rpx;
		color: #909399;
		text-decoration: line-through;
	}
 
	.introduce-section .coupon-tip {
		align-items: center;
		padding: 4rpx 10rpx;
		background: #fa436a;
		font-size: 24rpx;
		color: #ffffff;
		border-radius: 6rpx;
		line-height: 1;
		transform: translateY(-4rpx);
	}
 
	.introduce-section .bot-row {
		display: flex;
		align-items: center;
		height: 30rpx;
		font-size: 24rpx;
		color: #909399;
	}
 
	.introduce-section .bot-row text {
		flex: 1;
	}
 
	.share-section {
		display: flex;
		align-items: center;
		color: #606266;
		background: linear-gradient(to left, #fdf5f6, #fbebf6);
		padding: 12rpx 30rpx;
	}
 
	.share-section .share-icon {
		display: flex;
		align-items: center;
		width: 70upx;
		height: 30upx;
		line-height: 1;
		border: 1px solid #fa436a;
		border-radius: 4upx;
		position: relative;
		overflow: hidden;
		font-size: 22upx;
		color: #fa436a;
 
	}
 
	.share-section .share-icon:after {
		content: '';
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		left: -20rpx;
		top: -12rpx;
		position: absolute;
		background: #fa436a;
	}
 
	.share-section .icon-xingxing {
		position: relative;
		z-index: 1;
		font-size: 24rpx;
		margin-right: 35rpx;
		color: #fff;
		line-height: 1;
 
	}
 
	.share-section .tit {
		font-size: 28rpx;
		margin-left: 10rpx;
	}
 
	.share-section .icon-bangzhu1 {
		padding: 10rpx;
		font-size: 30rpx;
		line-height: 1;
	}
 
	.share-section .share-btn {
		flex: 1;
		text-align: right;
		font-size: 24rpx;
		color: #fa436a;
 
	}
 
	.share-section .icon-you {
		font-size: 24rpx;
		margin-left: 4rpx;
		color: #fa436a;
	}
 
	.shareInformation {
		width: 100%;
		height: 275px;
	}
 
	.c-list {
		width: 100%;
		font-size: 26rpx;
	}
 
	.c-list .van-cell-text {
		width: 25%;
		display: flex;
		float: left;
		color: #606266;
	}
 
	.c-list .con .select-text {
		margin-right: 10rpx;
		color: #303133;
	}
 
	.typeInformation {
		width: 100%;
		margin-bottom: 5%;
	}
 
	.typeInformation .a-t {
		display: flex;
		width: 90%;
		margin: 0 auto;
	}
 
	.typeInformation .a-t image {
		width: 130rpx;
		height: 130rpx;
		border-radius: 8rpx;
	}
 
	.typeInformation .a-t .right {
		display: flex;
		flex-direction: column;
		padding-left: 24rpx;
		font-size: 26rpx;
		color: #606266;
		line-height: 42rpx;
	}
 
	.typeInformation .a-t .right .price {
		font-size: 32rpx;
		color: #fa436a;
		margin-bottom: 10rpx;
 
	}
 
	.typeInformation .a-t .right .select-text {
		margin-right: 10rpx;
	}
 
	.typeInformation .attr-list {
		display: flex;
		flex-direction: column;
		font-size: 30rpx;
		color: #606266;
		padding-top: 30rpx;
		padding-left: 10rpx;
	}
 
	.typeInformation .item-list {
		padding: 20rpx 0 0;
		display: flex;
		flex-wrap: wrap;
	}
 
	.typeInformation .item-list .selected {
		background: #fbebee;
		color: #fa436a;
	}
 
	.typeInformation .item-list text {
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		background: #eee;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 100rpx;
		min-width: 60rpx;
		height: 60rpx;
		padding: 0 20rpx;
		font-size: 28rpx;
		color: #303133;
	}
 
	.typeInformation .vButton {
		width: 90%;
		margin: 0 auto;
		margin-top: 30rpx
	}
 
	.c-row {
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;
		position: relative;
		font-size: 26rpx;
		color: #606266;
		background-color: #FFFFFF;
	}
 
	.c-row .tit {
		width: 23%;
	}
 
	.c-row .con-list {
		flex: 1;
		display: flex;
		flex-direction: column;
		color: #303133;
		line-height: 40rpx;
	}
 
	.c-row .bz-list {
		height: 40rpx;
		font-size: 26rpx;
		color: #303133;
	}
 
	.c-row .con {
		flex: 1;
	}
 
	.c-row .bz-list text {
		display: inline-block;
		margin-right: 30rpx;
	}
 
	.eva-section {
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		margin-top: 16rpx;
	}
 
	.eva-section .eva-box {
		display: flex;
		padding: 20rpx 32rpx;
	}
 
	.eva-section .eva-box .myPhoto {
		flex-shrink: 0;
		width: 80rpx;
		height: 80rpx;
	}
 
	.eva-box .right {
		flex: 1;
		display: flex;
		flex-direction: column;
		font-size: 28rpx;
		color: #606266;
		padding-left: 26rpx;
	}
 
	.eva-box .right .con {
		font-size: 28rpx;
		color: #303133;
		padding: 20rpx 0;
	}
 
	.eva-box .right .bot {
		font-size: 24rpx;
		display: flex;
		color: #909399;
	}
 
	.detail-desc {
		background-color: #FFFFFF;
		margin: 16rpx 0px;
		height: 2026px;
	}
 
	.detail-desc .d-header {
		align-items: center;
		height: 80rpx;
		font-size: 30rpx;
		color: #303133;
		position: relative;
		text-align: center;
		line-height: 80rpx;
 
	}
 
	.detail-desc .d-header text {
		padding: 0 20rpx;
		background: #FFFFFF;
		position: relative;
	}
 
	.detail-desc .d-photo {
		width: 100%;
		height: 400px;
	}
 
	.page-bottom {
		position: fixed;
		left: 30rpx;
		bottom: 30rpx;
		display: flex;
		width: 690rpx;
		height: 100rpx;
		border-radius: 16rpx;
 
	}
</style>