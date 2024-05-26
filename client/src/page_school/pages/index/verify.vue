<!-- 高校 认证信息 -->
<template>
	<view class="container">
		<uni-section title="指导老师信息认证" type="line">
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="baseForm" :model="baseFormData" labelWidth="80px">
					<!-- <uni-forms-item label="所属高校" required>
						<uni-easyinput v-model="baseFormData.name" placeholder="中山大学" ref="inputElement" />
					</uni-forms-item> -->
					<uni-forms-item label="所属学院" :rules="[{ required: true, errorMessage: '所属学院项必填', trigger: 'blur' }]" name="major">
						<uni-easyinput v-model="baseFormData.major" placeholder="请输入指导老师所属学院" />
					</uni-forms-item>
					<uni-forms-item label="姓名" :rules="[{ required: true, errorMessage: '姓名项必填', trigger: 'blur' }]" name="name">
						<uni-easyinput v-model="baseFormData.name" placeholder="请输入指导老师负责人姓名" />
					</uni-forms-item>
					<uni-forms-item label="联系电话" :rules="[{ required: true, errorMessage: '联系电话项必填', trigger: 'blur' }]" name="tel">
						<uni-easyinput v-model="baseFormData.tel" placeholder="请输入指导老师联系电话" />
					</uni-forms-item>
					<!-- <uni-forms-item label="负责人邮箱" required>
						<uni-easyinput v-model="baseFormData.name" placeholder="请输入负责人邮箱" />
					</uni-forms-item> -->
					<uni-forms-item label="工号" :rules="[{ required: true, errorMessage: '工号项必填', trigger: 'blur' }]" name="id">
						<uni-easyinput v-model="baseFormData.id" placeholder="请输入指导老师工号" />
					</uni-forms-item>
					<uni-forms-item label="邮箱" :rules="[{ required: true, errorMessage: '邮箱项必填', trigger: 'blur' }]" name="email">
						<uni-easyinput v-model="baseFormData.email" placeholder="请输入指导老师邮箱" />
					</uni-forms-item>

				</uni-forms>
			</view>
		</uni-section>

		<uni-section title="学生队长信息认证" type="line">
			<view class="example">
				<uni-forms ref="baseForm2" :model="baseFormData2" labelWidth="80px">
					<uni-forms-item label="姓名" :rules="[{ required: true, errorMessage: '姓名项必填', trigger: 'blur' }]" name="name">
						<uni-easyinput v-model="baseFormData2.name" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="联系电话" :rules="[{ required: true, errorMessage: '联系电话项必填', trigger: 'blur' }]" name="tel">
						<uni-easyinput v-model="baseFormData2.tel" placeholder="请输入联系电话" />
					</uni-forms-item>
					<uni-forms-item label="所属院系" :rules="[{ required: true, errorMessage: '所属院系项必填', trigger: 'blur' }]" name="major">
						<uni-easyinput v-model="baseFormData2.major" placeholder="请输入院系名称" />
					</uni-forms-item>
					<uni-forms-item label="年级" :rules="[{ required: true, errorMessage: '年级项必填', trigger: 'blur' }]" name="level">
						<uni-easyinput v-model="baseFormData2.level" placeholder="请输入年级" />
					</uni-forms-item>
					<uni-forms-item label="邮箱" :rules="[{ required: true, errorMessage: '邮箱项必填', trigger: 'blur' }]" name="email">
						<uni-easyinput v-model="baseFormData2.email" placeholder="请输入邮箱" />
					</uni-forms-item>
				</uni-forms>
			</view>
		</uni-section>

		<!-- <uni-section title="队伍人员信息" type="line">
			<view class="example">
				<view class="segmented-control">
					<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem"
						styleType="button">
					</uni-segmented-control>
				</view>
				<uni-forms ref="baseForm" :modelValue="alignmentFormData" :label-position="alignment">
					<uni-forms-item label="队员1姓名" required>
						<uni-easyinput v-model="baseFormData.name" placeholder="请输入队员姓名" />
					</uni-forms-item>
					<uni-forms-item label="队员1工号" required>
						<uni-easyinput v-model="baseFormData.age" placeholder="请输入队员工号" />
					</uni-forms-item>
				</uni-forms>
			</view>
		</uni-section> -->

		<!-- <uni-section title="队员信息认证" type="line">
			<view class="example">
				<uni-forms ref="valiForm" :rules="rules" :model="valiFormData" labelWidth="80px">
					<uni-forms-item label="队员1姓名" required name="name">
						<uni-easyinput v-model="valiFormData.name" placeholder="请输入队员姓名" />
					</uni-forms-item>
					<uni-forms-item label="队员2工号" required name="age">
						<uni-easyinput v-model="valiFormData.age" placeholder="请输入队员工号" />
					</uni-forms-item>
					<uni-forms-item label="队员介绍">
						<uni-easyinput type="textarea" v-model="valiFormData.introduction" placeholder="请输入队员介绍" />
					</uni-forms-item>
				</uni-forms>
				<button type="primary" @click="submit('valiForm')">提交</button>
			</view>
		</uni-section> -->
