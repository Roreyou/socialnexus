<!-- 高校 - 我的评价 -->
<template>
	<view>
		<index-tabbar :tabBars="tabBars" @TarTap="TarData" :tabIndex="tabIndex" ></index-tabbar>
		<view class="content">
			<commentcontent v-if="showContent" :list_type="currentTabComponent"></commentcontent>
		</view>
	</view>
</template>
 
<script>
	import indexTabbar from '../../../components/top-tabbar/top-tabbar.vue';
	import commentcontent from './commentcontent.vue';
	export default {
		components:{
			indexTabbar,
			commentcontent
		},
		data() {
			return {
				showContent:true,
				title: 'Hello',
				tabIndex: "0",
				tabBars:[
					{
						name: "已评价",
						id: "0"
					},
					{
						name:"未评价",
						id:"1"
					}
				],
				currentTabComponent: "0"
			}
		},

		watch: {
			currentTabComponent() {
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
			}
		}
	}
</script>
 
<style>
.content{
	margin-top: 25rpx;
}
</style>