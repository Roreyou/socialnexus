<!-- 高校 搜索活动内容 -->
<template>
    <actilist :acList="searchlist"></actilist>
</template>

<script>
import actilist from '../../../components/acti-list/acti-list.vue';

export default {
    props: {
        searchlist: Array,
    },
    components: {
        actilist
    },
    data() {
        return {
            title: '高校 -- 搜索活动内容',
        }
    },
    onLoad() {

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