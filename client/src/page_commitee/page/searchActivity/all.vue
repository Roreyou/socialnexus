<!-- 团委 全部社区需求 -->
<template>
	<view class="content">
		<!-- 循环显示卡片 -->
		<view class="cu-item" v-for="(item,index) in acList" :key="index">
			<view class="cu-card article" :class="isCard?'no-card':''">
					<view class="cu-item shadow">
						<view class="cu-bar bg-white">

							<!-- 卡片的最上面一行 -->
							<view class="action">
								<text class="cuIcon-titles text-green"></text>
								<text class="text-xl text-bold">{{item.veri_status}}</text>
							</view>
							<view class="action right-buttons" v-if="item.veri_status === '未审核'" >
									<button class="cu-btn bg-blue shadow-blur" @click="handlePass(item)">通过</button>
									<button class="cu-btn bg-grey shadow-blur" @click="handleReject(item)">驳回</button>
							</view>
							<view class="action right-buttons" v-if="item.veri_status === '已审核'" >
								<span class="status-label passed" v-if="item.veri_status === '通过'">已通过</span>
    							<span class="status-label rejected" v-if="item.veri_status === '驳回'">已驳回</span>
							</view>

						</view>
						<view class="title"><view class="text-cut">{{item.name}}</view></view>
						<view class="content">
							<view class="desc">
								<view class="text-content"> 发布日期: {{item.setup_date}}</view>
								<view class="text-content"> 所属社区: {{item.community_name}}</view>
								<view class="text-content"> {{item.province}} {{item.city}} {{item.address}}</view>
								<view class="wordcont">	
									<view class="ackeywords" v-for="(word,index) in item.keywords.split(',')" :key="index">
										<view class="cu-tag bg-red light sm round">{{word}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
			</view>
		</view>
		<!-- 循环显示卡片结束 -->

		<view v-if="acList.length === 0" class="no-activities">
    		没有符合要求的活动
  		</view>
	</view>
</template>

<script>
	export default {
		// props: ['search'],
		data() {
			return {
				acList:[

				],
				isSearch: false
			}
		},
		onLoad() {

		},
		mounted() {
			console.log("this.isSearch"+this.isSearch)
			// 组件被挂载后发起请求
			if(!this.isSearch) //搜索的话不调用这个接口
				this.getAll();
		},
		methods: {
			// 审核通过
			handlePass(item){
				console.log("点击通过");
			},
			// 驳回
			handleReject(item){
				console.log("点击驳回");
			},
			// 获取全部活动
			getAll(){
				console.log("获取全部this.isSearch="+this.isSearch);
				uni.request({
					url: this.$url.BASE_URL + '/4142061-0-default/school/activities',
					// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
                	header:{
						Authorization:uni.getStorageSync("token")
					},	
					method: 'GET',
					data: {
						community_id: '0',
						// token: this.$userinfo.token
                	    // activity_status: this.index
						status: '全部'
					},
					success: res => {						
						this.acList = res.data.data;
						console.log("成功请求-查询社区需求列表-全部");
						console.log(this.acList);
						this.net_error = false;
					},
					fail: res => {
						this.net_error = true;
					},
					complete: () => {
					}
				})
			},
			updateIsSearch(newVal){
				this.isSearch = newVal;
				// 触发事件通知父组件更新数据
				this.$emit('update:is-search', this.isSearch);
			}
		}
	}
</script>

<style scoped>
.no-activitis{
	text-align: center;
    line-height: 100rpx;
}

.text-cut{
	margin-top: -15rpx;
	line-height: 60rpx;
}
.cu-bar .action:first-child{
	margin-left: 24rpx;
}

.cu-item .shadow{
	margin: 0;
	margin-top: 10rpx;
}
.text-content{
	height: auto;
}
.wordcont{
	margin-top: 10rpx;
}
.wordcont .ackeywords {
	display: inline-block;
  margin-right: 10rpx; /* 可以调整标签之间的水平间距 */
}
.right-buttons {
  /* margin-left: auto; */
  margin-right: 0;
}
.status-label {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  margin-right: 8px;
}

.passed {
  background-color: green;
}

.rejected {
  background-color: red;
}
</style>