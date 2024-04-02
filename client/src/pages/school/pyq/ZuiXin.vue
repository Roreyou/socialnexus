<!-- 高校朋友圈 -- 最新 -->
<template>
	<view class="parent-container">
		<!-- <u-navbar :is-back="true" title="动态列表"></u-navbar> -->
	
		<!-- 顶部导航栏 -->
		<!-- <view>
			<index-tabbar :tabBars="tabBars" @TarTap="TarData" :tabIndex="tabIndex" ></index-tabbar>
		</view> -->

		<view class="content">
			<block v-for="(item,index) in dyList" :key="item.id">
				<kgDynamics :dyInfo="item" :key="index"></kgDynamics>
				<view class="line">
					<u-line color="#f3e5e0" margin="5px 0px;" class="deviation"></u-line>
				</view>

			</block>
		</view>
	</view>

</template>
<script>
	import kgDynamics from "../../../components/kg-dy/kg-dynamic.vue"
	
	export default {
		components: {
			kgDynamics,
		},
		data() {
			return {			
				dyList: [{
					id:1,
					type: 1,
					dyLike: 10,
					avatarUrl: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.g9UbVfyVZX-SfD09JcYr5QHaEK?w=246&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
					userName: '用户名',
					pushTime: '2021-12-17 12:51:55',
					content: '我是最新',
					dyImgs: [
						'https://tse3-mm.cn.bing.net/th/id/OIP-C.g9UbVfyVZX-SfD09JcYr5QHaEK?w=246&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
					],
					tags: [{
							name: '111',
							type: 'success'
						},
						{
							name: '222',
							type: 'info'
						}, {
							name: '3',
							type: 'info'
						}, {
							name: '4',
							type: 'info'
						},

					]
				}, {
					id:2,
					type: 1,
					avatarUrl: 'https://img0.baidu.com/it/u=1801510667,176844939&fm=26&fmt=auto',
					userName: '123',
					pushTime: '2021-12-01 12:51:55',
					content: '山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？',
					dyImgs: [
						'https://tse3-mm.cn.bing.net/th/id/OIP-C.g9UbVfyVZX-SfD09JcYr5QHaEK?w=246&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
						'https://tse3-mm.cn.bing.net/th/id/OIP-C.g9UbVfyVZX-SfD09JcYr5QHaEK?w=246&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
					],
					tags: [{
							name: '12',
							type: 'success'
						},
						{
							name: '123',
							type: 'info'
						},

					]
				}, {
					id:3,
					type: 1,
					avatarUrl: 'https://img0.baidu.com/it/u=1801510667,176844939&fm=26&fmt=auto',
					userName: '25555',
					pushTime: '2021-11-17 12:51:55',
					content: '山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？',
					dyImgs: [
						'https://tse3-mm.cn.bing.net/th/id/OIP-C.g9UbVfyVZX-SfD09JcYr5QHaEK?w=246&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
						'https://tse3-mm.cn.bing.net/th/id/OIP-C.g9UbVfyVZX-SfD09JcYr5QHaEK?w=246&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
						'https://tse3-mm.cn.bing.net/th/id/OIP-C.g9UbVfyVZX-SfD09JcYr5QHaEK?w=246&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
					],
					tags: [{
							name: 'kkkk',
							type: 'success'
						},
						{
							name: '25555',
							type: 'info'
						},

					]
				}, {
					id:4,
					type: 1,
					avatarUrl: 'https://img0.baidu.com/it/u=1801510667,176844939&fm=26&fmt=auto',
					userName: '25555',
					pushTime: '2021-10-27 12:51:55',
					content: '山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？',
					dyImgs: [
						'https://tse3-mm.cn.bing.net/th/id/OIP-C.g9UbVfyVZX-SfD09JcYr5QHaEK?w=246&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
						'https://tse3-mm.cn.bing.net/th/id/OIP-C.g9UbVfyVZX-SfD09JcYr5QHaEK?w=246&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
						'https://tse3-mm.cn.bing.net/th/id/OIP-C.g9UbVfyVZX-SfD09JcYr5QHaEK?w=246&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
						'https://tse3-mm.cn.bing.net/th/id/OIP-C.g9UbVfyVZX-SfD09JcYr5QHaEK?w=246&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
						'https://tse3-mm.cn.bing.net/th/id/OIP-C.g9UbVfyVZX-SfD09JcYr5QHaEK?w=246&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
					],
					tags: [{
							name: 'kkkk',
							type: 'success'
						},
						{
							name: '25555',
							type: 'info'
						},

					]
				}],
			};
		},
		methods:{
		}
	};
</script>


<style lang="scss">

</style>
