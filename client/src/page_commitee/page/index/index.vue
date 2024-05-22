<!-- 校团委 首页 -->
<template>
  <view class="u-p-l-10 u-p-r-10">    
    <!-- 最顶部信息 -->
		<view class="cu-list menu-avatar padding-lg background">
			<view class="user-section">
				<image :src="avatar" class="cu-avatar xl round"></image>
				<view class="text-white text-xl padding">中大校团委</view>
				<!-- <view class="cu-btn bg-blue margin-left-sm" @click="handleAuthentication" style="font-family: pmkaiti;">认证信息</view> -->
			</view>
		</view>

		<view> 
			
		<view class="rowClass">
        <!-- 点击去高校队伍/社区需求 -->
				<u-row>
					<u-col span="6" text-align="center" v-for="(item,index) in navList" :key="index" >
						<view class="u-padding-20" @tap="clickNav(item.type)" hover-class="hoverClass" style="background-color: #ffffff; border-radius: 30rpx; margin-right: 4rpx;">
							<image :src="item.src" style="width: 90rpx;height: 90rpx;" mode="widthFix"></image>
							<view class="tabName">{{item.name}}</view>
						</view>
					</u-col>
				</u-row>
			</view>

      <!-- 一个间隔 -->
			<!-- <u-gap height="10"></u-gap> -->

      <!-- 滚动通知栏 -->
			<view @click="notice" class="margin-fixed">
				<u-notice-bar mode="vertical" :list="noticeList" type="primary" :more-icon="false"
				bg-color="#fff" :duration="5000" border-radius="15"></u-notice-bar>
			</view>
			<u-gap height="5"></u-gap>
		</view> 

    <!-- 红色图片轮播图 -->
		<!-- <view>
			<u-swiper :list="swiperList" height="400"></u-swiper>
		</view>	  -->
    <view class="uni-margin-wrap margin-fixed" >
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
        <swiper-item v-for="item in swiperList" :key="item.id">
          <image class="swiper-item" :src="item.imageSrc"></image>
        </swiper-item>
			</swiper>
	</view>

    <u-gap height="10"></u-gap>
		
	<!-- 数据墙-数字部分-->
	<view class="dataWallBG margin-fixed grid-container">
		<view class="grid-item" v-for="(item,index) in wallDataList" :key="index">
  		  <view class="text-num">{{item.number}}</view>
  		  <view class="description" :class="{ 'black-font': index === 2 }" >{{item.description}}</view>
  		</view>
	</view>
	
	<!-- 玫瑰图 高校院系比例 -->
	<view class="roseBG margin-fixed">
		<view class="action" style="margin-left: 15rpx;padding: 10px 0px 0px 0px;">
			<text class="cuIcon-titles text-green"></text>
			<text class="roseTitle text-bold">高校院系人数比例分析</text>
		</view>
		<view class="charts-box">
      		<qiun-data-charts 
      		  type="rose"
      		  :opts="opts"
      		  :chartData="teamChartData"
      		  background="rgba(255,255,255,0)"
      		/>
    	</view>
	</view>

	<!-- 玫瑰图 活动类型比例 -->
	<view class="roseBG margin-fixed">
		<view class="action" style="margin-left: 15rpx;padding: 10px 0px 0px 0px;">
			<text class="cuIcon-titles text-green"></text>
			<text class="roseTitle text-bold">活动类型比例分析</text>
		</view>
		<!-- <rose :chartData="activityChartData"></rose> -->
		<view class="charts-box">
      		<qiun-data-charts 
      		  type="rose"
      		  :opts="opts"
      		  :chartData="activityChartData"
      		  background="rgba(255,255,255,0)"
      		/>
    	</view>
	</view>




	<view style="background-color: rgb(234, 231, 231);" class="margin-fixed" v-show="false">
		
		<!-- 标题 -->
		<view class="cu-bar" style="background-color: transparent">
			<view class="action">
				<text class="text-xl text-bold" style="color: #000000; font-size: 40rpx; font-weight: 600; font-family: 'Arial'; font-style: normal; background-color: transparent">数据墙</text>
			</view>
		</view>

		<!-- 内容 -->
		<view >
			<view class="board" :class="isCard?'no-card':''">
				<view class="wallContent">
					<text class="text-xl text-bold" style="margin-top: 40px; color: rgb(195, 193, 197); font-size: 20rpx; font-weight: 600; font-family: 'Arial'; font-style: normal; background-color: transparent;"> 现有队伍 </text>
					<text class="text-xl text-bold wallData" style="color: rgb(120,118,221); font-size: 52rpx; font-weight: 600; font-family: 'Arial'; font-style: normal; background-color: transparent;"> 234个 </text>
				</view>
				<view class="wallContent">
					<text class="text-xl text-bold" style="margin-top: 40px; color: rgb(195, 193, 197); font-size: 20rpx; font-weight: 600; font-family: 'Arial'; font-style: normal; background-color: transparent;"> 现有活动 </text>
					<text class="text-xl text-bold wallData" style="color: rgb(120,118,221); font-size: 52rpx; font-weight: 600; font-family: 'Arial'; font-style: normal; background-color: transparent;"> 2824个 </text>
				</view>
				<view class="wallContent">
					<text class="text-xl text-bold" style="margin-top: 40px; color: rgb(195, 193, 197); font-size: 20rpx; font-weight: 600; font-family: 'Arial'; font-style: normal; background-color: transparent;"> 现有成员 </text>
					<text class="text-xl text-bold wallData" style="color: rgb(120,118,221); font-size: 52rpx; font-weight: 600; font-family: 'Arial'; font-style: normal; background-color: transparent;"> 28240名 </text>
				</view>
			</view>

		</view>

	</view>

	

    <!-- 当用户滚动页面时，提供一个快速返回页面顶部的按钮。 -->
    <!-- 当页面滚动到或超过指定的 top 值时，返回顶部按钮将显示出来。 -->
	<u-back-top :scroll-top="scrollTop" top="1000"></u-back-top>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import actilist from '../../../components/acti-list/acti-list.vue';
	// import * as echarts from "echarts";
	import rose from '../../../components/u-charts/rose/rose.vue';
	import qiunDataCharts from "@/uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue";
	export default {
		components: {
			actilist,
			rose,
			qiunDataCharts 
		},

		data() {
			return {
				avatar:'https://bkimg.cdn.bcebos.com/smart/4afbfbedab64034f78f004bd468b6e310a55b319b77d-bkimg-process,v_1,rw_1,rh_1,pad_1,color_ffffff?x-bce-process=image/format,f_auto',
				keyword: '',
				pageNum: 1,
				pageSize: 20,
				scrollTop: 0,
				// 轮播图相关
        		indicatorDots: true, // 轮播图的指示点是否显示
        		autoplay: true, // 轮播图自动播放
        		interval: 2000, // 自动播放时间间隔
        		duration: 500, // 滑动时长
				houseList: [],
				// 轮播图图片
				swiperList: [
        		  { id: 1, imageSrc: 'https://img.zcool.cn/community/012a2f5f9cce0f11013fdcc7329e32.jpg@1280w_1l_2o_100sh.jpg' },
        		  { id: 2, imageSrc: 'https://p4.img.cctvpic.com/photoworkspace/contentimg/2021/11/08/2021110810083211648.jpg' },
        		  { id: 3, imageSrc: 'https://picnew7.photophoto.cn/20130724/hongsegemingtupian-18805580_1.jpg' }, 
				  { id: 4, imageSrc: 'http://scu5azomr.hn-bkt.clouddn.com/static/2.png' },
				  { id: 5, imageSrc: 'http://scu5azomr.hn-bkt.clouddn.com/static/3.png' },
				  { id: 6, imageSrc: 'http://scu5azomr.hn-bkt.clouddn.com/static/4.png' }
        		],
				// 通知
				noticeList: [
					'强国有我，青春有为',
					'行万里路，知中国情',
				],
				navList:[
				   {name:"高校队伍",src:"https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/111.png",type:"1"},
				   {name:"社区需求",src:"https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/222.png",type:"2"},
				],
				loadStatus: 'loadmore',
				flowList: [],
				uvCode: uni.getStorageSync('uvCode'),
				wallDataList:[
					{
						number: 70,
						description:'学院、直属系'
					},
					{
						number: 22,
						description:'两院院士'
					},
					{
						number: 44,
						description:'博士后科研流动站'
					},
					{
						number: 36,
						description:'国家级研究机构'
					}
				],

				// 图表数据
				teamChartData:{
            	  series: [
            	    {
            	        data: [
            	            {"name":"其他","value":50},{"name":"软件工程学院","value":30},{"name":"中法核","value":20},{"name":"商学院","value":18},{"name":"历史学系","value":8}              
            	        ]
            	    }
            	  ]
            	},
				activityChartData:{
					series: [
            	    {
            	        data: [
            	            {"name":"22","value":50},{"name":"11","value":30},{"name":"33","value":20},{"name":"商学院","value":18},{"name":"历史学系","value":8}              
            	        ]
            	    }
            	  ]
            	},
				// rose组件
				//这里的 opts 是图表类型 type="rose" 的全部配置参数，您可以将此配置复制到 config-ucharts.js 文件中下标为 ['rose'] 的节点中来覆盖全局默认参数。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
    		        timing: "easeOut",
    		        duration: 1000,
    		        rotate: false,
    		        rotateLock: false,
    		        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
    		        padding: [0,0,0,0],
    		        fontSize: 11,
    		        fontColor: "#666666",
    		        dataLabel: true,
    		        dataPointShape: true,
    		        dataPointShapeType: "solid",
    		        touchMoveLimit: 60,
    		        enableScroll: false,
    		        enableMarkLine: false,
    		        // 右侧图例的配置
    		        legend: {
    		          show: true,
    		          position: "right",
    		          lineHeight: 25,
    		          float: "center",
    		          padding: 2,
    		          margin: 0,
    		          backgroundColor: "rgba(0,0,0,0)",
    		          borderColor: "rgba(0,0,0,0)",
    		          borderWidth: 0,
    		          fontSize: 11,
    		          fontColor: "#666666",
    		          hiddenColor: "#CECECE",
    		          itemGap: 10
    		        },
    		        extra: {
    		          rose: {
    		            type: "area",
    		            minRadius: 50,
    		            activeOpacity: 0.5,
    		            activeRadius: 10,
    		            offsetAngle: 0,
    		            labelWidth: 0.00000000000000000000000000000001,
    		            border: true,
    		            borderWidth: 2,
    		            borderColor: "#FFFFFF",
    		            linearType: "custom"
    		          },
    		          tooltip: {
    		            showBox: true,
    		            showArrow: true,
    		            showCategory: false,
    		            borderWidth: 0,
    		            borderRadius: 0,
    		            borderColor: "#000000",
    		            borderOpacity: 0.7,
    		            bgColor: "#000000",
    		            bgOpacity: 0.7,
    		            gridType: "solid",
    		            dashLength: 4,
    		            gridColor: "#CCCCCC",
    		            boxPadding: 3,
    		            fontSize: 13,
    		            lineHeight: 20,
    		            fontColor: "#FFFFFF",
    		            legendShow: true,
    		            legendShape: "auto",
    		            splitLine: true,
    		            horizentalLine: false,
    		            xAxisLabel: false,
    		            yAxisLabel: false,
    		            labelBgColor: "#FFFFFF",
    		            labelBgOpacity: 0.7,
    		            labelFontColor: "#666666"
    		          }
    		        }
    		      }
				
				
			}
		},
		onReady() {
   		  this.getChartData();
   		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin'])
		},

		// onLoad() {
		// 	uni.$on('findIndexHouseList', (obj) => {
		// 		// 获取数据
		// 		this.findHouseList(1);
		// 	})
		// 	// 获取数据
		// 	this.findHouseList();
		// },
		onUnload() {
			// 移除监听事件  
			uni.$off('findIndexHouseList');
		},
		onShow(){
			this.getChartData();
		},
		onPageScroll(e) {
		    this.scrollTop = e.scrollTop;
		},
		// onReachBottom() {
		//     this.loadStatus = 'loading';
		//     // 获取数据
		// 	this.findHouseList()
		// },
		// 下拉刷新
		// onPullDownRefresh() {
		// 	// 获取数据
		// 	this.findHouseList(1);
		// 	// 关闭刷新
		// 	uni.stopPullDownRefresh();
		// },
		methods: {
			getChartData(){
				// 同时请求数据
				uni.request({
					// url: this.$url.BASE_URL + '/4142061-0-default/school/datawall_team',
					url: this.$url.BASE_URL + '/school/datawall_team',
                	header:{
						Authorization:uni.getStorageSync("token")
					},	
					method: 'GET',
					data: {
						
					},
					success: res => {	
						console.log("成功请求-数据墙-院系人数比例");
						console.log(res.data.data);					
						this.teamChartData.series[0].data = res.data.data;
						this.net_error = false;
					},
					fail: res => {
						this.net_error = true;
					},
					complete: () => {
					}
				});

				// 活动类型
				uni.request({
					// url: this.$url.BASE_URL + '/4142061-0-default/school/datawall_act',
					url: this.$url.BASE_URL + '/school/datawall_act',
                	header:{
						Authorization:uni.getStorageSync("token")
					},	
					method: 'GET',
					data: {
						
					},
					success: res => {	
						console.log("成功请求-数据墙-活动类型比例");
						console.log(res.data.data);					
						this.activityChartData.series[0].data = res.data.data;
						this.net_error = false;
					},
					fail: res => {
						this.net_error = true;
					},
					complete: () => {
					}
				})
			},
			handleAuthentication(){
				this.$u.route({
					url: 'pages/school/index/verify',
				  })
			},
			location(){
				  this.$u.route({
					url: 'pages/location/location',
				  })
			},
			search(){
				this.$u.route({
					url: 'pages/search/search',
				})
			},
			notice(){
				this.$u.route({
					url: 'pages/notice/notice'
				})
			},
			checkUpdate(){
				uni.getSystemInfo({
					success:(res) => {
						//检测当前平台，如果是安卓则启动安卓更新  
						if(res.platform=="android"){  
							console.log('is android');
						}
					}  
				})
			},
			clickSearch() {
			    this.$u.route('/pages/school/search/search');
			},
			clickImage(houseId) {
				this.$u.route({
					url: '/pages/school/detail/detail',
					params: {
						houseId: houseId
					}
				})
			},
			clickNav(type){
				if(type === "1"){
					// this.$u.route('/pages/search/searchList');
					// this.$u.route('/pages/committee/searchSchool/searchSchool');
						uni.navigateTo({
							url:'../searchSchool/searchSchool'
						});
				}
				if(type === "2"){
					// 判断Token是否有效   这个逻辑最后再来加
					// let lifeData = uni.getStorageSync('lifeData');
					// let token = lifeData.vuex_token
					// if(!token){
					// 	// 没有token 则跳转到登录
					// 	return uni.reLaunch({
					// 		url:'../login/login'
					// 	})
					// }else{
					// 	this.$u.route('/pages/detail/preHouse');
					// }
					// this.$u.route('/pages/committee/searchActivity/searchActivity');
					uni.navigateTo({
						url:'../searchActivity/searchActivity'
					});
				}
			},
			code(){
				this.$mytip.toast('请咨询作者')
			},
			appSysFlowInfo(){
				let url = "web/appSysFlowInfo";
				this.$u.post(url,{
					uvCode:this.uvCode,
				}).then(code => {
					this.uvCode = code
				});
			},
			server(){
				// window.open('https://sourcebyte.cn')
			},
		}
	}
