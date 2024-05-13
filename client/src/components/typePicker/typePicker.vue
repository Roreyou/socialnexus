<template>
  <view class="typePicker" @touchmove.stop.prevent="preventTouchMove">
    <view :class="popFlag ? 'popMask' : ''" @click="hide"></view>
    <view class="popBottom" :class="popFlag ? 'popRound' : ''">
      <view class="head">
        <text class="t1" @click="hide">关闭</text>
        <text class="t2" @click="confirm">确认</text>
      </view>
      <picker-view :value="typeIndex" @change="typeChange">
        <picker-view-column>
          <block v-for="(item, index) in typeArr" :key="index">
            <view>{{ item.name }}</view>
          </block>
        </picker-view-column>
      </picker-view>
    </view>
  </view>
</template>

<script>
import { typeData } from "./typeData.js";

export default {
  data() {
    return {
      popFlag: false,
      typeArr: typeData,
      typeIndex: 0,
    };
  },
  methods: {
    // 防穿透
    preventTouchMove() {},
    // 滚动切换
    typeChange(e) {
      this.typeIndex = e.detail.value;
    },
    // 显示
    show(e) {
      this.popFlag = true;
    },
    // 隐藏
    hide(e) {
      this.popFlag = false;
    },
    // 确认
    confirm(e) {
      let selectedType = this.typeArr[this.typeIndex].id;
      this.$emit("confirm", selectedType);
      this.hide();
    },
  },
};
</script>

<style>
.typePicker > .popMask {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10000;
}

.typePicker > .popBottom {
  width: 100vw;
  background-color: #ffffff;
  font-size: 32rpx;
  position: fixed;
  bottom: 0;
  left: 0;
  transition: all 0.3s ease;
  transform: translateY(100%);
  opacity: 0;
  z-index: 20000;
}

.typePicker > .popRound {
  transition: all 0.3s ease;
  transform: translateX(0);
  opacity: 1;
}

.typePicker > .popBottom > .head {
  width: 100%;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 30rpx 0 30rpx;
  border-bottom: 1px solid #f0f0f0;
}

.typePicker > .popBottom > .head > text {
  display: block;
  width: 100rpx;
  height: 100%;
  text-align: center;
  line-height: 80rpx;
  font-weight: bold;
}

.typePicker > .popBottom > .head > .t1 {
  color: #888888;
}

.typePicker > .popBottom > .head > .t2 {
  color: #8ddbe6;
}

.typePicker > .popBottom > picker-view {
  height: 500rpx;
}

.typePicker > .popBottom > picker-view view {
  text-align: center;
  line-height: 68rpx;
}
</style>
