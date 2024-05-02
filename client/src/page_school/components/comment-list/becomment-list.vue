<!-- 活动->高校 评价列表 组件 -->
<template>
    <view>
        <view>
            <view class="cu-item" v-for="(item,index) in list" :key="index">
                <view class="cu-card article" :class="isCard?'no-card':''" @click="todetail(item.id)">
                        <view class="cu-item shadow" :class="{ 'indexstyle': isindex }">

                            <view class="title"">
                                <view class="com_time" :class="{ 'text-cut': ismyac}">{{item.community_name}}</view>
                            </view>
                            <view class="com-content">
                                <view class="desc"">
                                    <view class="text-content"> {{item.com_to_team}}</view>    
                                </view>
                                <!-- 这里放活动卡片 -->
                                <view class="acti_card"">
                                    <view class="title">
                                        <view class="acti_name" :class="{ 'text-cut': ismyac}">{{item.activity_name}}</view>
                                        <view class="desc">
                                            <view class="text-content ac_time"> 活动时间：{{item.acti_time}}</view>    
                                        </view>
                                    </view>
                                </view>
                                <view class="button-container" v-if="list_type=='1'">
                                    <button class="custom-button">去评价</button>
                                </view>
                            </view>
                        </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        list: Array,
        // isindex:{
        //     type:Boolean,
        //     default:false
        // },   
        // ismyac:{
        //     type:Boolean,
        //     default:false  
        // }
        // list_type:{
        //     type:String,
        //     default:'0'  //0是未评价
        // }
      },
    data() {
        return {
        }
    },
    onLoad() {

    },
    methods: {
        //前往详情页
        todetail(id){
            // uni.navigateTo({
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
.article{
    /* 10是试验出来的最小高度，不能改了 */
    margin-top: -10rpx;  
}

.cu-item .shadow{
/* margin: 0; */
margin-top: 10rpx;
margin-bottom: 15rpx;
border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
}

.cu-bar .action:first-child{
margin-left: 24rpx;
}

.text-cut{
margin-top: -15rpx;
line-height: 60rpx;
}

.text-content{
margin: 0 25rpx;
height: auto;
}

.com_time{
font-size: larger;
}

/* 活动卡片 */
.acti_card{
    background-color: #f3f4f6;
    margin: 15rpx 25rpx;
    padding-bottom: 15rpx;
}
.acti_name{
    font-size: larger;
}

.ac_time{
    margin: auto;
    /* margin-bottom: 15rpx; */
    color: gray;
}

/* 评价按钮 */
.custom-button {
    background: linear-gradient(to right, #ff4e50, #f9d423);
    color: white;
    border: none;
    padding: 0px 10px;
    text-align: center;
    font-size: 11px;
    border-radius: 20px;
    margin-top: 15rpx;
}

.button-container {
  text-align: right;
  margin: 0rpx 25rpx 0 480rpx;
}
</style>