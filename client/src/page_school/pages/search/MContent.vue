<!-- 高校 我的活动内容 -->
<template>
    <view>
        <actilist :acList="acList" :ismyac="true"></actilist>
		<u-empty v-if="acList.length == 0" text="暂无符合条件的活动" mode="search" margin-top="390" font-size="35"></u-empty>
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
			loadmore: true,
			ind: 0
        }
    },
    computed: {
			...mapState(['hasLogin', 'forcedLogin','user_id'])
		},
    mounted() {
		console.log("list:",this.searchlist)

		if(this.searchlist.length > 0){
			console.log("searchlist.length > 0")
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
        let that=this;
		let throttleTimer = null;

		uni.$off('myactivity0');
        uni.$on('myactivity0', function(data) {
			if(that.index != 0){
				return;
			}
			console.log('收到myactivity0');
            if(!that.loadmore){
                uni.showToast({
                    title: '没有更多了',
                    icon: 'none',
                    duration: 2000
                })
                return
            }
            if(that.index == 0){that.getmore();}
        });

		uni.$off('myactivity1');
		uni.$on('myactivity1', function(data) {
			if(that.index != 1){
				return;
			}
			console.log('收到myactivity1');
            if(!that.loadmore){
                uni.showToast({
                    title: '没有更多了',
                    icon: 'none',
                    duration: 2000
                })
                return
            }
            if(that.index == 1){that.getmore();}
        });
		
		uni.$off('myactivity2');
		uni.$on('myactivity2', this.handleMyactivity2);
		uni.$off('myactivity3');
		uni.$on('myactivity3', function(data) {
			if(that.index != 3){
				return;
			}
			console.log('收到myactivity3');
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
		handleMyactivity2(){
			let that = this;
			that.ind ++
			console.log("that.ind:", that.ind)
			if(that.index != 2){
				return;
			}
			console.log('收到myactivity2');
            if(!that.loadmore){
                uni.showToast({
                    title: '没有更多了',
                    icon: 'none',
                    duration: 2000
                })
                return
            }
            // if(that.index == 2){that.getmore();}
			if (that.index == 2) {
				that.getmore();	
			}
        },
        getmore(){
			console.log("getmor--activity_status:",this.index)
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
			console.log("searchlist:", this.searchlist)
			uni.request({
				url: this.$url.BASE_URL + '/schoolteam/getmyactiv',
				
                header:{
					Authorization:uni.getStorageSync("token")
				},	
				method: 'GET',
				data: data,
				success: res => {
					if(res.data.code == 200){
						// this.acList = res.data.data.myactiv_list;
						if(!res.data.data.myactiv_list.length){
							this.loadmore = false;
							return
						}
						this.acList = this.acList.concat(res.data.data.myactiv_list)
						// this.acList[0].keywords = "服务,实践"
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