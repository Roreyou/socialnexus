<!-- 活动->高校 评价列表 -->
<template>
    <view>
        <commentlist :list="com_list"></commentlist>
        <u-empty v-if="com_list.length == 0" text="暂无评价" mode="history" margin-top="30rpx" font-size="35"></u-empty>
    </view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
import commentlist from '../../../page_school/components/comment-list/becomment-list.vue';
export default {
    components: {
        commentlist
    },
    props: {
        // acList: Array,
        // list_type: {
        //     type:String,
        //     default:'0'
        // },
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
        let com_url = this.$url.BASE_URL + '/schoolteam/commu2team'
        uni.request({
				url: com_url,
				
                header:{
					Authorization:uni.getStorageSync("token")
				},	
				method: 'GET',
				data: {
					team_id: this.user_id,
					// token: this.$userinfo.token
                    // activity_status: this.index
				},
				success: res => {
                    if(res.data.code == 200){
                        this.com_list = res.data.data.com_list;
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
											// uni.navigateBack()
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