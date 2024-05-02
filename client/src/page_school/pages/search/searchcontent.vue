<!-- 高校 搜索活动内容 -->
<template>
    <actilist :acList="searchlist"></actilist>
</template>

<script>
import actilist from '../../../components/acti-list/acti-list.vue';

export default {
    name:'scontent',
    props: {
        searchlist: Array,
        searchcontent: {
            type: String,
            default: ''
        }
    },
    components: {
        actilist
    },
    data() {
        return {
        }
    },
    methods: {
        search(){
			uni.request({
			url: this.$url.BASE_URL + '/4142061-0-default/schoolteam/activsquare/search',
			header:{
				Authorization:uni.getStorageSync("token")
			},	
			method: 'GET',
			data: {
				text: this.searchcontent
			},
			success: res => {
				this.searchlist = res.data.data.activ_list;
				// console.log("searchlist:",this.searchlist)
				this.TabCur = 0
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