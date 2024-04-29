<!-- 高校->活动 评价列表 -->
<template>
    <view>
        <commentlist :list="com_list" :list_type="list_type"></commentlist>
    </view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
import commentlist from '../../../components/comment-list/comment-list.vue';
export default {
    components: {
        commentlist
    },
    props: {
        // acList: Array,
        list_type: {
            type:String,
            default:'0'
        },  //0是未评价
      },
    data() {
        return {
            com_list: []
        }
    },
    computed: {
			...mapState(['hasLogin', 'forcedLogin','user_id'])
		},
    mounted() {
        // console.log("list_type",this.list_type)
        let com_url = this.$url.BASE_URL + '/4142061-0-default/schoolteam/team2activ_finished'
        if(this.list_type == '1'){
            com_url = this.$url.BASE_URL + '/4142061-0-default/schoolteam/team2activ_unfinished'
        }
        uni.request({
				url: com_url,
				// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
				
				method: 'GET',
				data: {
					team_id: this.user_id,
					// token: this.$userinfo.token
                    // activity_status: this.index
				},
				success: res => {
					this.com_list = res.data.data.com_list;
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
        //前往详情页
        todetail(id){
            // uni.navigateTo({
            //     //注意用这个的话page前面有一个斜杠，不然会说找不到这个组件
            //     url: '/pages/school/details/details?acti_id=' + id
            // })
            // this.$u.route({
            // 	url: 'pages/school/details/details?acti_id=' + id
            // })
        },
    }
}
</script>
<style scoped>
/* 活动推荐列表 */
.cu-item .shadow{
/* margin: 0; */
margin-top: 10rpx;
margin-bottom: 15rpx;
}

.cu-bar .action:first-child{
margin-left: 24rpx;
}

.text-cut{
margin-top: -15rpx;
line-height: 60rpx;
}

.text-content{
height: auto;
}

/* tag */
.wordcont{
margin-top: 10rpx;
}
.wordcont .ackeywords {
    display: inline-block;
margin-right: 10rpx; /* 可以调整标签之间的水平间距 */
}



/* 首页推荐列表样式 */
.indexstyle{
margin: 0 20rpx;
/* border-radius: 10px; */
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

</style>