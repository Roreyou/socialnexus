<!-- 高校 搜索活动内容 -->
<template>
    <actilist v-if="isshow" :acList="modifiedSearchList"></actilist>
</template>

<script>
import actilist from '../../../components/acti-list/acti-list.vue';

export default {
    name:'scontent',
    props: {
        isrecommend:{
            type: Boolean,
            default: false
        },  //是不是推荐的活动
        searchlist: Array,
        searchcontent: {
            type: String,
            default: ''
        }  //改成在这里用搜索内容请求
    },
    components: {
        actilist
    },
    data() {
        return {
            // modifiedSearchList: this.searchlist.slice(),
            modifiedSearchList: [],
            // content: this.searchcontent,
            isshow: true,
            page: 0,
            loadmore: true,
            new_search: false 
            //标志是不是一次新搜索的开始
        }
    },
    computed:{
        content() {
            return this.searchcontent 
        }
    },
    watch: {
        searchlist(newValue, oldValue){
            console.log('searchlist 的值已更改：', newValue);
        },
        searchcontent(newValue, oldValue) {
            this.modifiedSearchList = []  //清空
            this.page = 0 
        console.log('searchcontent 的值已更改：', newValue);
        this.loadmore = true 
            if(newValue !== ''){
                const data = {
                    text: newValue,
                    page:0
                }
                this.search(data)  //加载搜索列表（第一批
            }else{
                const data = {
                    provice: '',
                    page:0
                }
                this.getRelist(data)
            }
        },
        modifiedSearchList(newValue, oldValue){
            // this.isshow = false
            // this.$nextTick(() => {
            //     this.isshow = true
            // });
        }
    },
    mounted(){
        if(this.content === ''){
            const data = {
                provice: '',
                page:0
            }
            this.getRelist(data)
        }

        //绑定触底监听
        var that=this;
        uni.$on('search--onReachBottom', function(data) {
            console.log('收到__search--onReachBottom');
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
    // onReachBottom() {
	// 	uni.$emit('search -- onReachBottom');
	// 	console.log('search -- onReachBottom')

	// },

    methods: {
        getmore(){
            ++ this.page
            const data = {
                text: this.content,
                page: this.page
            }
            if(this.content === ''){
                this.getRelist(data)
            }
            else{
                this.search(data)
            }
        },
        getRelist(data){
            uni.request({
						url: this.$url.BASE_URL + '/schoolteam/getRecommend',
						// url: 'https://mock.apifox.coml/m1/schoolteam/getRecommend',
						method: 'GET',
						data: data,
						success: res => {
							// this.searchlist = res.data.data.acti_list;
                            if(res.data.data.acti_list.length){
                                this.modifiedSearchList = this.modifiedSearchList.concat(res.data.data.acti_list)
                                console.log("res.data.data.acti_list.id:",res.data.data.acti_list[0].id)
                                this.loadmore = true
                            }else{  //空了
                                this.loadmore = false 
                            }

							this.net_error = false;
						},
						fail: res => {
							this.net_error = true;
						},
						complete: () => {
						}
					})
        },
        search(data){
            // console.log('content:', content)
            if(this.content === ''){
                //没有搜索内容时下拉列表
                return
            }
			uni.request({
			url: this.$url.BASE_URL + '/schoolteam/activsquare/search',
			header:{
				Authorization:uni.getStorageSync("token")
			},	
			method: 'GET',
			data: data,
			success: res => {
                if(res.data.data.activ_list.length){
                    this.modifiedSearchList = this.modifiedSearchList.concat(res.data.data.activ_list)
                    this.loadmore = true
                }else{  //空了
                    this.loadmore = false 
                }
				// this.modifiedSearchList = res.data.data.activ_list;
				// console.log("searchlist:",this.modifiedSearchList)
				// this.TabCur = 0
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