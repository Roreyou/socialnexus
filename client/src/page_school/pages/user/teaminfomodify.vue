<!-- 高校 修改资料 -->
<template>
	<view class="container">
        <uni-section title="队伍基本信息修改" type="line">
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="teamData" :model="teamData" labelWidth="80px">
					<uni-forms-item label="队伍名称" :rules="[{ required: true, errorMessage: '队伍名称项必填', trigger: 'blur' }]" name="team_name">
						<uni-easyinput v-model="teamData.team_name" :placeholder="team_info.team_name" disabled="true" />
					</uni-forms-item>
					<uni-forms-item label="相关院系" :rules="[{ required: true, trigger: 'blur' }]" name="relevant_faculties">
						<uni-easyinput v-model="teamData.relevant_faculties" :placeholder="team_info.relevant_faculties" disabled="true" />
					</uni-forms-item>
					<uni-forms-item label="队伍人数" :rules="[{ required: true, trigger: 'blur' }]" name="mem_num">
						<uni-easyinput v-model="teamData.mem_num" :placeholder="team_info.mem_num" disabled="true" />
					</uni-forms-item>
				</uni-forms>
			</view>
		</uni-section>

		<uni-section title="指导老师信息修改" type="line">
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="instrData" :model="instrData" labelWidth="80px">
					<uni-forms-item label="所属学院" :rules="[{ required: true, errorMessage: '所属学院项必填', trigger: 'blur' }]" name="major">
						<uni-easyinput v-model="instrData.major" :placeholder="instructor_info.major" />
					</uni-forms-item>
					<uni-forms-item label="姓名" :rules="[{ required: true, errorMessage: '姓名项必填', trigger: 'blur' }]" name="name">
						<uni-easyinput v-model="instrData.name" :placeholder="instructor_info.name" />
					</uni-forms-item>
					<uni-forms-item label="联系电话" :rules="[{ required: true, errorMessage: '联系电话项必填', trigger: 'blur' }]" name="tel">
						<uni-easyinput v-model="instrData.tel" :placeholder="instructor_info.tel" />
					</uni-forms-item>
					<uni-forms-item label="工号" :rules="[{ required: true, errorMessage: '工号项必填', trigger: 'blur' }]" name="id">
						<uni-easyinput v-model="instrData.id" :placeholder="instructor_info.id" />
					</uni-forms-item>
				</uni-forms>
			</view>
		</uni-section>

		<uni-section title="学生队长信息修改" type="line">
			<view class="example">
				<uni-forms ref="leaderData" :model="leaderData" labelWidth="80px">
					<uni-forms-item label="姓名" :rules="[{ required: true, errorMessage: '姓名项必填', trigger: 'blur' }]" name="name">
						<uni-easyinput v-model="leaderData.name" :placeholder="leader_info.name" disabled="true" />
					</uni-forms-item>
					<uni-forms-item label="学号" :rules="[{ required: true, errorMessage: '学号项必填', trigger: 'blur' }]" name="id">
						<uni-easyinput v-model="leaderData.id" :placeholder="leader_info.id" disabled="true" />
					</uni-forms-item>
					<uni-forms-item label="所属院系" :rules="[{ required: true, errorMessage: '所属院系项必填', trigger: 'blur' }]" name="major">
						<uni-easyinput v-model="leaderData.major" :placeholder="leader_info.major" disabled="true" />
					</uni-forms-item>
					<uni-forms-item label="年级" :rules="[{ required: true, errorMessage: '年级项必填', trigger: 'blur' }]" name="grade">
						<uni-easyinput v-model="leaderData.grade" :placeholder="leader_info.grade" disabled="true" />
					</uni-forms-item>
					<uni-forms-item label="邮箱" :rules="[{ required: true, errorMessage: '邮箱项必填', trigger: 'blur' }]" name="email">
						<uni-easyinput v-model="leaderData.email" :placeholder="leader_info.email" disabled="true" />
					</uni-forms-item>
				</uni-forms>
			</view>
		</uni-section>
		<uni-section title="队员信息修改" type="line">
			<view class="example">
				<!-- 动态表单校验 -->
				<uni-forms ref="dynamicForm1" :rules="dynamicRules" :model="dynamicFormData" labelWidth="80px">
					<uni-forms ref="dynamicForm2" v-for="(item,index) in dynamicFormData2.domains" :key="index" :model="dynamicFormData2.domains[index]" labelWidth="80px">
						<view class="dynamic">
							<view>
								队员 {{ index+1 }}
							</view>
						</view>
						<uni-forms-item :rules="[{ required: true, errorMessage: '队员学号项必填', trigger: 'blur' }]"
						:label="'学号'+' '" name="id">
							<view class="form-item">
								<uni-easyinput v-model="dynamicFormData2.domains[index].id" :placeholder="dynamicFormData2.domains[index].id"/>
							</view>
						</uni-forms-item>
						<uni-forms-item v-model="dynamicFormData2.domains[index].name" :rules="[{ required: true, errorMessage: '队员姓名项必填', trigger: 'blur' }]"
						:label="'姓名'+' '" name="name">
							<view class="form-item">
								<uni-easyinput v-model="dynamicFormData2.domains[index].name" :placeholder="dynamicFormData2.domains[index].name"/>
							</view>
						</uni-forms-item>
						<uni-forms-item v-model="dynamicFormData2.domains[index].major" :rules="[{ required: true, errorMessage: '队员所属院系项必填', trigger: 'blur' }]"
						:label="'所属院系'+' '" name="major">
							<view class="form-item">
								<uni-easyinput v-model="dynamicFormData2.domains[index].major" :placeholder="dynamicFormData2.domains[index].major"/>
							</view>
						</uni-forms-item>
						<uni-forms-item v-model="dynamicFormData2.domains[index].level" :rules="[{ required: true, errorMessage: '队员所属年级项必填', trigger: 'blur' }]"
						:label="'所属年级'+' '" name="grade">
							<view class="form-item">
								<uni-easyinput v-model="dynamicFormData2.domains[index].grade" :placeholder="dynamicFormData2.domains[index].grade"/>
							</view>
						</uni-forms-item>
						<uni-forms-item v-model="dynamicFormData2.domains[index].tel" :rules="[{ required: true, errorMessage: '队员联系电话项必填', trigger: 'blur' }]"
						:label="'联系电话'+' '" name="tel">
							<view class="form-item">
								<uni-easyinput v-model="dynamicFormData2.domains[index].tel" :placeholder="dynamicFormData2.domains[index].tel"/>
							</view>
						</uni-forms-item>
						<uni-forms-item v-model="dynamicFormData2.domains[index].email" :rules="[{ required: true, errorMessage: '队员邮箱项必填', trigger: 'blur' }]"
						:label="'邮箱'+' '" name="email">
							<view class="form-item">
								<uni-easyinput v-model="dynamicFormData2.domains[index].email" :placeholder="dynamicFormData2.domains[index].email"/>
							</view>
						</uni-forms-item>

						<view class="button-del">
							<button class="button" size="mini" type="default" @click="del(index, item.id)">删除该队员</button>
						</view>
					<!-- </uni-forms-item> -->
					</uni-forms>

				</uni-forms>
				<view class="button-group">
					<button type="primary" size="mini" @click="add">新增队员</button>
					<!-- <button type="primary" size="mini" @click="submit('dynamicForm')">提交</button> -->
					<button type="primary" size="mini" @click="submit('dynamicForm2')">提交修改申请</button>
				</view>
			</view>
		</uni-section>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				// 基础表单数据
				baseFormData: {
					netid:"",
					name:"",
					major:"",
					tel:""
				},
				baseFormData2: {
					netid:"",
					name:"",
					major:"",
					level:"",
					tel:"",
					email:"",
					team_id:""   //之后再改
				}, //队长信
				
				// 自定义表单数据
				customFormData: {
					name: '',
					age: '',
					hobby: []
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

                //初始化显示的数据
                team_info: {
					team_name: '',
					relevant_faculties: '',
					mem_num: '',
				},
                member_info:{},  //队员
                instructor_info:{
					major: '',
					name: '',
					tel: '',
					id: '',
				},  //指导老师
                
				//队长
				leader_info:{
					name: '',
					id: '',
					major: '',
					grade: '',
					email: '',
				},

                //修改后的数据
                teamData: {
					team_name: '',
					relevant_faculties: '',
					mem_num: '',
				},
                instrData:{
					major: '',
					name: '',
					tel: '',
					id: '',
				},
                leaderData:{
					name: '',
					id: '',
					major: '',
					grade: '',
					email: '',
				},
			}
		},
		computed: {

		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin','user_id','userInfo'])
		},
        mounted() {
			uni.request({
					url: this.$url.BASE_URL + '/schoolteam/getteamInfo',
					header:{
							Authorization:uni.getStorageSync("token")
						},
					method: 'GET',
					data: {
						team_id: this.user_id,
						// token: this.$userinfo.token
						// activity_status: this.index
					},
					success: res => {
						if(res.data.code == 200){
							//队伍信息
							this.team_info = res.data.data.team_info;			
							this.teamData = res.data.data.team_info;		
							//队员信息
							this.member_info = res.data.data.member_info;						
							this.dynamicFormData2.domains = this.member_info;
							//老师信息
							this.instructor_info = res.data.data.instructor_info;		
							this.instrData = res.data.data.instructor_info;		
							//队长
							this.leader_info = res.data.data.leader_info;
							this.leaderData = res.data.data.leader_info;
							this.net_error = false;
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
						this.net_error = true;
					},
					complete: () => {
					}
				})
    	},
		methods: {
			...mapMutations(['setmodificationstatus']),
			onClickItem(e) {
				console.log(e);
				this.current = e.currentIndex
			},

			add() {
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
				let team_flag = true
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
				this.$refs['instrData'].validate().then(res => {
					// console.log('校验负责人-success', res);
				}).catch(err => {
					instr_flag = false
				})

				//队长信息
				this.$refs['leaderData'].validate().then(res => {
				}).catch(err => {
					leader_flag = false
					console.log('err', err);
				})

				//队伍信息
				this.$refs['teamData'].validate().then(res => {
				}).catch(err => {
					team_flag = false
					console.log('err', err);
				})

				setTimeout(
					() => {
					if(instr_flag && dyna_flag && leader_flag && team_flag){
						uni.showToast({
							title: `校验通过`
						})
						uni.request({
							header: {
									'Content-Type': 'application/json', 
									Authorization:uni.getStorageSync("token")
								}, 
							url: this.$url.BASE_URL + '/schoolteam/modifyinfo',
							method: 'POST',
								data: {
									id:this.user_id,
									// status:this.userInfo.verification_status,
									// teamData: this.teamData,
									instrData: this.instrData,
									leaderData: this.leaderData,	
									membersData: this.dynamicFormData2.domains,									
									
								},
							dataType:'json',
							success: (res) => {
									// var result = JSON.parse(res.data.projectList);
									if(res.data.code == 200){
										uni.showToast({
											title: `成功提交申请！`
										})
										let s = 1
										this.setmodificationstatus({s})
									}else if(res.data.code == 401){
										console.log("token过期");
										uni.showModal({
										title: '',
										content: '修改失败，登录已过期。是否前去登录？',
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
									setTimeout(() => {
										uni.navigateBack();
									}, 500);

								},
								fail: res => {
									console.log("post-fail")
									this.net_error = true;
								}, 
							}); 
						}
				}, 200);
				//提交表单

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