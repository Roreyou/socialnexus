<!-- 朋友圈页面 -- 顶部导航栏 -->

<template>
	<view>
		<index-tabbar :tabBars="tabBars" @TarTap="TarData" :tabIndex="tabIndex" ></index-tabbar>
		<!-- 每个tab标题对应的具体组件内容 -->
		<!-- <component v-bind:is="currentTabComponent"></component> -->
    <!-- <ZuiXin></ZuiXin> -->
    <!-- <ReMen></ReMen> -->
    <!-- <TongQvYv></TongQvYv> -->
        <!-- 每个tab标题对应的具体组件内容 -->
    <ZuiXin v-if="currentTabComponent === 'ZuiXin'"></ZuiXin>
    <ReMen v-if="currentTabComponent === 'ReMen'"></ReMen>
    <TongQvYv v-if="currentTabComponent === 'TongQvYv'"></TongQvYv>    <!-- 每个tab标题对应的具体组件内容 -->
	</view>
</template>
 
<script>
	import indexTabbar from '../../components/top-tabbar/top-tabbar.vue';
    //推荐选项卡  具体内容
	import ZuiXin from './ZuiXin.vue';
  import ReMen from './ReMen.vue';
  import TongQvYv from './TongQvYv.vue';
    // 关注选项卡  具体内容
	// import GuanZhu from './topBarComponent/guanzhu.vue';
	export default {
		components:{
			indexTabbar,
			ZuiXin,
			// GuanZhu
      ReMen,
      TongQvYv
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
					// {
					// 	name: "体育",
					// 	id: 'tiyu'
					// },
					// {
					// 	name: "娱乐",
					// 	id: "yule"
					// }
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