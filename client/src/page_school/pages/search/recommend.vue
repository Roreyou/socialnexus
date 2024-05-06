<!-- 高校活动推荐 -->
<template>
	<view class="content">
		<!-- 活动推荐列表 -->
        <actilist :acList="acList"></actilist>
	
	</view>
</template>

<script>
import actilist from '../../../components/acti-list/acti-list.vue';
	
export default {
	components: {
        actilist
    },
		data() {
			return {
				// title: '高校 -- 活动推荐'
				acList:[],
				page: 0,
				loadmore: true,
				net_error: false
			}
		},
		onLoad() {
			const data ={
				province: '1',
				page: this.page
			}
			this.getRecommend(data);
		},
		onReachBottom() {
			// uni.$emit('onReachBottom');
			if(this.loadmore){
				this.getmore()
			}else{
				//到底了
				this.$u.toast(`已经到底啦`);
			}
		},
		methods: {
			getmore(){
				this.page ++
				const data = {
					province: '1',
					page: this.page
				}
				this.getRecommend(data);
			},
			getRecommend(data){
				uni.request({
				url: this.$url.BASE_URL + '/4142061-3780993-default/schoolteam/getRecommend',
				method: 'GET',
				// data: {
				// 	province: '1',
				// },
				data: data,
				success: res => {
					// this.acList = res.data.data.acti_list;
					if(res.data.data.acti_list.length){
						this.acList = this.acList.concat(res.data.data.acti_list);
						// this.acList[0].keywords = "服务,实践"
						this.acList = [...this.acList, ...this.acList];
						// this.loadmore = false
					}else{  //空了
						this.loadmore = false 
					}

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
	}
</script>
<style lang="scss" scoped>

</style>