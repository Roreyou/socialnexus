<!-- 高校 - 找活动 -->
<template>
	<view>
		<view class="top_fix">
		<!-- 标题栏和搜索框 -->
		<view>
			<view class="title">
				活动广场
			</view>
			<view class="cu-bar search bg-white search">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input v-model="searchcontent" :adjust-position="false" type="text"placeholder="搜索活动"
						confirm-type="search"></input>
				</view>
				<view class="action">
					<button @click="search" class="cu-btn bg-green shadow-blur round">搜索</button>
				</view>
			</view>
		</view>
		<!-- <index-tabbar class="index-tabbar" :tabBars="tabBars" @TarTap="TarData" :tabIndex="tabIndex" ><index-tabbar> -->
		<view>
			<actipickers></actipickers>
		</view>		
		</view>
		<view class="accontent">
			<!-- id="currentTabComponent"表示是那三种筛选类型中的哪一种 -->
			<scontent :acList="acList" :searchlist="searchlist"></scontent>
		</view>
	</view>
</template>
	 
<script>
// import indexTabbar from '../../../components/search-tabbar/search-tabbar.vue';
import scontent from '../../../page_school/pages/search/searchcontent.vue'
import actipickers from '../../../components/acti-pickers/acti-pickers.vue'
	
		// import utabsswiper from '../../uview-ui/components/u-tabs-swiper/u-tabs-swiper.vue';
	
		export default {
			components:{
				// indexTabbar,
				scontent,
				actipickers
				// utabsswiper
			},
			data() {
				return {
					tabIndex: "0",
					currentTabComponent : "0",
					// 全屏组件
					tabBars:[
					{
						name: "地区",
						id: "0"
					},
					{
						name:"类型",
						id:"1"
					},
					{
						name: "时段",
						id: "2"
					}
				],
				acList:[
					{	
						state: "已结束",
						title: "这是搜索的实践活动",
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
				],
				searchcontent: '',//搜索内容
				searchlist: [],
				}
			},
			mounted(){
				//刚打开时出现的是推荐的活动
				uni.request({
				url: this.$url.BASE_URL + '/4142061-3780993-default/schoolteam/getRecommend',
				// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
				method: 'GET',
				data: {
					province: '1',
					// token: this.$userinfo.token
				},
				success: res => {
					this.searchlist = res.data.data.acti_list;
					this.net_error = false;
				},
				fail: res => {
					this.net_error = true;
				},
				complete: () => {
				}
			})
			},
			methods:{
				TarData(item){
					//设置id，来显示选中那个标签，显示下划线
					this.tabIndex = item.id;
					//显示标签对应的组件内容
					this.currentTabComponent = item.id;
				
					// 切换组件时页面滚动到顶部
					wx.pageScrollTo({
					scrollTop: 0,
					duration: 0
					});
				},
				search(){
					uni.request({
					url: this.$url.BASE_URL + '/4142061-0-default/schoolteam/activsquare/search',
					// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
					header:{
						Authorization:uni.getStorageSync("token")
					},	
					method: 'GET',
					data: {
						// team_id: this.user_id,
						// token: this.$userinfo.token
						// activity_status: this.index
						text: this.searchcontent
					},
					success: res => {
						this.searchlist = res.data.data.activ_list;
						// console.log("searchlist:",this.searchlist)
						this.TabCur = 0
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
		}
	</script>
	 
	<style>
	.top_fix{
	  background-color: white;
	  position: fixed;
	  top: 0; /* 或者设置为底部时使用 bottom: 0; */
	  left: 0;
	  width: 100%;
	  z-index: 999; /* 可选：如果需要在其他元素之上显示导航栏，可以设置一个较高的 z-index 值 */
	}
	.accontent{
		margin-top: 90px;	
	}

	.title{
		font-size: 40rpx;
		padding: 30rpx;
	}
	</style>