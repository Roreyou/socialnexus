<!-- 海报 核心部分 -->
<template>
	<view class="poster_wrapper">
		<slot name="header"></slot>
		<!-- 要生成海报的图片 -->
		<!-- <image :src="imageUrl" mode="aspectFill" :style="{width:imageWidth + 'rpx',height:imageHeight + 'rpx'}" @click="click"></image> -->
		<!-- 这里把canvas移到了屏幕外面，如果需要查看canvas的话把定位去掉 -->
		<!-- position:'fixed',left:'9999px',top:'0' -->
		<canvas :style="{width:canvasWidth + 'px',height:canvasHeight + 'px',position:'fixed',left:'9999px',top:'0'}"
		 canvas-id="myCanvas" id="myCanvas" class="canvas"></canvas>
		<!-- 遮罩层 -->
		<view class="mask" v-if="showMask" @click="hideMask">
			<!-- 生成的海报图 -->
			<image :style="posterSize" :src="lastPoster" :mode="config.imageMode" @click.stop=""></image>
			<view class="btn_wrapper" @click.stop>
				<slot name="save">
					<button type="primary" @click="saveToAlbum">保存至相册</button>
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		loadImage,
		createPoster,
		canvasToTempFilePath,
		saveImageToPhotosAlbum
	} from '@/page_school/utils/poster.js';
	import {
		getWechatCode
	} from "@/page_school/utils/appletCode.js";
	export default {
		props: {
			// 展示图片的宽 单位 rpx
			imageWidth: {
				type: [String, Number],
				default: 550
			},
			// 展示图片的高 单位 rpx
			imageHeight: {
				type: [String, Number],
				default: 980
			},
			// 展示图片的url
			imageUrl: {
				type: String,
				default: '',
				required: true
			},
			// 绘制海报的数据参数
			drawData: {
				type: Array,
				default: () => ([]),
				required: true
			},
			// 海报的配置参数
			config: {
				type: Object,
				default: () => ({
					imageMode: 'aspectFit',
					posterHeight: '80%',
				}),
			},
			// 是否需要小程序二维码
			wechatCode: {
				type: Boolean,
				default: false
			},
			// 小程序二维码的配置参数
			wechatCodeConfig: {
				type: Object,
				default: () => ({
					serverUrl: '',
					scene: '',
					config: {
						x: 0,
						y: 0,
						w: 100,
						h: 100
					}
				}),
			}
		},
		data() {
			return {
				// 资源是否加载成功的标志
				readyed: false,
				// 将网络图片转成静态图片后的绘制参数
				imageMap: [],
				// 最后生成的海报的本地缓存地址
				lastPoster: '',
				// 是否展示遮罩
				showMask: false,
				// 是否加载资源的标志
				loadingShow: false,
				// 是否可以创建海报
				disableCreatePoster:false,
			}
		},
		computed: {
			// 所生成海报图的大小
			posterSize() {
				let str = '';
				this.config.posterWidth && (str += `width:${this.config.posterWidth};`);
				this.config.posterHeight && (str += `height:${this.config.posterHeight};`);
				return str
			},
			// 画布的宽，优先使用配置的宽，如果没用配置默认使用图片的宽
			// 需要主要的是这里canvas和image的单位不同，不过并不影响
			// 我们在绘制时（配置drawData）以px为基准进行绘制就行，用px的原因时防止不同设备Dpr不同导致无法确定画布的具体宽高，使得最后的图片可能会留白边
			canvasWidth(){
				return this.config.canvasWidth ? this.config.canvasWidth : this.imageWidth
			},
			// 画布的高，优先使用配置的高，如果没用配置默认使用图片的高
			canvasHeight(){
				return this.config.convasHeight ? this.config.convasHeight : this.imageHeight
			}
		},
		watch: {
			// 监听外部绘制参数的变化，重新加载资源
			drawData(newVlaue) {
				this.loadingResources(newVlaue)
				this.$emit('click')
			},
			// 监听readyed变化
			readyed(newVlaue) {
				// 用户点击了生成海报且资源还没有加载好，待资源加载好后触发海报生成
				if (newVlaue == true && this.loadingShow == true) {
					uni.hideLoading()
					this.loadingShow = false;
					this.disableCreatePoster = false;
					this.createImage();
				}
			}
			// 会存在异步问题，还没解决。
			// 目前的解决方法 1.在绘制之前先改变 scene 2.改变scene后手动调用this.loadingResources 函数，但是资源会重新加载
			// "wechatCodeConfig.scene":function (newVlaue){
			// 	console.log('wechatCodeConfig.scene',this.imageMap)
			// 	this.loadingWechatCode(this.imageMap)
			// }
		},
		created() {
			this.loadingResources(this.drawData)

		},
		methods: {
			
			// 加载静态资源，创建或更新组件内所下载本地图片集合
			async loadingResources(drawData) {
				this.readyed = false;
				if (!drawData.length || drawData.length <= 0) return;
				// 加载静态图片，将所以图片的网络地址替换成本地缓存地址
				const tempMap = [];
				for (let i = 0; i < drawData.length; i++) {
					let temp
					if (drawData[i].type === "image") {
						temp = await loadImage(drawData[i].config.url);
						drawData[i].config.url = temp;
					}
					tempMap.push({ 
						...drawData[i],
						url: temp
					})
				}
				// 加载小程序二维码
				await this.loadingWechatCode(tempMap);
				// 赋值给imageMap保存
				this.imageMap = tempMap;
				setTimeout(() => {
					this.readyed = true;
				}, 100)
			},
			// 绘制海报图
			async createImage() {
				// 禁用生成海报，直接返回
				if(this.disableCreatePoster) return
				this.disableCreatePoster = true;
				try {
					if (!this.readyed) {
						uni.showLoading({
							title: '正在生成海报...'
						});
						this.loadingShow = true;
						this.$emit('loading')
						return
					}
					// 获取上下文对象,组件内一定要传this
					const ctx = uni.createCanvasContext('myCanvas', this);
					await createPoster(ctx, this.imageMap);
					this.lastPoster = await canvasToTempFilePath('myCanvas', this);
					this.showMask = true;
					this.disableCreatePoster = false;
					// 创建成功函数
					this.$emit('success')
				} catch (e) {
					// 创建失败函数
					this.disableCreatePoster = false;
					this.$emit('fail', e)
				}
			},
			// 加载或更新小程序二维码
			async loadingWechatCode(tempMap) {
				if (this.wechatCode) {
					if (this.wechatCodeConfig.serverUrl) {
						const code = await getWechatCode(this.wechatCodeConfig.serverUrl, this.wechatCodeConfig.scene || '');
						// 记录替换的索引，没有就替换length位，即最后加一个
						let targetIndex = tempMap.length;
						for (let i = 0; i < tempMap.length; i++) {
							if (tempMap[i].wechatCode) targetIndex = i;
						}
						tempMap.splice(targetIndex, 1, {
							type: 'image',
							url: code.path,
							// 标记是小程序二维码
							wechatCode: true,
							config: this.wechatCodeConfig.config,
						})
					} else {
						throw new Error('serverUrl请求二维码服务器地址不能为空')
					}
				}
				return tempMap
			},
			// 保存到相册
			saveToAlbum() {
				saveImageToPhotosAlbum(this.lastPoster).then(res => {
					this.showMask = false;
					uni.showToast({
						icon: 'none',
						title: '保存成功'
					})
					setTimeout(function() {
						wx.navigateBack({
						delta: 1 // 返回的页面数，1表示返回上一页，依此类推
					})
					}, 900); // 1000毫秒 = 1秒
				}).catch(err => {
					
				})
			},
			click() {
				this.$emit('click')
			},
			hideMask(){
				this.showMask = false;
				wx.navigateBack({
					delta: 1 // 返回的页面数，1表示返回上一页，依此类推
				})
				this.$emit('hidemask')

			}
		},
	}
</script>

<style scoped>
	.poster_wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.canvas {
		border: 1px solid #333333;
	}

	.mask {
		width: 100vw;
		height: 100vh;
		position: fixed;
		background-color: rgba(0,0,0,.4);
		left: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	/* 保存按钮 */
	.btn_wrapper{
	/* border-radius: 10px; 
	border: 1px solid #ffffff;  */

	}
	.btn_wrapper button{
		border-radius: 10px; /* 设置圆角半径 */
		border: 1px solid #ffffff; /* 设置白色边框 */
		font-size: 18px;
		color: #ffffff;
		background-color: rgba(169, 169, 169, 0.5); /* 设置灰色透明背景色，这里的rgba值表示灰色，最后一个参数0.5表示透明度 */
  		backdrop-filter: blur(10px); /* 设置磨砂质感，具体数值可以根据需要调整 */
	}
</style>