</script>

<style lang="scss" scoped>
	// 用户名
	.user-section {
		display: flex;
		align-items: center;
	}

	.nomore {
		background-color: $u-bg-color;
	}
	
	.search{
		width: 54px;
		height: 44px;
		
		&:active{
			background-color: $u-bg-color;
		}
	}
	
	.rowClass{
		border-radius: 30rpx;
    	// background-color: rgb(255, 255, 255);
    	margin-top: 20rpx;
    	margin-left: 20rpx;
    	margin-right: 20rpx;
	}
	
	.hoverClass{
		background-color: #E4E7ED;
	}
	
	.tabName{
		font-size: 28rpx;
		color: $u-main-color;
	}
	
	.demo-warter {
	    border-radius: 8px;
	    margin-top: 3px;
	    background-color: #ffffff;
	    padding: 3px;
	    position: relative;
	}
	
	.u-close {
	    position: absolute;
	    top: 20rpx;
	    right: 20rpx;
	}
	
	.item-cover {
	    font-size: 55rpx;
	    color: $u-type-warning;
	}
	
	.item-title {
	    font-size: 28rpx;
	    color: $u-main-color;
	    font-weight: bold;
		padding-top: 5rpx;
		padding-left: 10rpx;
	}
	
	.item-price {
	    font-weight: normal;
	    font-size: 32rpx;
	    color: $u-type-warning;
	}
	
	.item-desc {
	    font-weight: normal;
	    font-size: 26rpx;
	    color: $u-tips-color;
		padding-bottom: 5rpx;
		padding-left: 10rpx;
	}
	
	.item-tag {
	    font-size: 24rpx;
	    color: $u-tips-color;
	    margin-top: 3px;
	}
	
	.buttom {
		.loginType {
			font-size: 14px;
			position: fixed;
			right: 30rpx;
			bottom: 300rpx;
			width: 60px;
			height: 60px;
			padding: 4px;
			cursor: pointer;
			background: #FFF;
			text-align: center;
			line-height: 60px;
			border-radius: 100%;
			-webkit-box-shadow: 0px 1px 20px 0px rgba(0,0,0,0.1),inset 0px -1px 0px 0px rgba(0,0,0,0.1);
			box-shadow: 0px 1px 20px 0px rgba(0,0,0,0.1),inset 0px -1px 0px 0px rgba(0,0,0,0.1);
		}
	}

	.margin-left-sm{
		margin-left: 87rpx;
	}

	.cu-btn{
		border-radius: 15px;
    	background-color: rgba(255, 255, 255, 0.3);
    	backdrop-filter: blur(10px);
	}

	//活动推荐列表
	.cu-item .shadow{
	margin: 0;
	margin-top: 10rpx;
	}

	.cu-bar .action:first-child{
	margin-left: 24rpx;
	}

	//tag
	.wordcont{
	margin-top: 10rpx;
	}
	.wordcont .ackeywords {
		display: inline-block;
	margin-right: 10rpx; /* 可以调整标签之间的水平间距 */
	}

