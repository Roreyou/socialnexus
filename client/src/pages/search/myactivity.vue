<!-- 高校 - 收到评价 -->
<template>
<view>
	<view>
		<index-tabbar :tabBars="tabBars" @TarTap="TarData" :tabIndex="tabIndex" ></index-tabbar>
	</view>
	<view>
		<QuanBu v-if="currentTabComponent === 'QuanBu'"></QuanBu>
		<KaiZhanZhong v-if="currentTabComponent === 'KaiZhanZhong'"></KaiZhanZhong>
		<YiJieShu v-if="currentTabComponent === 'YiJieShu'"></YiJieShu>
		<DaiKaiZhan v-if="currentTabComponent === 'DaiKaiZhan'"></DaiKaiZhan>
	</view>
</view>
</template>
 
<script>
	import indexTabbar from '../../components/top-tabbar/top-tabbar.vue';

	import QuanBu from './QuanBu.vue';
	import KaiZhanZhong from './KaiZhanZhong.vue';
	import YiJieShu from './YiJieShu.vue';
	import DaiKaiZhan from './DaiKaiZhan.vue';

	export default {
		components:{
			indexTabbar,
			QuanBu,
			DaiKaiZhan,
			KaiZhanZhong,
			YiJieShu
		},
		data() {
			return {
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
			}
		}
	}
</script>
 
<style>
</style>