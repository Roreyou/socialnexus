<!-- 朋友圈页面 -- 顶部导航栏 -->

<template>
	<view>
		<index-tabbar class="index-tabbar" :tabBars="tabBars" @TarTap="TarData" :tabIndex="tabIndex" ></index-tabbar>
	<view class="content">
      <ZuiXin v-if="currentTabComponent === 'ZuiXin'"></ZuiXin>

      <ReMen v-if="currentTabComponent === 'ReMen'"></ReMen>

      <TongQvYv v-if="currentTabComponent === 'TongQvYv'"></TongQvYv>
	</view>	
	</view>
</template>
 
<script>
	import indexTabbar from '../../../components/top-tabbar/top-tabbar.vue';

	import ZuiXin from './ZuiXin.vue';
  import ReMen from './ReMen.vue';
  import TongQvYv from './TongQvYv.vue';

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
				this.currentTabComponent = item.id;
				
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.index-tabbar {
  background-color: white;
  position: fixed;
  top: 0; /* 或者设置为底部时使用 bottom: 0; */
  left: 0;
  width: 100%;
  z-index: 999; /* 可选：如果需要在其他元素之上显示导航栏，可以设置一个较高的 z-index 值 */

}

.content{
	margin-top: 37px;
}
</style>