.board{
	border-radius: 10px;
	background-color: #ffffff;
	// background-image: url('../../static/graph.png');
	// background-image: linear-gradient(to right bottom, #6aa6fd, #85aefe, #9ab6fe, #adbeff, #bec7ff);
	height: 120px;
	margin-right: 5px;
    margin-right: 5px;

}

// 活动推荐标题
.action{
	background-color: transparent;
}
.text-xl{
	font-size: 52rpx;
	font-weight: 600;
	color: #ffffff; 
	font-family: 'Arial'; 
	font-style: normal; 
	background-color: transparent;
	// background-color: rgba(110,144,252);
}
// 轮播图样式
.uni-margin-wrap {
		width: 690rpx;
	}
.swiper {
		height: 400rpx;
	}
.swiper-item {
	display: block;
	height: 400rpx;
	line-height: 300rpx;
	text-align: center;
}
// 白色边框
.border-box {
  border: 2px solid #ffffff;
  border-radius: 10px;
  height: 80px;
}
.wallContent{
	margin-left: 48rpx;
}
.wallData{
	margin-top: 20rpx;
	margin-left: 50rpx;
}
.temp{
	border-radius: 10px;
	background-color: #ffffff;
	// background-image: url('../../static/graph.png');
	height: 120px;
	margin-right: 5px;
    margin-right: 5px;
	background-size: 300px 110px;
}
.background{
	background-image: url(http://scu5azomr.hn-bkt.clouddn.com/static/1.png);
    // background-size: 730rpx 350rpx;
    height: 350rpx;
    border-radius: 30rpx;
    margin-top: 20rpx;
    margin-left: 20rpx;
    margin-right: 20rpx;
    background-position: right;
    background-size: 122.666% 100%;
}
.margin-fixed{
	border-radius: 30rpx;
	margin-left: 20rpx;
	margin-right: 20rpx;
	margin-top:20rpx;
	// margin-bottom: 20rpx;
}
.dataWallBG{
	height: 400rpx;
	background-image: url('http://scu5azomr.hn-bkt.clouddn.com/static/bg_img/333.png');
	background-size: 100% 100%;
}
.roseBG{
	height: 400rpx;
	background-color: white;
}
.roseTitle{
	font-size: 35rpx;
}
.cuIcon-titles:before {
	content: "\e701";
	font-size: 37rpx;
}
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
  width: 100%;
  height: 80%;
}
// 数据墙数据部分的数字样式
.text-num{
	font-family: 'number';
	font-size: 80rpx;
	color: black;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}
.grid-item {
  padding: 20rpx;
  text-align: center;
}
.description {
	margin-top: -19rpx;
	font-size: 26rpx;
	color: floralwhite;
}
.black-font{
	color: black;
}

</style>