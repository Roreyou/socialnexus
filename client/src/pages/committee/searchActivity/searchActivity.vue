<!-- 团委 审核社区需求 全部/已审核/待审核 -->
<template>
<view>
	<!-- 搜索框和导航栏 -->
	<view class="top_fix">
		<!-- 搜索框 -->
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索活动"
					confirm-type="search">
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round">搜索</button>
			</view>
		</view>

		<!-- 横向滚动的导航栏 全部/已审核/待审核-->
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in list" :key="index" @tap="tabSelect" :data-id="index">
					{{item.name}}
				</view>
			</view>
		</scroll-view>

	</view>

	// 显示筛选的活动
	<view class="accontent">
      <All v-if="TabCur === 0"></All>
      <Unreviewed v-if="TabCur === 1"></Unreviewed>
      <Reviewed v-if="TabCur === 2"></Reviewed>
    </view>

</view>

</template>

<script>
	import indexTabbar from '../../../components/top-tabbar/top-tabbar.vue';
	import All from './all.vue';
    import Unreviewed from './unreviewed.vue';
    import Reviewed from './reviewed.vue';

	export default {
		components:{
			
			indexTabbar,
			All,
			Unreviewed,
			Reviewed,
			// utabsswiper
		},
		data() {
			return {
				showContent: true,
				TabCur: 0,
				scrollLeft: 0,

				// 全屏组件
				list: [{
					name: '全部'
				}, {
					name: '待审核'
				}, {
					name: '已审核'
				}],

				title: 'Hello',
				tabIndex: "All",
				tabBars:[
					{
						name: "全部",
						id: "All"
					},
					{
						name:"待审核",
						id:"Unreviewed"
					},
					{
						name: "已审核",
						id: "Reviewed"
					}
				],
				currentTabComponent: "All"
			}
		},

		watch: {
			// 先设置为false再设置为true。触发组件的重新渲染，从而实现相应内容的更新和显示。
			TabCur() {
				this.showContent = false;
				this.$nextTick(() => {
					this.showContent = true;
				});
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
				// 当前被选中的id
				this.TabCur = e.currentTarget.dataset.id;
				console.log("Cur,", this.TabCur);
				// 设置横向滚动容器的滚动位置
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				// 切换组件时页面滚动到顶部
				wx.pageScrollTo({
  				  scrollTop: 0,
  				  duration: 0
  				});
			},
			key() {
                return this.TabCur
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
	margin-top: 65px;	
}
</style>