<template>
	<view class="container">
		<poster ref="poster" style="margin: 40rpx;" v-for="(item,index) in drawDataList" :key="index" :imageUrl="item.imageUrl"
		 :imageWidth="275" :imageHeight="490" :drawData="item.drawData" :config="config" :wechatCode="false"
		 :wechatCodeConfig="wechatCodeConfig" @click="createdPoster(index)" @loading="onLoading" @success="onSuccess" @fail="onFail"
		 @hidemask="onHidemask">
		</poster>
	</view>
</template>

<script>
	import poster from "@/page_school/components/poster/index.vue";
	export default {
		components: {
			poster
		},
		data() {
			return {
				config: {
					imageMode: 'aspectFit',
					// canvasWidth 和 convasHeight使用的是px，防止不同设备Dpr不统一，导致最后图片留白边问题
					canvasWidth: 275,
					convasHeight: 490,
					posterHeight: '80%',
				},
				// 有几项就会创建几个poster
				drawDataList: [],
				wechatCodeConfig: {
					serverUrl: 'https://xxx.xxx.com/xxx/xxx',
					scene: '123123',
					config: {
						x: 84.5,
						y: 320,
						w: 100,
						h: 100
					}
				}
			};
		},
		created() {
			// 默认绘画配置
			let defaultDrawData = [{
					type: 'image',
					config: {
						url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/WXACode.fa3d686a.png',
						x: 97.5,
						y: 325,
						w: 80,
						h: 80
					},
				},
				{
					type: 'text',
					config: {
						text: '生成海报插件做的太好啦',
						x: 140,
						y: 60,
						color: '#E60012',
						font: 'normal bold 16px 仿宋',
						textAlign: 'center'
					}
				}
			];
			// 模拟异步请求获得到的数据
			setTimeout(() => {
				this.wechatCodeConfig.scene = '456787';
				this.drawDataList = [{
					imageUrl: 'https://th.bing.com/th/id/OIP.ydBQtMOKmGToPX49mtl0VAHaJ5?rs=1&pid=ImgDetMainb3c5f75a021d6c97217a8e828',
					drawData: [{
							type: 'image',
							config: {
								url: 'https://th.bing.com/th/id/OIP.ydBQtMOKmGToPX49mtl0VAHaJ5?rs=1&pid=ImgDetMainb3c5f75a021d6c97217a8e828',
								x: 0,
								y: 0,
								w: 275,
								h: 490
							},
						},
						...defaultDrawData
					]
				}, {
					imageUrl: 'https://res.wx.qq.com/wxdoc/dist/assets/img/WXACode.fa3d686a.png',
					drawData: [{
							type: 'image',
							config: {
								url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/WXACode.fa3d686a.png',
								x: 0,
								y: 0,
								w: 275,
								h: 490
							},
						},
						{
							type: 'image',
							config: {
								url: 'https://th.bing.com/th/id/OIP.ydBQtMOKmGToPX49mtl0VAHaJ5?rs=1&pid=ImgDetMainb3c5f75a021d6c97217a8e828',
								x: 97.5,
								y: 325,
								w: 80,
								h: 80
							},
						}
					]
				}, {
					imageUrl: 'https://th.bing.com/th/id/OIP.ydBQtMOKmGToPX49mtl0VAHaJ5?rs=1&pid=ImgDetMainb3c5f75a021d6c97217a8e828',
					drawData: [{
							type: 'image',
							config: {
								url: 'https://th.bing.com/th/id/OIP.ydBQtMOKmGToPX49mtl0VAHaJ5?rs=1&pid=ImgDetMainb3c5f75a021d6c97217a8e828',
								x: 0,
								y: 0,
								w: 275,
								h: 490
							},
						},
						...defaultDrawData
					]
				}];
			}, 1000)
		},
		methods: {
			onLoading() {
				console.log('Loading:正在加载静态资源')
			},
			onSuccess() {
				console.log('Success:创建海报成功')
			},
			onFail(e) {
				console.log('Fail:创建海报失败', e);
			},
			onHidemask() {
				console.log('hidemask:隐藏遮罩')
			},
			createdPoster(index) {
				// 调用 createImage 开始创建海报
				this.$refs.poster[index].createImage();
			}
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
</style>
