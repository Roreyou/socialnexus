<!-- 高校 - 收到的评价 -->
<template>
	<view>
		<view class="content">
			<commentcontent v-if="showContent" :list_type="currentTabComponent"></commentcontent>
		</view>
	</view>
</template>
 
<script>
	import commentcontent from './becommentlist.vue';
	export default {
		components:{
			commentcontent
		},
		data() {
			return {
				showContent:true,
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
</style>