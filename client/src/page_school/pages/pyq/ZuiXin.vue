<!-- 高校朋友圈 -- 最新 -->
<template>
	<view class="parent-container">
	
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
				dyList:[

				],
				page: 0
			};
		},
		mounted() {
			uni.$off('pyqZunXin');
			uni.$on('pyqZunXin', function(data) {
				this.getMore()
        });
			const data = {
				page: 0
			}
			this.getHot(data)


		},
		methods:{
			getMore(){
				page ++;
				const data = {
					page: this.page,
				}
				this.getHot(data)
			},
			getHot(data){
				uni.request({
				url: this.$url.BASE_URL + '/4142061-0-default/schoolteam/pyq/latest',
				// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
				
				method: 'GET',
				data: data,
				success: res => {
					this.dyList = res.data.data.post_list;
					// this.acList[0].keywords = "服务,实践"
					// console.log(this.acList)
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
