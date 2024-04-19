<!-- 团委 审核社区需求 全部/已审核/待审核 -->
<template>

	<view class="content">
    <!-- 搜索框 -->
    <view class="search">
      <u-search  :clearabled="true" search-icon="search" placeholder="请输入关键字" v-model="searchValue" @search="search" @clear="clear" 
       height="96" border-color='#1A90FF' bg-color="FFFFFF">
    </u-search>
    </view>

    <view class="search-form round">
						<text class="cuIcon-search"></text>
						<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索活动"
							confirm-type="search"></input>
		</view>
		<view class="action">
						<button class="cu-btn bg-green shadow-blur round">搜索</button>
		</view>

    <index-tabbar class="index-tabbar" :tabBars="tabBars" @TarTap="TarData" :tabIndex="tabIndex" ></index-tabbar>

    <!-- 循环显示活动 -->
		<view class="cu-item" v-for="(item,index) in acList" :key="index">
			<view class="cu-card article" :class="isCard?'no-card':''">
					<view class="cu-item shadow">
						<view class="cu-bar bg-white">
							<view class="action">
								<text class="cuIcon-titles text-green"></text>
								<text class="text-xl text-bold">{{item.state}}</text>
							</view>
						</view>
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

		<view v-if="acList.length === 0" class="no-activities">
    		没有符合要求的活动
  		</view>
	</view>
</template>

<script lang="ts">
	export default {
		data() {
			return {
        searchValue:'',
        tabBars:[
					{
						name: "全部",
						id: "0"
					},
					{
						name:"待审核",
						id:"1"
					},
					{
						name: "已审核",
						id: "2"
					}
				],
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
    computed: {},
    watch: {},
		onLoad() {

		},
		methods: {
      // 点击搜索按钮
      search(){

      },
      // 点击清除按钮
      clear(){

      },
      cancel(){

      },
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
.search{
  background-color: white;
  font-size: 70px;
}
.input-style{
  font-size: 70px;
}
</style>