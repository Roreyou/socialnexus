<!-- 海报 配置部分 -->
<template>
	<view class="container">
		<!-- <text>点击图片生成海报</text> -->
		<poster ref="poster" :imageUrl="image" :imageWidth="550" :imageHeight="980" :drawData="drawData" :config="config"
		 :wechatCode="false" :wechatCodeConfig="wechatCodeConfig" @click="createdPoster" @loading="onLoading" 
		 @success="onSuccess" @fail="onFail">
			<template v-slot:header>
				<view></view>
			</template>
		</poster>
	</view>
</template>

<script>
	import poster from "@/page_school/components/poster/index.vue";
	export default {
		props:{

		},
		components: {
			poster
		},
		data() {
			return {
				acti_id: '',
				image: 'https://pic3.zhimg.com/v2-12c09440b7049d539b5e9cd86665d48a_r.jpg',
				config: {
					imageMode: 'aspectFit',
					posterHeight: '80%',
					// canvasWidth 和 convasHeight使用的是px，防止不同设备Dpr不统一，导致最后图片留白边问题
					//原本的尺寸：
					// canvasWidth: 275,
					//尝试放大的尺寸：
					canvasWidth: 320,
					convasHeight: 510,
				},
				drawData: [],
				wechatCodeConfig: {
					serverUrl: 'https://xxx.xxx.com/xxx/xxx',
					scene: '123123',
					config: {
						x: 84.5,
						y: 320,
						w: 100,
						h: 100
					}
				},
				detail:{},
			}
		},
		onLoad(options) {

			const activityId = options.acti_id;
			console.log("activityId:",activityId);
			this.acti_id = activityId;

			//尝试把created里面的内容挪过来
			// const activityId = this.acti_id;	

			//发请求
			uni.request({
				url: this.$url.BASE_URL + '/schoolteam/activsquare/posterinfo',
				
				header:{
					Authorization:uni.getStorageSync("token")
				},					
				method: 'GET',
				data: {
					acti_id: activityId,
				},
				success: res => {
					if(res.data.code == 200){
						this.detail = res.data.data;	
						this.setData()	
					}else if(res.data.code == 401){
						console.log("token过期");
						uni.showModal({
						title: '',
						content: '登录已过期。是否前去登录？',
						success: function(res) {
						if (res.confirm) {
							// 用户点击了确定
							uni.reLaunch({
								url: '../../../pages/login/login',
							})
						} else if (res.cancel) {
							// uni.navigateBack()
							return;							
						}
						}
					});
					}
								
									
					this.net_error = false;

				},
				fail: res => {
					this.net_error = true;
					uni.showToast({
						icon: 'none',
						title: '网络较差，请重试'
					});
				},
				complete: () => {
				}
			})
		},
		// created() {
		// 	console.log("this.acti_id:",this.acti_id)
		// 	// const { acti_id } = this.$mp.query;
		// 	// this.acti_id = acti_id
		// 	const activityId = this.acti_id;	
		// 	// 模拟异步请求获得到的数据 （模拟后端返回数据？
		// 	// setTimeout(() => {
		// 	// 	this.wechatCodeConfig.scene = '456787';
		// 	// 	this.drawData = [{
		// 	// 			type: 'image',
		// 	// 			config: {
		// 	// 				url: 'https://img.tukuppt.com/ad_preview/00/03/67/5c98ae4fe6577.jpg!/fw/780',  //背景图
		// 	// 				x: 0,
		// 	// 				y: 0,
		// 	// 				//w: 275,
		// 	// 				w: 320,
		// 	// 				h: 510
		// 	// 			},
		// 	// 		},
					
		// 	// 		{
		// 	// 			type: 'image',
		// 	// 			config: {
		// 	// 				url: 'https://img95.699pic.com/photo/50157/9961.jpg_wh860.jpg',  //社区图
		// 	// 				// x: 97.5,
		// 	// 				x:20,
		// 	// 				y:20,
		// 	// 				w: 280,
		// 	// 				h: 250
		// 	// 			},
		// 	// 		},
		// 	// 		{
		// 	// 			type: 'image',
		// 	// 			config: {
		// 	// 				url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/WXACode.fa3d686a.png',  //二维码图
		// 	// 				// x: 97.5,
		// 	// 				x:120,
		// 	// 				y: 410,
		// 	// 				w: 80,
		// 	// 				h: 80
		// 	// 			},
		// 	// 		},
		// 	// 		{
		// 	// 			type: 'text',
		// 	// 			config: {
		// 	// 				text: '古镇消防大队4月冈东村消防安全宣传活动',
		// 	// 				// x: 140,
		// 	// 				x: 160,
		// 	// 				// y: 60,
		// 	// 				y:300,
		// 	// 				color: '#000000',
		// 	// 				// font: 'normal bold 16px 仿宋',
		// 	// 				font: 'bold 16px 黑体',
		// 	// 				textAlign: 'center'
		// 	// 			}
		// 	// 		},
		// 	// 		{
		// 	// 			type: 'text',
		// 	// 			config: {
		// 	// 				text: '开始时间:2024年04月30日 15:00',
		// 	// 				// x: 140,
		// 	// 				x: 160,
		// 	// 				// y: 60,
		// 	// 				y:330,
		// 	// 				color: '#a3a9a4',
		// 	// 				font: 'normal bold 16px 仿宋',//后面每行的Y加20
		// 	// 				textAlign: 'center'
		// 	// 			}
		// 	// 		},
		// 	// 		{
		// 	// 			type: 'text',
		// 	// 			config: {
		// 	// 				text: '结束时间:2024年04月30日 19:30',
		// 	// 				// x: 140,
		// 	// 				x: 160,
		// 	// 				// y: 60,
		// 	// 				y:350,
		// 	// 				color: '#a3a9a4',
		// 	// 				font: 'normal bold 16px 仿宋',
		// 	// 				textAlign: 'center'
		// 	// 			}
		// 	// 		},
		// 	// 		{
		// 	// 			type: 'text',
		// 	// 			config: {
		// 	// 				text: '活动地点:广东省 中山市 古镇镇 明珠家园',
		// 	// 				// x: 140,
		// 	// 				x: 160,
		// 	// 				// y: 60,
		// 	// 				y:370,
		// 	// 				color: '#a3a9a4',
		// 	// 				font: 'normal bold 16px 仿宋',
		// 	// 				textAlign: 'center'
		// 	// 			}
		// 	// 		},
		// 	// 		{
		// 	// 			type: 'text',
		// 	// 			config: {
		// 	// 				text: '发布组织:中山市古镇消防志愿服务队',
		// 	// 				// x: 140,
		// 	// 				x: 160,
		// 	// 				// y: 60,
		// 	// 				y:390,
		// 	// 				color: '#a3a9a4',
		// 	// 				font: 'normal bold 16px 仿宋',
		// 	// 				textAlign: 'center'
		// 	// 			}
		// 	// 		},
		// 	// 	];
		// 	// }, 1000)

		// 	//发请求
		// 	uni.request({
		// 		url: this.$url.BASE_URL + '/schoolteam/activsquare/posterinfo',
				
		// 		header:{
		// 			Authorization:uni.getStorageSync("token")
		// 		},					
		// 		method: 'GET',
		// 		data: {
		// 			acti_id: activityId,
		// 		},
		// 		success: res => {
		// 			if(res.data.code == 200){
		// 				this.detail = res.data.data;	
		// 				this.setData()	
		// 			}else if(res.data.code == 401){
		// 				console.log("token过期");
		// 				uni.showModal({
		// 				title: '',
		// 				content: '登录已过期。是否前去登录？',
		// 				success: function(res) {
		// 				if (res.confirm) {
		// 					// 用户点击了确定
		// 					uni.reLaunch({
		// 						url: '../../../pages/login/login',
		// 					})
		// 				} else if (res.cancel) {
		// 					// uni.navigateBack()
		// 					return;							
		// 				}
		// 				}
		// 			});
		// 			}
								
									
		// 			this.net_error = false;

		// 		},
		// 		fail: res => {
		// 			this.net_error = true;
		// 			uni.showToast({
		// 				icon: 'none',
		// 				title: '网络较差，请重试'
		// 			});
		// 		},
		// 		complete: () => {
		// 		}
		// 	})
		// },
		methods: {
			// 保存到相册
			saveToAlbum() {
				this.$refs.poster.saveToAlbum()
			},
			onLoading(){
				console.log('Loading:正在加载静态资源')
			},
			onSuccess(){
				console.log('Success:创建海报成功')
			},
			onFail(e){
				console.log('Fail:创建海报失败',e)
			},
			createdPoster(){
				// 调用 createImage 开始创建海报
				this.$refs.poster.createImage()
			},
			//根据响应设置海报配置
			setData(){
				let Data = [{
						type: 'image',
						config: {
							url: 'https://img.tukuppt.com/ad_preview/00/03/67/5c98ae4fe6577.jpg!/fw/780',  //背景图
							x: 0,
							y: 0,
							//w: 275,
							w: 320,
							h: 510
						},
					},
					
					{
						type: 'image',
						config: {
							url: 'https://img95.699pic.com/photo/50157/9961.jpg_wh860.jpg',  //社区图
							// x: 97.5,
							x:20,
							y:20,
							w: 280,
							h: 250
						},
					},
					{
						type: 'image',
						config: {
							url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/WXACode.fa3d686a.png',  //二维码图
							// x: 97.5,
							x:120,
							y: 410,
							w: 80,
							h: 80
						},
					},
					{
						type: 'text',
						config: {
							text: '古镇消防大队4月冈东村消防安全宣传活动',
							// x: 140,
							x: 160,
							// y: 60,
							y:300,
							color: '#000000',
							font: 'bold 16px 黑体',
							textAlign: 'center'
						}
					},
					{
						type: 'text',
						config: {
							text: '开始时间:2024年04月30日 15:00',
							// x: 140,
							x: 160,
							// y: 60,
							y:330,
							color: '#a3a9a4',
							font: 'normal bold 14px 仿宋',//后面每行的Y加20
							textAlign: 'center'
						}
					},
					{
						type: 'text',
						config: {
							text: '结束时间:2024年04月30日 19:30',
							// x: 140,
							x: 160,
							// y: 60,
							y:350,
							color: '#a3a9a4',
							font: 'normal bold 14px 仿宋',
							textAlign: 'center'
						}
					},
					{
						type: 'text',
						config: {
							text: '活动地点:广东省 中山市 古镇镇 明珠家园',
							// x: 140,
							x: 160,
							// y: 60,
							y:370,
							color: '#a3a9a4',
							font: 'normal bold 14px 仿宋',
							textAlign: 'center'
						}
					},
					{
						type: 'text',
						config: {
							text: '发布组织:中山市古镇消防志愿服务队',
							// x: 140,
							x: 160,
							// y: 60,
							y:390,
							color: '#a3a9a4',
							font: 'normal bold 14px 仿宋',
							textAlign: 'center'
						}
					},
				];
				Data[1].config.url = this.detail.acti_picture;		
				Data[2].config.url = this.detail.code_picture;	
				Data[3].config.text = this.detail.name;	
				Data[4].config.text = '开始时间：'+ this.detail.begin_time;	
				Data[5].config.text = '结束时间：'+ this.detail.end_time;
				Data[6].config.text = '活动地点：'+ this.detail.address;	
				Data[7].config.text = '发布基层：'+ this.detail.community_name;
				this.drawData = Data;
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	/* 指示文字 */
	.wenzi{
		font-size: 15px;
		color: #000000;
		margin-top: 30px;
	}
</style>
