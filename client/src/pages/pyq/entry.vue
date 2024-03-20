<!-- 高校 朋友圈 -->
<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view> -->
		<home v-if="currentTabComponent === 'home'"></home>
		<fabu v-if="currentTabComponent === 'fabu'"></fabu>
		<tongzhi v-if="currentTabComponent === 'tongzhi'"></tongzhi>

		<!-- 底部导航栏 -->
		<view class="uni-padding-wrap uni-common-mt">
			<bttab :tabBars="tabBars" @TarTap="TarData" :tabIndex="tabIndex"></bttab>
		</view>
	</view>
</template>

<script>
	import bttab from '../../components/pyq-home/bt-tab.vue';
	import home from './home.vue';
	import fabu from './fabu.vue';
	import tongzhi from './tongzhi.vue';

	export default {
		components: {
			bttab,
			home,
			fabu,
			tongzhi
		},
		
		data() {
			return {
				tabIndex: "home",
				tabBars:[
					{
						name: "首页",
						id: "home"
					},
					{
						name:"发布",
						id:"fabu"
					},
					{
						name: "通知",
						id: "tongzhi"
					}
				],
				currentTabComponent: "home"
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