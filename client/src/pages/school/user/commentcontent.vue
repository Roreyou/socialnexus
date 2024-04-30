<!-- 高校->活动 评价列表 -->
<template>
    <view>
        <commentlist :v-model="showlist" :list="com_list" :list_type="list_type" @gotocomment="toComment"></commentlist>
        <u-popup v-model="tocom" mode="bottom" border-radius="14">
				<view class="bodys">
					<u-form :model="comModal" :rules="rules" ref="comForm" :errorType="errorType">
						<u-form-item :border-bottom="false"  prop="comInfo">
							<u-input v-model="comModal.comInfo" type="textarea" placeholder="发表你的评价" :border="border"
								:border-color="borderColor" :height="height" :auto-height="autoHeight" />
						</u-form-item>
					</u-form>
					<!-- <view class="cardZw">
						上传照片
					</view>
					<u-upload @on-success="handleSuccess" :custom-btn="true" max-count="4" ref="uUpload" :action="action" :file-list="comModal.comImgs" :auto-upload="false">
						<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
							<image src="../../../static/icon/upload.png"></image>
						</view>
					</u-upload> -->
					
					<view class="bodys_btn">
						<u-button :custom-style="customStyles" :ripple="true" class="pl_bt" @click="postComInfo()"
							ripple-bg-color="#ff9b01">发布</u-button>
				</view>
			</view>
		</u-popup>
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
            tocom: false,
            com_list: [],
            comModal: {
                comInfo:'',
            },
            com_acti_id: '', 
            showlist: true
        }
    },
      // 监听 com_list 的变化
    watch: {
        com_list: function(newVal, oldVal) {
            this.showlist = false
            this.$nextTick(() => {
                this.showlist = true
            });
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
        toComment(acti_id){
            this.tocom = true
            this.com_acti_id = acti_id
        },
        postComInfo(){
            //发表评价
            uni.request({
				url: this.$url.BASE_URL + '/4142061-0-default/schoolteam/commentactivity',
				// url: 'https://mock.apifox.coml/m1/4142061-3780993-default/schoolteam/getRecommend',
				header:{
					Authorization:uni.getStorageSync("token")
				},					
				method: 'POST',
				data: {
                    team_id: this.user_id,
					comment: this.comModal.comInfo,
					activity_id: this.com_acti_id,
					// token: this.$userinfo.token
				},
				success: res => {
					if(res.data.code == 200){
                        this.$u.toast('评价成功!')
                        this.comModal.comInfo = ''
                        this.tocom = false
                        this.com_list = this.com_list.filter(item => item.acti_id !== this.com_acti_id);
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

/* 发布评价 */
.warp {
		background-color: #FFFFFF;
		margin-bottom: 100px;
	}

	.fenge {
		padding: 10px;
	}

	.load_more {
		margin-top: 100px;
	}

	.bodys{
		padding: 20px;
		
	}
	
	.cardZw {
		margin: 10px 0px;
	}
	.slot-btn {
		width: 200rpx;
		height: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(244, 245, 246);
		border-radius: 10rpx;

	}
	
	.slot-btn__hover {
		background-color: rgb(235, 236, 238);
	}
	.info_iput {
		padding: 20px;
		font-weight: 600;
	
	}
	
	.u-input--border {
		border-radius: 30rpx !important;
		border: 2px solid #000000 !important;
	}
	
	.u-form-item {
		padding: 10rpx 0 !important;
	}

	.bodys_btn{
		margin-top: 10px;
	}

	.pl_bt{
		background-color: #39b54a;
	}
</style>