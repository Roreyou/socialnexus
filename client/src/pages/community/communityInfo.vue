<!-- 社区基层信息 -->
<template>
	<view class="container">
		<!-- <uni-card :is-shadow="false" is-full>
			<text class="uni-h6">uni-forms 组件</text>
		</uni-card> -->
		<uni-section title="社区基本信息认证" type="line">
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="baseForm" :model="baseFormData" labelWidth="80px">
					<!-- <uni-forms-item label="所属高校" required>
						<uni-easyinput v-model="baseFormData.name" placeholder="中山大学" ref="inputElement" />
					</uni-forms-item> -->
					<uni-forms-item label="社区名字" required>
						<uni-easyinput v-model="baseFormData.name" placeholder="请输入社区名字" />
					</uni-forms-item>
					<uni-forms-item label="联系方式" required>
						<uni-easyinput v-model="baseFormData.phone" placeholder="请输入社区联系方式" />
					</uni-forms-item>
					<uni-forms-item label="省" required>
						<uni-easyinput v-model="baseFormData.province" placeholder="请输入社区所在省" />
					</uni-forms-item>
					<uni-forms-item label="市" required>
						<uni-easyinput v-model="baseFormData.city" placeholder="请输入社区所在市" />
					</uni-forms-item>
					<uni-forms-item label="详细地址" required>
						<uni-easyinput v-model="baseFormData.address" placeholder="请输入社区详细地址" />
					</uni-forms-item>
					<uni-forms-item label="成立日期" required>
						<uni-easyinput v-model="baseFormData.foundDate" placeholder="请输入社区成立日期" />
					</uni-forms-item>
					<uni-forms-item label="社区介绍">
						<uni-easyinput type="textarea" v-model="baseFormData.introduction" placeholder="请输入社区介绍" />
					</uni-forms-item>
				</uni-forms>
			</view>
			<view class="button-group">
				<button type="primary" size="mini" @click="modifyPassword">修改密码</button>
				<button type="primary" size="mini" @click="submit('dynamicForm')">提交</button>
			</view>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 基础表单数据
				baseFormData: {
					name: '',
					phone: '',
					province: '',
					city: '',
					address: '',
					foundDate: '',
					introduction: '',
				},
				// 分段器数据
				current: 0,
				items: ['左对齐', '顶部对齐'],
				// 校验表单数据
				valiFormData: {
					name: '',
					age: '',
					introduction: '',
				},
				// 校验规则
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					age: {
						rules: [{
							required: true,
							errorMessage: '年龄不能为空'
						}, {
							format: 'number',
							errorMessage: '年龄只能输入数字'
						}]
					}
				},
				// 自定义表单数据
				customFormData: {
					name: '',
					age: '',
					hobby: []
				},
				// 自定义表单校验规则
				customRules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					age: {
						rules: [{
							required: true,
							errorMessage: '年龄不能为空'
						}]
					},
					hobby: {
						rules: [{
								format: 'array'
							},
							{
								validateFunction: function(rule, value, data, callback) {
									if (value.length < 2) {
										callback('请至少勾选两个兴趣爱好')
									}
									return true
								}
							}
						]
					}

				},
				dynamicFormData: {
					email: '',
					domains: []
				},
				dynamicLists: [],
				dynamicRules: {
					email: {
						rules: [{
							required: true,
							errorMessage: '域名不能为空'
						}, {
							format: 'email',
							errorMessage: '域名格式错误'
						}]
					}
				},
				addinput : [
				{
					label: '新密码',
					value: '',
					rules: [{
						'required': true,
						errorMessage: '新密码项必填'
					}],
					holder: '请输入新密码',
					id: Math.floor(Math.random() * Date.now())
				},
				{
					label: '确认密码',
					value: '',
					rules: [{
						'required': true,
						errorMessage: '确认密码项必填'
					}],
					holder: '请确认密码',
					id: Math.floor(Math.random() * Date.now())
				},
				]
			}
		},
		computed: {
			// 处理表单排列切换
			alignment() {
				if (this.current === 0) return 'left'
				if (this.current === 1) return 'top'
				return 'left'
			}
		},
		// mounted() {
		// 	this.$refs.inputElement.placeholder = "中山大学";
		// 	this.$refs.inputElement.readOnly = true;
		// },
		onLoad() {},
		onReady() {
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行
			// this.$refs.customForm.setRules(this.customRules)
		},
		methods: {
			onClickItem(e) {
				console.log(e);
				this.current = e.currentIndex
			},
			del(i, id) {
				// let index = this.dynamicLists.findIndex(v => v.id === id)
				console.log("del", i)
				this.dynamicFormData.domains.splice(i, 1)
				console.log(this.dynamicFormData.domains)
			},
			modifyPassword() {

			},
			submit(ref) {
				console.log(this.baseFormData);
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					uni.showToast({
						title: `校验通过`
					})
				}).catch(err => {
					console.log('err', err);
				})
			},
		}
	}
</script>

<style lang="scss">
		/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}
	/* #endif */
	.container {
    	height: 100vh;
		overflow-y: auto;
	}
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}


	.example {
		padding: 15px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		line-height: 35px;
		margin-left: 10px;
	}
	.button-del{
		text-align: center;
	}

	.button-group{
		display: flex;
  		flex-direction: column;
  		align-items: center;
	}
	.button-group button {
  		margin-bottom: 15px; 
	}
</style>