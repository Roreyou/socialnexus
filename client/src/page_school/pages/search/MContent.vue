<!-- 高校 我的活动内容 -->
<template>
    <view>
        <actilist :acList="acList" :ismyac="true"></actilist>
    </view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
import actilist from '../../../components/acti-list/acti-list.vue';

export default {
    props: {
        // acList: Array,
        index: Number,  //用index来加载数据
		searchlist: {
			type: Array,
			default:[]
		}
    },
    components: {
        actilist
    },
    data() {
        return {
            acList: [],
			page: 0,
			loadmore: true
        }
    },
    computed: {
			...mapState(['hasLogin', 'forcedLogin','user_id'])
		},
    mounted() {
		console.log("list:",this.searchlist)
		if(this.searchlist.length > 0){
			this.acList = this.searchlist;
			this.loadmore = false; //搜索我的活动不准备设置懒加载，所以直接设为false拦截
			return;
		}
			
		const iniData = {
			team_id: this.user_id,
			// token: this.$userinfo.token
            activity_status: this.index,
			page: 0
		} 
		this.loadMyacti(iniData)
		//触底监听
        var that=this;
        uni.$on('myactivity--onReachBottom', function(data) {
			// console.log('收到__search--onReachBottom');
            if(!that.loadmore){
                uni.showToast({
                    title: '没有更多了',
                    icon: 'none',
                    duration: 2000
                })
                return
            }
            that.getmore();
        });
		},
    methods: {
        getmore(){
			++ this.page
			const data = {
				team_id: this.user_id,
				// token: this.$userinfo.token
                activity_status: this.index,
				page: this.page
			}
			this.loadMyacti(data)
		},
		loadMyacti(data){
			uni.request({
				url: this.$url.BASE_URL + '/4142061-0-default/schoolteam/getmyactiv',
				// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
                header:{
					Authorization:uni.getStorageSync("token")
				},	
				method: 'GET',
				data: data,
				success: res => {
					if(res.data.code == 200){
						this.acList = res.data.data.myactiv_list;
						this.acList[0].keywords = "服务,实践"
						// console.log(this.acList)
						this.net_error = false;
					}else if(res.data.code == 401){
										console.log("token过期");
										uni.showModal({
										title: '',
										content: '登录已过期。是否前去登录？',
										success: function(res) {
										if (res.confirm) {
											// 用户点击了确定
											uni.reLaunch({
												url: '../../../pages/login/login',
											})
										} else if (res.cancel) {
											uni.navigateBack()
											return;							
										}
										}
									});
									}

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
<style scoped>
/* 活动推荐列表 */
.cu-item .shadow{
margin: 0;
margin-top: 10rpx;
}

.cu-bar .action:first-child{
margin-left: 24rpx;
}

/* tag */
.wordcont{
margin-top: 10rpx;
}
.wordcont .ackeywords {
    display: inline-block;
margin-right: 10rpx; /* 可以调整标签之间的水平间距 */
}
</style>