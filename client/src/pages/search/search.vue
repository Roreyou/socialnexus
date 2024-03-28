<!-- 高校 - 找活动 -->
<template>
	<view>
		<view class="top_fix">
			<!-- 标题栏和搜索框 -->
			<view>
				<view class="title">
					活动广场
				</view>
				<view class="cu-bar search bg-white search">
					<view class="search-form round">
						<text class="cuIcon-search"></text>
						<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索活动"
							confirm-type="search"></input>
					</view>
					<view class="action">
						<button class="cu-btn bg-green shadow-blur round">搜索</button>
					</view>
				</view>
			</view>
			<index-tabbar class="index-tabbar" :tabBars="tabBars" @TarTap="TarData" :tabIndex="tabIndex" ></index-tabbar>
		
		</view>
		<view class="accontent">
			<!-- id="currentTabComponent"表示是那三种筛选类型中的哪一种 -->
			<scontent :acList="acList" :id="currentTabComponent"></scontent>
		</view>
	</view>
	
	</template>
	 
	<script>
		import indexTabbar from '../../components/search-tabbar/search-tabbar.vue';
		import scontent from './searchcontent.vue'
	
		import QuanBu from './QuanBu.vue';
		import KaiZhanZhong from './KaiZhanZhong.vue';
		import YiJieShu from './YiJieShu.vue';
		import DaiKaiZhan from './DaiKaiZhan.vue';
	
		// import utabsswiper from '../../uview-ui/components/u-tabs-swiper/u-tabs-swiper.vue';
	
		export default {
			components:{
				
				indexTabbar,
				scontent,
				QuanBu,
				DaiKaiZhan,
				KaiZhanZhong,
				YiJieShu,
				// utabsswiper
			},
			data() {
				return {
					tabIndex: "0",
					currentTabComponent : "0",
					// 全屏组件
					tabBars:[
					{
						name: "地区",
						id: "0"
					},
					{
						name:"类型",
						id:"1"
					},
					{
						name: "时段",
						id: "2"
					}
				],
				acList:[
					{	
						state: "已结束",
						title: "这是搜索的实践活动",
						time: "2020-05-15",
						place: "北京",
						job: "志愿者",
						keywords: "服务,实践"
					},
					{
						state: "开展中",
						title: "5月5日实践活动",
						time: "2020-05-5",
						place: "深圳",
						job: "志愿者",
						keywords: "支教,教育"
					},
					{
						state: "开展中",
						title: "5月5日实践活动",
						time: "2020-05-5",
						place: "深圳",
						job: "志愿者",
						keywords: "支教,教育"
					},
					{
						state: "开展中",
						title: "5月5日实践活动",
						time: "2020-05-5",
						place: "深圳",
						job: "志愿者",
						keywords: "支教,教育"
					}
				]
				}
			},
			methods:{
				TarData(item){
						//设置id，来显示选中那个标签，显示下划线
						this.tabIndex = item.id;
						//显示标签对应的组件内容
						this.currentTabComponent = item.id;
						
						// 切换组件时页面滚动到顶部
						wx.pageScrollTo({
						scrollTop: 0,
						duration: 0
						});
				},
			}
		}
	</script>
	 
	<style>
	.top_fix{
	  background-color: white;
	  position: fixed;
	  top: 0; /* 或者设置为底部时使用 bottom: 0; */
	  left: 0;
	  width: 100%;
	  z-index: 999; /* 可选：如果需要在其他元素之上显示导航栏，可以设置一个较高的 z-index 值 */
	}
	.accontent{
		margin-top: 77px;	
	}

	.title{
		font-size: 40rpx;
		padding: 30rpx;
	}
	</style>