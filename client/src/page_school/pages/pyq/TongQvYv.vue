<!-- 高校朋友圈 -- 同区域 -->
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
	import kgDynamics from "../../../page_school/components/kg-dy/kg-dynamic.vue"
	
	export default {
		components: {
			kgDynamics,
		},
		data() {
			return {			
				dyList: [],
				page: 0,
				loadmore: true,
			};
		},

		mounted() {
			uni.$off('pyqTongQvYv');
			let that = this;
			uni.$on('pyqTongQvYv', function(data) {
				console.log('收到TongQvYv');
				if(!that.loadmore){
					uni.showToast({
						title: '没有更多了',
						icon: 'none',
						duration: 2000
					})
					return
            	}
				that.getMore()
        	});
			// uni.$off('pyqReMen');
			const data = {
				page: 0
			}
			this.getHot(data)
		},

		// mounted() {
		// 	uni.request({
		// 		url: this.$url.BASE_URL + '/schoolteam/pyq/samearea',
		// 		method: 'GET',
		// 		data: {
		// 		},
		// 		success: res => {
		// 			this.dyList = res.data.data.location_post_list;
		// 			// this.acList[0].keywords = "服务,实践"
		// 			// console.log(this.acList)
		// 			this.net_error = false;
		// 		},
		// 		fail: res => {
		// 			this.net_error = true;
		// 		},
		// 		complete: () => {
		// 		}
		// 	})
		// },

		methods:{
			getMore(){
				this.page ++;
				const data = {
					page: this.page,
				}
				this.getHot(data)
			},
			getHot(data){
				uni.request({
				url: this.$url.BASE_URL + '/schoolteam/pyq/samearea',
				// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
				method: 'GET',
				data: data,
				success: res => {
					// this.dyList = res.data.data.post_list;
					if(!res.data.data.location_post_list){
						this.loadmore = false;
						return
					}
					this.dyList = this.dyList.concat(res.data.data.location_post_list)
					this.net_error = false;
				},
				fail: res => {
					this.net_error = true;
				},
				complete: () => {
				}
			})
			}
		}
	};
</script>


<style lang="scss">
</style>
