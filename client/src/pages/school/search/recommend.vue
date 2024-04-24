<!-- 高校活动推荐 -->
<template>
	<view class="content">
		<!-- 活动推荐列表 -->
		<!-- <view>
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>
					<text class="text-xl text-bold">活动推荐</text>
				</view>
			</view>
			<view>
				<view class="cu-item" v-for="(item,index) in acList" :key="index">
					<view class="cu-card article" :class="isCard?'no-card':''">
							<view class="cu-item shadow">
								<view class="title"><view class="text-cut">{{item.title}}</view></view>
								<view class="content">
									<view class="desc">
										<view class="text-content"> 日期: {{item.time}}</view>
										<view class="text-content"> 地点: {{item.place}}</view>
										<view class="text-content"> 岗位: {{item.job}}</view>
										
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
			</view>
		</view> -->
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
				acList:[
					{	
						state: "已结束",
						title: "5月15日实践活动",
						time: "2020-05-15",
						place: "北京",
						job: "志愿者",
						keywords: "服务,实践"
					},
					{
						state: "开展中",
						title: "5月5日实践活动",
						time: "2020-05-5",
						place: "深圳",
						job: "志愿者",
						keywords: "支教,教育"
					},
					{
						state: "开展中",
						title: "5月5日实践活动",
						time: "2020-05-5",
						place: "深圳",
						job: "志愿者",
						keywords: "支教,教育"
					},
					{
						state: "开展中",
						title: "5月5日实践活动",
						time: "2020-05-5",
						place: "深圳",
						job: "志愿者",
						keywords: "支教,教育"
					}
				]
			}
		},
		onLoad() {
			uni.request({
				url: this.$url.BASE_URL + '/4142061-3780993-default/schoolteam/getRecommend',
				// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
				
				method: 'GET',
				data: {
					province: '1',
					// token: this.$userinfo.token
				},
				success: res => {
					console.log(res)
					this.acList = res.data.data.acti_list;
					this.acList[0].keywords = "服务,实践"
					console.log(this.acList)
					const List = this.acList
					this.acList = [...List, ...List];
					this.net_error = false;
				},
				fail: res => {
					this.net_error = true;
				},
				complete: () => {
				}
			})
		},
		methods: {

		}
	}
</script>
<style lang="scss" scoped>

</style>