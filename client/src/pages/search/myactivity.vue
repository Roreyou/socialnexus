<!-- 高校 - 收到评价 -->
<template>
<view>
	<view class="top_fix">
		<!-- 第一个：搜索按钮在右边 -->
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索活动"
					confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round">搜索</button>
			</view>
		</view>
		<scroll-view scroll-x class="bg-white nav">
		<view class="flex text-center">
			<view class="cu-item flex-sub" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in list" :key="index" @tap="tabSelect" :data-id="index">
				{{item.name}}
			</view>
		</view>
	</scroll-view>
	</view>
	<view class="accontent">
		<QuanBu v-if="TabCur === 0"></QuanBu>
		<DaiKaiZhan v-if="TabCur === 1"></DaiKaiZhan>
		<KaiZhanZhong v-if="TabCur === 2"></KaiZhanZhong>
		<YiJieShu v-if="TabCur === 3"></YiJieShu>

	</view>
</view>

</template>
 
<script>
	import indexTabbar from '../../components/top-tabbar/top-tabbar.vue';

	import QuanBu from './QuanBu.vue';
	import KaiZhanZhong from './KaiZhanZhong.vue';
	import YiJieShu from './YiJieShu.vue';
	import DaiKaiZhan from './DaiKaiZhan.vue';

	// import utabsswiper from '../../uview-ui/components/u-tabs-swiper/u-tabs-swiper.vue';

	export default {
		components:{
			
			indexTabbar,
			QuanBu,
			DaiKaiZhan,
			KaiZhanZhong,
			YiJieShu,
			// utabsswiper
		},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,

				// 全屏组件
				list: [{
					name: '全部'
				}, {
					name: '待开展'
				}, {
					name: '开展中'
				}, {
					name: '已结束'
				}],

				title: 'Hello',
				tabIndex: "QuanBu",
				tabBars:[
					{
						name: "全部",
						id: "QuanBu"
					},
					{
						name:"待开展",
						id:"DaiKaiZhan"
					},
					{
						name: "开展中",
						id: "KaiZhanZhong"
					},
					{
						name: "已结束",
						id: "YiJieShu"
					}
				],
				currentTabComponent: "QuanBu"
			}
		},
		methods:{
			TarData(item){
				//设置id，来显示选中那个标签，显示下划线
				this.tabIndex = item.id;
				//显示标签对应的组件内容
				this.currentTabComponent = item.id
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
								// 切换组件时页面滚动到顶部
								wx.pageScrollTo({
  				  scrollTop: 0,
  				  duration: 0
  				});
			}
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
	margin-top: 85px;	
}
</style>