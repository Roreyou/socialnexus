<!-- 社区基层信息 -->
<template>
	<view class="container">
		<!-- <uni-card :is-shadow="false" is-full>
			<text class="uni-h6">uni-forms 组件</text>
		</uni-card> -->
		<uni-section title="新增活动" type="line">
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="baseForm" :model="activityInfo" labelWidth="80px">
					<!-- <uni-forms-item label="所属高校" required>
						<uni-easyinput v-model="activityInfo.name" placeholder="中山大学" ref="inputElement" />
					</uni-forms-item> -->
					<uni-forms-item label="活动名称" required>
						<uni-easyinput v-model="activityInfo.name" placeholder="请输入活动名称" />
					</uni-forms-item>
					<uni-forms-item label="开始时间" required>
						<uni-easyinput v-model="activityInfo.startTime" placeholder="请输入活动开始时间" />
					</uni-forms-item>
					<uni-forms-item label="结束时间" required>
						<uni-easyinput v-model="activityInfo.endTime" placeholder="请输入活动结束时间" />
					</uni-forms-item>
					<uni-forms-item label="活动省份" required>
						<uni-easyinput v-model="activityInfo.province" placeholder="请输入活动省份" />
					</uni-forms-item>
					<uni-forms-item label="活动城市" required>
						<uni-easyinput v-model="activityInfo.city" placeholder="请输入活动城市" />
					</uni-forms-item>
					<uni-forms-item label="活动地址" required>
						<uni-easyinput v-model="activityInfo.address" placeholder="请输入活动地址" />
					</uni-forms-item>
					<uni-forms-item label="活动类型" required>
						<uni-data-picker v-model="activityInfo.activityType" :localdata="typeData" popup-title="请选择活动类型"></uni-data-picker>
					</uni-forms-item>
          <uni-forms-item label="活动关键词" required>
						<uni-easyinput v-model="activityInfo.keywords" placeholder="请输入活动关键词(用逗号隔开)" />
					</uni-forms-item>
          <uni-forms-item label="活动简介" required>
						<uni-easyinput type="textarea" v-model="activityInfo.remark" placeholder="请输入简介" />
					</uni-forms-item>
				</uni-forms>
			</view>
			<view class="button-group">
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
				activityInfo: {
					name: '',
					startTime: '',
					endTime: '',
					province: '',
					city: '',
					address: '',
					activityType: '',
					keywords: '',
					remark: '',
				},
        typeData: [
          {
            text: '社区经济发展',
            value: '1',
          },
          {
            text: '社区团建工作',
            value: '2',
          },
          {
            text: '社区社会调查',
            value: '3',
          },
          {
            text: '社区文体活动',
            value: '4',
          },
          {
            text: '社区教育服务',
            value: '5',
          },
          {
            text: '社区环境治理',
            value: '6',
          },
          {
            text: '其他',
            value: '7',
          },
        ],
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
				console.log(this.activityInfo);
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
	@import '@/common/customicons.css';
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