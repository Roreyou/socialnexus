<template>
	<view class="invite">
		<!-- <u-cell  title="点击选则" isLink :value="value" @click="change()"></u-cell> -->
		<button @click="change()">点击选则</button>
		<!-- 原本的 -->
		<!-- <u-picker class="picker"
			:show="show"
			ref="uPicker"
			:columns="columns"
			@confirm="confirm"
			@cancel="show=false"
			@change="changeHandler"
		></u-picker> -->

		<u-picker class="picker"
			show='true'
			ref="uPicker"
			:columns="columns"
			@confirm="confirm"
			@cancel="show=false"
			@change="changeHandler"
		></u-picker>
	</view>
</template>

<script>
import uPicker from '../../../uview-ui/components/u-picker/u-picker.vue';
import { address } from '../../static/js/address.js';
export default {
	components: {
		uPicker
	},
	data() {
		return {
			show: true,
			columns: [],
			origiData: address,  //获取到的原始数据
			value:"", 		     
		};
	},
	mounted() {
		this.handelData();
	},
	methods: {
		change(){
			// this.show=true;
			this.$nextTick(() => {
					this.show = true;
			});
		  console.log("show:",this.show)
		//   this.$refs.uPicker.show()
		},
		//初始化开始数据
		handelData() {
			// console.log(this.origiData.value))
			let sheng = [];
			let shi = [];
			let qu = [];
			this.origiData.forEach(item => {
				sheng.push(item.value);
				// 设置出初始化的数据
				if (item.value == '北京市') {
					item.children.forEach(child => {
						shi.push(child.value);

						if (child.value == '北京市') {
							child.children.forEach(el => {
								qu.push(el.value);
							});
						}
					});
				}
			});
			this.columns.push(
				JSON.parse(JSON.stringify(sheng)),
				JSON.parse(JSON.stringify(shi)),
				JSON.parse(JSON.stringify(qu))
			);
		},
		changeHandler(e) {
			const {
				columnIndex,
				value,
				values, // values为当前变化列的数组内容
				index,
				// 微信小程序无法将picker实例传出来，只能通过ref操作
				picker = this.$refs.uPicker
			} = e;
			// console.log('测试数据', e);
			// 当第一列值发生变化时，变化第二列(后一列)对应的选项
			if (columnIndex === 0) {
				// console.log(value)
				// picker为选择器this实例，变化第二列对应的选项
				this.origiData.forEach(item => {
					if (value[0] == item.value) {
						let shi = [];
						let flag = item.children[0].value;
						item.children.forEach((val, ol) => {
							shi.push(val.value);
							if (shi[0] == flag) {   //设置默认开关（选择省份后设置默认城市）
								flag = '';
								let qu = [];
								val.children.forEach(vol => {
									qu.push(vol.value);
								});
								picker.setColumnValues(2, qu);
							}
						});
						picker.setColumnValues(1, shi);
					}
				});
			}
			//当第二列变化时，第三列对应变化
			if (columnIndex === 1) {
				this.origiData.forEach(item => {
					if (value[0] == item.value) {
						let shi = [];
						item.children.forEach((val, ol) => {
							shi.push(val.value);
							if (value[1] == val.value) {
								let qu = [];
								val.children.forEach(vol => {
									qu.push(vol.value);
								});
								picker.setColumnValues(2, qu);
							}
						});
					}
				});
			}
		},
		// 确认选中的数据
		confirm(e) {
			// console.log('confirm', JSON.stringify(e));
			this.value=e.value[0]+e.value[1]+e.value[2]
			this.show = false;
		}
	}
};
</script>

<style>
.picker{
	width: 50px;
	height: 50px;
	background-color: aqua;
}
</style>
