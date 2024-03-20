<!-- 高校 - 活动收藏 -->
<!-- 高校 - 收到评价 -->

<!-- 朋友圈页面 -- 顶部导航栏 -->

<template>
	<view>
		<index-tabbar :tabBars="tabBars" @TarTap="TarData" :tabIndex="tabIndex" ></index-tabbar>
	</view>
</template>
 
<script>
	import indexTabbar from '../../components/top-tabbar/top-tabbar.vue';
	export default {
		components:{
			indexTabbar,
		},
		data() {
			return {
				title: 'Hello',
				tabIndex: "ZuiXin",
				tabBars:[
					{
						name: "最新",
						id: "ZuiXin"
					},
					{
						name:"热门",
						id:"ReMen"
					},
					{
						name: "同区域",
						id: "TongQvYv"
					}
				],
				currentTabComponent: "ZuiXin"
			}
		},
		methods:{
			TarData(item){
				//设置id，来显示选中那个标签，显示下划线
				this.tabIndex = item.id;
				//显示标签对应的组件内容
				this.currentTabComponent = item.id
			}
		}
	}
</script>
 
<style>
</style>