<!-- 
		<uni-section title="自定义校验规则" type="line">
			<view class="example">
				<uni-forms ref="customForm" :rules="customRules" labelWidth="80px" :modelValue="customFormData">
					<uni-forms-item label="姓名" required name="name">
						<uni-easyinput v-model="customFormData.name" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="年龄" required name="age">
						<uni-easyinput v-model="customFormData.age" placeholder="请输入年龄" />
					</uni-forms-item>
					<uni-forms-item label="兴趣爱好" required name="hobby">
						<uni-data-checkbox v-model="customFormData.hobby" multiple :localdata="hobbys" />
					</uni-forms-item>
				</uni-forms>
				<button type="primary" @click="submit('customForm')">提交</button>
			</view>
		</uni-section> -->


		<uni-section title="队员信息认证" type="line">
			<view class="example">
				<!-- 动态表单校验 -->
				<uni-forms ref="dynamicForm1" :rules="dynamicRules" :model="dynamicFormData" labelWidth="80px">
					<!-- <uni-forms-item label="邮箱" required name="email">
						<uni-easyinput v-model="dynamicFormData.email" placeholder="请输入姓名" />
					</uni-forms-item> -->
					<!-- <uni-forms-item v-for="(item,index) in dynamicFormData.domains" :key="index"
						:label="'队员'+' '+index" required :rules="dynamicRules" :name="['domains',index,'value']"> -->

				
					<uni-forms ref="dynamicForm2" v-for="(item,index) in dynamicFormData2.domains" :key="index" :model="dynamicFormData2.domains[index]" labelWidth="80px">
						<view class="dynamic">
							<view>
								队员 {{ index+1 }}
							</view>
						</view>
						<uni-forms-item :rules="[{ required: true, errorMessage: '队员学号项必填', trigger: 'blur' }]"
						:label="'学号'+' '" name="id">
							<view class="form-item">
								<uni-easyinput v-model="dynamicFormData2.domains[index].id" placeholder="请输入队员学号"/>
							</view>
						</uni-forms-item>
						<uni-forms-item v-model="dynamicFormData2.domains[index].name" :rules="[{ required: true, errorMessage: '队员姓名项必填', trigger: 'blur' }]"
						:label="'姓名'+' '" name="name">
							<view class="form-item">
								<uni-easyinput v-model="dynamicFormData2.domains[index].name" placeholder="请输入队员姓名"/>
							</view>
						</uni-forms-item>
						<uni-forms-item v-model="dynamicFormData2.domains[index].major" :rules="[{ required: true, errorMessage: '队员所属院系项必填', trigger: 'blur' }]"
						:label="'所属院系'+' '" name="major">
							<view class="form-item">
								<uni-easyinput v-model="dynamicFormData2.domains[index].major" placeholder="请输入队员所属院系"/>
							</view>
						</uni-forms-item>
						<uni-forms-item v-model="dynamicFormData2.domains[index].grade" :rules="[{ required: true, errorMessage: '队员所属年级项必填', trigger: 'blur' }]"
						:label="'所属年级'+' '" name="grade">
							<view class="form-item">
								<uni-easyinput v-model="dynamicFormData2.domains[index].grade" placeholder="请输入队员所属年级"/>
							</view>
						</uni-forms-item>
						<uni-forms-item v-model="dynamicFormData2.domains[index].tel" :rules="[{ required: true, errorMessage: '队员联系电话项必填', trigger: 'blur' }]"
						:label="'联系电话'+' '" name="tel">
							<view class="form-item">
								<uni-easyinput v-model="dynamicFormData2.domains[index].tel" placeholder="请输入队员联系电话"/>
							</view>
						</uni-forms-item>
						<uni-forms-item v-model="dynamicFormData2.domains[index].email" :rules="[{ required: true, errorMessage: '队员邮箱项必填', trigger: 'blur' }]"
						:label="'邮箱'+' '" name="email">
							<view class="form-item">
								<uni-easyinput v-model="dynamicFormData2.domains[index].email" placeholder="请输入队员邮箱"/>
							</view>
						</uni-forms-item>

						<view class="button-del">
							<button class="button" size="mini" type="default" @click="del(index, item.id)">删除</button>
						</view>
					<!-- </uni-forms-item> -->
					</uni-forms>

				</uni-forms>
				<view class="button-group">
					<button type="primary" size="mini" @click="add">新增队员</button>
					<!-- <button type="primary" size="mini" @click="submit('dynamicForm')">提交</button> -->
					<button type="primary" size="mini" @click="submit('dynamicForm2')">提交</button>
				</view>
			</view>
		</uni-section>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				// 基础表单数据
				baseFormData: {
					id:"",
					name:"",
					major:"",
					tel:""
				},
				baseFormData2: {
					id:"",
					name:"",
					major:"",
					level:"",
					tel:"",
					email:"",
					team_id:""   //之后再改
				}, //队长信息



				// 城市数据
				cityData: [{
					text: "北京",
					value: "10001",
				}, {
					text: "上海",
					value: "10002",
				}, {
					text: "深圳",
					value: "10004",
				}],
				skillsRange: [{
						value: 0,
						text: "编程"
					},
					{
						value: 1,
						text: "绘画"
					},
					{
						value: 2,
						text: "运动"
					},
				],
				// 表单数据
				alignmentFormData: {
					name: '',
					age: '',
				},
				// 单选数据源
				sexs: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}, {
					text: '保密',
					value: 2
				}],
				// 多选数据源
				hobbys: [{
					text: '跑步',
					value: 0
				}, {
					text: '游泳',
					value: 1
				}, {
					text: '绘画',
					value: 2
				}, {
					text: '足球',
					value: 3
				}, {
					text: '篮球',
					value: 4
				}, {
					text: '其他',
					value: 5
				}],
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

				dynamicFormData2: {   //测试写死表单项
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
				// addinput : [
				// {
				// 	label: '学号',
				// 	value: '',
				// 	rules: [{
				// 		'required': true,
				// 		errorMessage: '队员学号项必填'
				// 	}],
				// 	holder: '请输入队员学号',
				// 	id: Math.floor(Math.random() * Date.now())
				// },
				// {
				// 	label: '姓名',
				// 	value: '',
				// 	rules: [{
				// 		'required': false,
				// 		errorMessage: '队员姓名项必填'
				// 	},
				// 	{
				// 	validator: (rule, value, callback) => {
				// 		if (!value) {
				// 		callback(new Error('队员姓名不能为空'));
				// 		} else {
				// 		callback();
				// 		}
				// 	},
				// 	trigger: 'blur'
				// 	}],
				// 	holder: '请输入队员姓名',
				// 	id: Math.floor(Math.random() * Date.now())
				// },
				// {
				// 	label: '所属院系',
				// 	value: '',
				// 	rules: [{
				// 		'required': true,
				// 		errorMessage: '队员所属院系项必填'
				// 	}],
				// 	holder: '请输入队员所属院系',
				// 	id: Math.floor(Math.random() * Date.now())
				// },
				// {
				// 	label: '所属年级',
				// 	value: '',
				// 	rules: [{
				// 		'required': true,
				// 		errorMessage: '队员所属年级项必填'
				// 	}],
				// 	holder: '请输入队员所属年级',
				// 	id: Math.floor(Math.random() * Date.now())
				// },
				// {
				// 	label: '联系电话',
				// 	value: '',
				// 	rules: [{
				// 		'required': true,
				// 		errorMessage: '队员联系电话项必填'
				// 	}],
				// 	holder: '请输入队员联系电话',
				// 	id: Math.floor(Math.random() * Date.now())
				// },
				// {
				// 	label: '邮箱',
				// 	value: '',
				// 	rules: [{
				// 		'required': true,
				// 		errorMessage: '队员邮箱项必填'
				// 	}],
				// 	holder: '请输入队员邮箱',
				// 	id: Math.floor(Math.random() * Date.now())
				// },
				// ]
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
		computed: {
			...mapState(['hasLogin', 'forcedLogin','user_id','userInfo'])

		},
		methods: {
			...mapMutations(['setStatu']),
			onClickItem(e) {
				console.log(e);
				this.current = e.currentIndex
			},

			add() {
				// this.dynamicFormData.domains.push({
				// 	label: '队员',
				// 	value: '',
				// 	rules: [{
				// 		'required': true,
				// 		errorMessage: '队员工号项必填'
				// 	}],
				// 	id: Date.now()
				// })

				// const addinput = [
				// {
				// 	label: '学号',
				// 	value: '',
				// 	rules: [{
				// 		'required': true,
				// 		errorMessage: '队员学号项必填'
				// 	}],
				// 	holder: '请输入队员学号',
				// 	id: Math.floor(Math.random() * Date.now())
				// },
				// {
				// 	label: '姓名',
				// 	value: '',
				// 	rules: [
				// 	// {
				// 	// 	'required': false,
				// 	// 	errorMessage: '队员姓名项必填'
				// 	// },
				// 	{
				// 	validator: (rule, value, callback) => {
				// 		if (value.trim() === '') {
				// 		callback(new Error('队员姓名不能为空'));
				// 		} else {
				// 		callback();
				// 		}
				// 	},
				// 	trigger: 'blur'
				// 	}],
				// 	holder: '请输入队员姓名',
				// 	id: Math.floor(Math.random() * Date.now())
				// },
				// {
				// 	label: '所属院系',
				// 	value: '',
				// 	rules: [{
				// 		'required': true,
				// 		errorMessage: '队员所属院系项必填'
				// 	}],
				// 	holder: '请输入队员所属院系',
				// 	id: Math.floor(Math.random() * Date.now())
				// },
				// {
				// 	label: '所属年级',
				// 	value: '',
				// 	rules: [{
				// 		'required': true,
				// 		errorMessage: '队员所属年级项必填'
				// 	}],
				// 	holder: '请输入队员所属年级',
				// 	id: Math.floor(Math.random() * Date.now())
				// },
				// {
				// 	label: '联系电话',
				// 	value: '',
				// 	rules: [{
				// 		'required': true,
				// 		errorMessage: '队员联系电话项必填'
				// 	}],
				// 	holder: '请输入队员联系电话',
				// 	id: Math.floor(Math.random() * Date.now())
				// },
				// {
				// 	label: '邮箱',
				// 	value: '',
				// 	rules: [{
				// 		'required': true,
				// 		errorMessage: '队员邮箱项必填'
				// 	}],
				// 	holder: '请输入队员邮箱',
				// 	id: Math.floor(Math.random() * Date.now())
				// },
				// ]

				const addinput = {
					id: '',
					name: '',
					major: '',
					grade:'',
					tel:'',
					email:'',
					
				}
				addinput['team_id'] = this.user_id,
				//不要放到data里是因为需要深度复制很麻烦
				this.dynamicFormData2.domains.push(
					addinput
				)
			},
			del(i, id) {
				// let index = this.dynamicLists.findIndex(v => v.id === id)
				this.dynamicFormData2.domains.splice(i, 1)
				// console.log(this.dynamicFormData.domains)
			},
			submit(ref) {
				let instr_flag = true
				let dyna_flag = true
				let leader_flag = true
				//校验动态表单逻辑
				const ar = this.$refs[ref]
				if(ar){
					for (let i = 0; i < ar.length; i++) {
						ar[i].validate().then(res => {
					}).catch(err => {
						dyna_flag = false
						console.log('err', err);
					})
					}
				}


				//校验负责人信息
				this.$refs['baseForm'].validate().then(res => {
					// console.log('校验负责人-success', res);
				}).catch(err => {
					instr_flag = false
				})

				//队长信息
				this.$refs['baseForm2'].validate().then(res => {
				}).catch(err => {
					leader_flag = false
					console.log('err', err);
				})

				setTimeout(
					() => {
					if(instr_flag && dyna_flag && leader_flag){
						// uni.showToast({
						// 	title: `校验通过`
						// })
						console.log('校验通过')
						uni.request({
							header: {
									'Content-Type': 'application/json', 
									Authorization:uni.getStorageSync("token")
								}, 
							url: this.$url.BASE_URL + '/schoolteam/authentification',
							method: 'POST',
								data: {
									id:this.user_id,
									status:this.userInfo.verification_status,
									instructor:{
										id: this.baseFormData.id,
										name:this.baseFormData.name,
										tel:this.baseFormData.tel,
										major:this.baseFormData.major,
										email:this.baseFormData.email
									},
									leader:{
										name:this.baseFormData2.name,
										tel:this.baseFormData2.tel,
										major:this.baseFormData2.major,
										grade:this.baseFormData2.level,
										email:this.baseFormData2.email,
										team_id:this.user_id
									},
									members:this.dynamicFormData2.domains									
			
									
								},
							dataType:'json',
							success: (res) => {
									if(res.data.code == 200){
										uni.showToast({
											title: '已提交审核',
											icon: 'none',
											duration: 2000
										});
										let s = res.data.status
										this.setStatu({s})
									}else if(res.data.code == 401){
										console.log("token过期");
										uni.showModal({
										title: '',
										content: '登录已过期。是否前去登录？',
										success: function(res) {
										if (res.confirm) {
											// 用户点击了确定
											uni.reLaunch({
												url: '../../../pages/login/login',
											})
										} else if (res.cancel) {
											uni.navigateBack()
											return;							
										}
										}
									});
									}
								},
								fail: res => {
									console.log("post-fail")
									this.net_error = true;
								}, 
							}); 
						}
				}, 200);
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
	.dynamic{
		display: flex; 
		justify-content: center; 
		align-items: center; 
		width: 60px; 
		height: 1.5rem; 
		border-radius: 10px; 
		color: grey;
		// margin-bottom: 5px
		margin: 15rpx auto 15rpx auto
	}
</style>