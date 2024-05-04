<!-- 高校 - 我的活动 -->
<template>
<view>
	<view class="top_fix">
		<!-- 第一个：搜索按钮在右边 -->
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="searchcontent" :adjust-position="false" type="text" placeholder="搜索活动"
					confirm-type="search">
			</view>
			<view class="action">
				<button @click="search" class="cu-btn bg-green shadow-blur round">搜索</button>
			</view>
		</view>
		<scroll-view scroll-x class="bg-white nav">
		<view class="flex text-center">
			<view class="cu-item flex-sub" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in list" :key="index" @tap="tabSelect" :data-id="index">
				{{item.name}}
			</view>
		</view>
	</scroll-view>
	</view>
	<view class="accontent">
		<MyContent v-if="showContent" :index="TabCur" :searchlist="searchlist"></MyContent> 
	</view>
</view>

</template>
 
<script>
	import {
		mapState,
	} from 'vuex'

	import indexTabbar from '../../../components/top-tabbar/top-tabbar.vue';
	import MyContent from './MContent.vue';

	// import utabsswiper from '../../uview-ui/components/u-tabs-swiper/u-tabs-swiper.vue';

	export default {
		components:{
			
			indexTabbar,
			MyContent,
			// utabsswiper
		},
		data() {
			return {
				showContent: true,
				TabCur: 0,
				scrollLeft: 0,

				// 全屏组件
				list: [{
					name: '全部'
				}, {
					name: '待开展'
				}, {
					name: '开展中'
				}, {
					name: '已结束'
				}],

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
				currentTabComponent: "QuanBu",
				searchcontent: '',//搜索内容
				searchlist: [],
			}
		},
		computed: {
			...mapState(['user_id'])
		},
		watch: {
			TabCur(newval, oldval) {
				// this.showContent = false;
				// this.$nextTick(() => {
				// 	if(newval == 0 && this.searchlist.length>0){
				// 		this.showContent = true;
				// 		return;
				// 	}//按下搜索按钮的情况
				// 	this.searchcontent = ''
				// 	this.searchlist = []
				// 	this.showContent = true;					
				// });
				
				if(newval == 0 && this.searchlist.length>0){
					this.showContent = false;
					this.$nextTick(() => {
						this.showContent = true;					
					});
					return;
				}
				this.searchcontent = ''
				this.searchlist = []
			},
			searchlist() {
				this.showContent = false;
				this.$nextTick(() => {
					this.showContent = true;
				});
			},
    	},
		onReachBottom() {
			if(this.TabCur == 0){
				setTimeout(() => {
					uni.$emit('myactivity0');

					// 在这里添加你想要延时执行的代码
				}, 2000);
				console.log('myactivity0');

			}else if(this.TabCur == 1){
				setTimeout(() => {
					uni.$emit('myactivity1');

					// 在这里添加你想要延时执行的代码
				}, 2000);
				console.log('myactivity1');

			}else if(this.TabCur == 2){
				setTimeout(() => {
					uni.$emit('myactivity2');

					// 在这里添加你想要延时执行的代码
				}, 2000);
				console.log('myactivity2');

			}else{
				setTimeout(() => {
					uni.$emit('myactivity3');					
					// 在这里添加你想要延时执行的代码
				}, 2000);
				console.log('myactivity3');

			}

		},
		methods:{
			TarData(item){
				//设置id，来显示选中那个标签，显示下划线
				this.tabIndex = item.id;
				//显示标签对应的组件内容
				this.currentTabComponent = item.id
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				// 切换组件时页面滚动到顶部
				wx.pageScrollTo({
  				  scrollTop: 0,
  				  duration: 0
  				});
			},
			key() {
                return this.TabCur
            },
			search(){
				uni.request({
				url: this.$url.BASE_URL + '/4142061-0-default/schoolteam/searchmyactiv',
				// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
                header:{
					Authorization:uni.getStorageSync("token")
				},	
				method: 'GET',
				data: {
					team_id: this.user_id,
					// token: this.$userinfo.token
                    // activity_status: this.index
					activity_name: this.searchcontent
				},
				success: res => {
					this.searchlist = res.data.data.activ_list;
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
	margin-top: 85px;	
}
</style>