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
        }
    },
    computed: {
			...mapState(['hasLogin', 'forcedLogin','user_id'])
		},
    mounted() {
		console.log("list:",this.searchlist)
		if(this.searchlist.length > 0){
			this.acList = this.searchlist;
			return;
		}
        uni.request({
				url: this.$url.BASE_URL + '/4142061-0-default/schoolteam/getmyactiv',
				// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
                header:{
					Authorization:uni.getStorageSync("token")
				},	
				method: 'GET',
				data: {
					team_id: this.user_id,
					// token: this.$userinfo.token
                    activity_status: this.index
				},
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
    },
    methods: {
        
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