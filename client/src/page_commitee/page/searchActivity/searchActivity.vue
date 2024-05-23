<!-- 团委 审核社区需求 全部/已审核/待审核 -->
<template>
<view>
	<!-- 搜索框和导航栏 -->
	<view class="top_fix">
		<!-- 搜索框 -->
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="searchContent" @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索活动"
					confirm-type="search">
			</view>
			<view class="action">
				<button @click="search" class="cu-btn bg-blue shadow-blur round">搜索</button>
			</view>
		</view>

		<!-- 横向滚动的导航栏 全部/已审核/未审核-->
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in list" :key="index" @tap="tabSelect" :data-id="index">
					{{item.name}}
				</view>
			</view>
		</scroll-view>

	</view>

	// 显示筛选的活动
	<view class="accontent">
      <All ref="allComponent" :is-search="isSearch" @update:is-search="handleIsSearchUpdate" v-if="TabCur === 0"></All>
      <Unreviewed v-if="TabCur === 1"></Unreviewed>
      <Reviewed v-if="TabCur === 2"></Reviewed>
    </view>

</view>

</template>

<script>
	import indexTabbar from '../../../components/top-tabbar/top-tabbar.vue';
	import All from './all.vue';
    import Unreviewed from './unreviewed.vue';
    import Reviewed from './reviewed.vue';

	export default {
		components:{
			
			indexTabbar,
			All,
			Unreviewed,
			Reviewed,
			// utabsswiper
		},
		data() {
			return {
				showContent: true,
				TabCur: 0,
				scrollLeft: 0,
				searchContent: '',
				community_id: '',

				// 全屏组件
				list: [{
					name: '全部'
				}, {
					name: '未审核'
				}, {
					name: '已审核'
				}],

				title: 'Hello',
				tabIndex: "All",
				tabBars:[
					{
						name: "全部",
						id: "All"
					},
					{
						name:"未审核",
						id:"Unreviewed"
					},
					{
						name: "已审核",
						id: "Reviewed"
					}
				],
				currentTabComponent: "All",
				// isSearch: false
			}
		},

		watch: {
			// 先设置为false再设置为true。触发组件的重新渲染，从而实现相应内容的更新和显示。
			TabCur() {
				this.showContent = false;
				this.$nextTick(() => {
					this.showContent = true;
				});
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
				// 当前被选中的id
				this.TabCur = e.currentTarget.dataset.id;
				console.log("Cur,", this.TabCur);
				if(this.TabCur == 0){
					// const allComponent = this.$refs.allComponent;
					// console.log(allComponent);
					// allComponent.updateIsSearch(false); // 推荐通过方法更新属性
					// console.log(allComponent.isSearch);
				}
				// 设置横向滚动容器的滚动位置
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
					url: this.$url.BASE_URL + '/school/queryActivity',
					// url: 'https://mock.apifox.coml/m1/schoolteam/getRecommend',
                	header:{
						Authorization:uni.getStorageSync("token")
					},	
					method: 'GET',
					data: {
						name: this.searchContent,
						// token: this.$userinfo.token
                	    // activity_status: this.index
						community_id: '0'
					},
					success: res => {
						//不用懒加载
						const all = this.$refs.allComponent;
						// all.updateIsSearch(true); 
						// 是搜索，取消自动调用“获取列表接口”
						// console.log("赋值前：");
						console.log("success设置前: all.isSearch="+all.isSearch);
						all.updateIsSearch(true); // 推荐通过方法更新属性
						console.log("success设置后: all.isSearch="+all.isSearch);

						all.acList = res.data.data;
						this.TabCur = 0 // 设置顶部为“全部”
						console.log("成功请求-模糊查询社区需求");
						console.log(all.acList);
						this.net_error = false;
					},
					fail: res => {
						this.net_error = true;
					},
					complete: () => {
					}
				})
			},
			handleIsSearchUpdate(updatedData) {
      			// 处理从子组件传递过来的数据
      			// console.log("从子组件传过来的数据"+updatedData);
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
	margin-top: 160rpx;	
}
</style>