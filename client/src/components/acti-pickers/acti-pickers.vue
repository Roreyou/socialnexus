<template>
  <view>
    <view @click="showpop">所在地址：{{citytext}}</view>
      <view class="">
        <uni-popup id="addressPopup" ref="addressPopup" :type="'bottom'" @change="change">
          <picker-view  :value="region" @change="bindChange" @pickstart="onPickstart" @pickend="onPickend">
            <picker-view-column class="picker-view2">
              <view class="f-center" v-for="(item,index) in citylist" :key="index">{{item.label}}
              </view>
            </picker-view-column>
            <picker-view-column v-if="citylist[region[0]]" class="picker-view2">
              <view class="f-center" v-for="(item,index) in citylist[region[0]].children" :key="index">
                {{item.label}}
              </view>
            </picker-view-column>
            <picker-view-column v-if="citylist[region[0]]" class="picker-view2">
              <view class="f-center"
                v-for="(item,index) in citylist[region[0]].children[region[1]].children" :key="index">
                {{item.label}}
              </view>
            </picker-view-column>
          </picker-view>

          <view style="width: 100%;" class="btn-Block f-center">
            <view class="btn-left f-center" @click="onCancel">取消</view>
            <view class="btn-right f-center" :class="changePopup == false ? 'changePopup':''" @click="onSubmit">
              确定</view>
          </view>
        </uni-popup>
      </view>
  </view>
</template>
<script>
export default {
  data() {
	return {
		region: [0, 0, 0], //地址每列的index
		citylist: [],//地址数据，格式为 三级地址全返回
		changePopup: true, //确定按钮状态
		citytext: '',//地址文字
	}},

	methods: {
		//弹出地址选择器
showpop(){
	this.$refs.addressPopup.open();
},
//滚动时禁用确定按钮
onPickstart() {
	//开始滚动
	this.changePopup = false;
},
//滚动结束
onPickend(){
	this.changePopup = true;
},
//选择值改变事件
bindChange(e) {
	this.region = e.detail.value;
	this.changePopup = true;
},
//取消
onCancel: function() {
	this.$refs.addressPopup.close();
	this.changePopup = true;
},
//确定
onSubmit: function() {
	this.citytext = this.citylist[this.region[0]].label + ' ' + this.citylist[this.region[0]]
		.children[this.region[1]].label + ' ' + this.citylist[this.region[0]].children[this.region[1]]
		.children[this.region[2]].label
	this.$refs.addressPopup.close(); //关闭地址弹出层
},
  },
}
</script>

<style>
.datePopup-box {
	background-color: #ffffff;
}

	.f-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.btn-Block {
		width: 100%;
		background-color: rgba(255, 255, 255, 1);
		padding: 25upx;
		height: 230upx;
  }

		.btn-left {
			width: 250upx;
			height: 80upx;
			border-radius: 10upx;
			color: rgba(0, 189, 0, 0.8);
			background-color: rgba(170, 255, 255, 1);
			background-image: linear-gradient(to top right, rgba(241, 240, 240, 1), rgba(238, 238, 238, 1));
			margin-right: 30upx;
		}

		.btn-right {
			width: 250upx;
			height: 80upx;
			border-radius: 10upx;
			color: rgba(255, 255, 250, 1);
			background-color: rgba(195, 195, 0, 1);
			background-image: linear-gradient(to top right, rgba(0, 180, 0, 0.8), rgba(0, 188, 0, 0.8));
		}
		.changePopup {
			background: rgba(149, 149, 149, 0.5) !important;
		}


	.picker-view {
		background-color: #fffefd;
	}

	.picker-view {
		width: 100%;
		height: 600upx;
	}

</style>
