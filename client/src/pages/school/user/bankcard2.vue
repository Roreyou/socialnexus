<template>
	<view>
		<cu-custom :isBack="true" bgColor="title-color">
			<block slot="backText">返回</block>
			<block slot="content">添加银行卡</block>
		</cu-custom>

		<form name="frmSubmit" method="post">
			<view class="cu-form-group margin-top">
				<view class="title">银行</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{picker[index]}}
					</view>
				</picker>
			</view>
			<view v-if="index>2" class="cu-form-group">
				<view class="title">支行名称</view>
				<m-input class="m-input" type="text" v-model="brunch" placeholder="支行名称"></m-input>
			</view>
			<view v-if="index>0" class="cu-form-group">
				<view class="title">账户名称</view>
				<m-input class="m-input" type="text" v-model="name" placeholder="真实姓名"></m-input>
			</view>
			<view v-if="index>0" class="cu-form-group">
				<view class="title">账号</view>
				<m-input class="m-input" type="text" v-model="account" :placeholder="(index==1 || index==2)?'手机号码':'银行卡号'"></m-input>
			</view>
			<view v-if="index==1 || index==2" class="cu-form-group">
				<view class="title">收款二维码</view>
				<view class="grid col-2 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view v-if="index>0" class="cu-form-group">
				<view class="title">验证码</view>
				<m-input class="m-input" type="text" v-model="sms_code" placeholder="短信验证码"></m-input>
				<button class='cu-btn bg-green shadow' @tap="sendSMS">{{sms_text}}</button>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-green margin-top-sm lg" @tap="doRegister">确认添加</button>
			</view>
		</form>
	</view>
</template>

<script>
	import mInput from '../../../components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				bank: '',
				brunch: '',
				name: '',
				account: '',
				sms_code: '',
				index: 0,
				imgList: [],
				qrcode: '',
				sms_text:'短信验证码',
				picker: ['请选择银行名称，微信或支付宝', '微信支付', '支付宝支付', '建设银行', '中国农业银行', '中国工商银行', '中国银行', '汇丰银行', '交通银行', '邮政银行', '民生银行',
					'广发银行', '浦发银行', '平安银行'
				],
			}
		},
		onShow() {
			this.$userinfo = JSON.parse(uni.getStorageSync("userinfo"))
		},
		methods: {
			sendSMS() {
				this.sms_text = "正在发送...";
				uni.request({
					url: this.$url + '/__ajax_sms2.php',
					method: 'GET',
					data: {
						'a': "sms_bank",
						token: this.$userinfo.token
					},
					success: res => {
						let data = res.data;
						if (data.status=='success') {
							uni.showToast({
								icon: 'none',
								title: "" + data.msg,
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: "" + data.msg,
							});
						}
					},
					fail: res => {},
					complete: () => {}
				})
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '删除图片/二维码',
					content: '确定要删除这个图片/二维码？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			doRegister() {
				uni.showModal({
					title: '添加支付信息',
					content: '请检查支付信息是否有吴，无误点击确定，如果因为信息错误导致无法收款，后果自行承担。',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							uni.uploadFile({
								url: this.$url + '/__upload.php',
								filePath: this.imgList[0],
								name: 'imgFile',
								formData: {
									a: "bankcard",
									id: this.index,
									bank: this.picker[this.index],
									brunch: this.brunch,
									name: this.name,
									account: this.account,
									sms_code: this.sms_code,
									qrcode: this.imgList[0],
									token: this.$userinfo.token
								},
								success: (res) => {
									//console.log(res)
									res =JSON.parse(res.data);
									if (res.status == 'success') {
										uni.showToast({
											icon: 'none',
											title: "Success " + res.msg,
										});
										uni.reLaunch({
											url: '/pages/user/bankcard'
										});
									} else {
										uni.showToast({
											icon: 'none',
											title: ""+ res.msg,
										});
									}
								},
								fail: res => {
									console.log("", res.data.msg)
								},
								complete: () => {}
							});
						}
					}
				})

			}
		}
	}
</script>

<style lang="scss">
	.cu-form-group .title {
		min-width: calc(5em + 10px);
		color: $uni-green-6;
	}

	.picker {
		padding-left: 10px;
		text-align: left !important;
		color: $uni-gray-6;
	}
</style>
