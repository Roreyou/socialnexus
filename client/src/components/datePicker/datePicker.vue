<template>
  <view class="datetimePicker" @touchmove.stop.prevent="preventTouchMove">
    <view :class="popFlag ? 'popMask' : ''" @click="hide"></view>
    <view class="popBottom" :class="popFlag ? 'popRound' : ''">
      <view class="head">
        <text class="t1" @click="hide">关闭</text>
        <text class="t2" @click="confirm">确认</text>
      </view>
      <picker-view :value="dateTimeIndex" @change="dateTimeChange">
        <picker-view-column>
          <block v-for="(year, index) in years" :key="index">
            <view>{{ year }}</view>
          </block>
        </picker-view-column>
        <picker-view-column>
          <block v-for="(month, index) in months" :key="index">
            <view>{{ month }}</view>
          </block>
        </picker-view-column>
        <picker-view-column>
          <block v-for="(day, index) in days" :key="index">
            <view>{{ day }}</view>
          </block>
        </picker-view-column>
        <picker-view-column>
          <block v-for="(hour, index) in hours" :key="index">
            <view>{{ hour }}</view>
          </block>
        </picker-view-column>
        <picker-view-column>
          <block v-for="(minute, index) in minutes" :key="index">
            <view>{{ minute }}</view>
          </block>
        </picker-view-column>
      </picker-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      popFlag: false,
      dateTimeIndex: [0, 0, 0, 0, 0], // Indexes for year, month, day, hour, minute
      years: [],
      months: [],
      days: [],
      hours: [],
      minutes: [],
    };
  },
  mounted() {
    // Initialize years, months, days, hours, and minutes data
    this.initDateTimeData();
  },
  methods: {
    // Prevent touch move
    preventTouchMove() {},
    // Date time change
    dateTimeChange(e) {
      // Update dateTimeIndex
      this.dateTimeIndex = e.detail.value;
    },
    // Show picker
    show() {
      this.popFlag = true;
    },
    // Hide picker
    hide() {
      this.popFlag = false;
    },
    // Confirm selection
    confirm() {
      const [yearIndex, monthIndex, dayIndex, hourIndex, minuteIndex] =
        this.dateTimeIndex;
      const selectedDateTime = `${this.years[yearIndex]}-${this.months[monthIndex]}-${this.days[dayIndex]} ${this.hours[hourIndex]}:${this.minutes[minuteIndex]}`;
      this.$emit("confirm", selectedDateTime);
      this.hide();
    },
    // Initialize years, months, days, hours, and minutes data
    initDateTimeData() {
      // Initialize years
      const currentYear = new Date().getFullYear();
      for (let i = currentYear - 10; i <= currentYear + 10; i++) {
        this.years.push(i);
      }

      // Initialize months
      for (let i = 1; i <= 12; i++) {
        this.months.push(i < 10 ? "0" + i : i);
      }

      // Initialize days
      this.updateDays();

      // Initialize hours
      for (let i = 0; i < 24; i++) {
        this.hours.push(i < 10 ? "0" + i : i);
      }

      // Initialize minutes
      for (let i = 0; i < 60; i++) {
        this.minutes.push(i < 10 ? "0" + i : i);
      }
    },
    // Update days based on selected year and month
    updateDays() {
      const [yearIndex, monthIndex] = this.dateTimeIndex;
      const year = this.years[yearIndex];
      const month = this.months[monthIndex];
      const daysInMonth = new Date(year, month, 0).getDate();
      this.days = [];
      for (let i = 1; i <= daysInMonth; i++) {
        this.days.push(i < 10 ? "0" + i : i);
      }
    },
  },
};
</script>

<style scoped>
.datetimePicker > .popMask {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10000;
}
.datetimePicker > .popBottom {
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
.datetimePicker > .popRound {
  transition: all 0.3s ease;
  transform: translateX(0);
  opacity: 1;
}
.datetimePicker > .popBottom > .head {
  width: 100%;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 30rpx 0 30rpx;
  border-bottom: 1px solid #f0f0f0;
}
.datetimePicker > .popBottom > .head > text {
  display: block;
  width: 100rpx;
  height: 100%;
  text-align: center;
  line-height: 80rpx;
  font-weight: bold;
}
.datetimePicker > .popBottom > .head > .t1 {
  color: #888888;
}
.datetimePicker > .popBottom > .head > .t2 {
  color: #8ddbe6;
}
.datetimePicker > .popBottom > picker-view {
  height: 500rpx;
}
.datetimePicker > .popBottom > picker-view view {
  text-align: center;
  line-height: 68rpx;
}
</style>
