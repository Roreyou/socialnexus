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
        index: Number  //用index来加载数据
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
        uni.request({
				url: this.$url.BASE_URL + '/4142061-0-default/schoolteam/getmyactiv',
				// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
				
				method: 'GET',
				data: {
					team_id: this.user_id,
					// token: this.$userinfo.token
                    activity_status: this.index
				},
				success: res => {
					this.acList = res.data.data.myactiv_list;
					this.acList[0].keywords = "服务,实践"
					// console.log(this.acList)
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