<!-- 找活动的顶部导航栏 -->
<template>
	<view class="tabs">
		<view 
			class="uni-tab-item" 
			v-for="(tab,index) in tabBars"
			:key="tab.id"
		>
			<text 
				class="uni-tab-item-title"
				:class="{tabActive: tabIndex==tab.id}"
				@tap="tarTap(tab)"
			>
				{{tab.name}}
			</text>
		</view>
	</view>
</template>
 
<script>
	export default {
		name: "search-tabbar",
		props:{
			tabBars: Array,
			tabIndex: String
		},
		data(){
			return {
				
			}
		},
		methods:{
			tarTap(item){
				this.$emit("TarTap",item)
			}
		}
	}
</script>
 
<style>
	.tabs{
		display: flex;
		flex: 1;
		flex-direction: row;
		overflow-x: scroll;
		height: 100%;
	}
	.uni-tab-item{
		width: 100%;
		white-space: nowrap;
		line-height: 100rpx;
		height: 100rpx;
		border-bottom: 1px solid #eee;
		margin-bottom: -5px;
	}
	.uni-tab-item-title{
		color: #524f4f;
		font-weight: bold;
		font-size: 32rpx;
		width: 150rpx;
		display: inline-block;
		text-align: center;
	}
	.tabActive{
		color: red;
		/* font-size: 40rpx; */
		background-color: white;
	}
	.tabs {
  display: flex;
  justify-content: space-between;
}

.uni-tab-item {
  flex: 1;
  display: flex;
  justify-content: center;
}

</style>