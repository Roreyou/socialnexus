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
					<uni-forms-item label="工号" :rules="[{ required: true, errorMessage: '工号项必填', trigger: 'blur' }]" name="netid">
						<uni-easyinput v-model="baseFormData.netid" placeholder="请输入指导老师工号" />
					</uni-forms-item>
					<!-- <uni-forms-item label="性别" required>
						<uni-data-checkbox v-model="baseFormData.sex" :localdata="sexs" />
					</uni-forms-item> -->
					<!-- <uni-forms-item label="兴趣爱好" required>
						<uni-data-checkbox v-model="baseFormData.hobby" multiple :localdata="hobbys" />
					</uni-forms-item> -->
					<!-- <uni-forms-item label="队伍介绍">
						<uni-easyinput type="textarea" v-model="baseFormData.introduction" placeholder="请输入队伍介绍" />
					</uni-forms-item> -->
					<!-- <uni-forms-item label="日期时间">
						<uni-datetime-picker type="datetime" return-type="timestamp"
							v-model="baseFormData.datetimesingle" />
					</uni-forms-item> -->
					<!-- <uni-forms-item label="选择队伍所在城市">
						<uni-data-picker v-model="baseFormData.city" :localdata="cityData" popup-title="选择队伍所在城市">
						</uni-data-picker>
					</uni-forms-item> -->

					<!-- <uni-forms-item label="选择队伍人数">
						<uni-data-select v-model="baseFormData.skills" :localdata="skillsRange" >
						</uni-data-select>
					</uni-forms-item> -->
				</uni-forms>
			</view>
		</uni-section>

		<uni-section title="学生队长信息认证" type="line">
			<view class="example">
				<uni-forms ref="baseForm2" :model="baseFormData2" labelWidth="80px">
					<uni-forms-item label="姓名" :rules="[{ required: true, errorMessage: '姓名项必填', trigger: 'blur' }]" name="name">
						<uni-easyinput v-model="baseFormData2.name" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="学号" :rules="[{ required: true, errorMessage: '学号项必填', trigger: 'blur' }]" name="netid">
						<uni-easyinput v-model="baseFormData2.netid" placeholder="请输入学号" disabled="true" />
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
						:label="'学号'+' '" name="netid">
							<view class="form-item">
								<uni-easyinput v-model="dynamicFormData2.domains[index].netid" placeholder="请输入队员学号"/>
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
						<uni-forms-item v-model="dynamicFormData2.domains[index].level" :rules="[{ required: true, errorMessage: '队员所属年级项必填', trigger: 'blur' }]"
						:label="'所属年级'+' '" name="level">
							<view class="form-item">
								<uni-easyinput v-model="dynamicFormData2.domains[index].level" placeholder="请输入队员所属年级"/>
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
				}, //队长信息
				//机场数据
				'list': [{
		'letter': 'A',
		'data': [
			'阿克苏机场',
			'阿拉山口机场',
			'阿勒泰机场',
			'阿里昆莎机场',
			'安庆天柱山机场',
			'澳门国际机场'
		]
	}, {
		'letter': 'B',
		'data': [
			'保山机场',
			'包头机场',
			'北海福成机场',
			'北京南苑机场',
			'北京首都国际机场'
		]
	}, {
		'letter': 'C',
		'data': [
			'长白山机场',
			'长春龙嘉国际机场',
			'常德桃花源机场',
			'昌都邦达机场',
			'长沙黄花国际机场',
			'长治王村机场',
			'常州奔牛机场',
			'成都双流国际机场',
			'赤峰机场'
		]
	}, {
		'letter': 'D',
		'data': [
			'大理机场',
			'大连周水子国际机场',
			'大庆萨尔图机场',
			'大同东王庄机场',
			'达州河市机场',
			'丹东浪头机场',
			'德宏芒市机场',
			'迪庆香格里拉机场',
			'东营机场',
			'敦煌机场'
		]
	}, {
		'letter': 'E',
		'data': [
			'鄂尔多斯机场',
			'恩施许家坪机场',
			'二连浩特赛乌苏国际机场'
		]
	}, {
		'letter': 'F',
		'data': [
			'阜阳西关机场',
			'福州长乐国际机场'
		]
	}, {
		'letter': 'G',
		'data': [
			'赣州黄金机场',
			'格尔木机场',
			'固原六盘山机场',
			'广元盘龙机场',
			'广州白云国际机场',
			'桂林两江国际机场',
			'贵阳龙洞堡国际机场'
		]
	}, {
		'letter': 'H',
		'data': [
			'哈尔滨太平国际机场',
			'哈密机场',
			'海口美兰国际机场',
			'海拉尔东山国际机场',
			'邯郸机场',
			'汉中机场',
			'杭州萧山国际机场',
			'合肥骆岗国际机场',
			'和田机场',
			'黑河机场',
			'呼和浩特白塔国际机场',
			'淮安涟水机场',
			'黄山屯溪国际机场'
		]
	}, {
		'letter': 'I',
		'data': []
	}, {
		'letter': 'J',
		'data': [
			'济南遥墙国际机场',
			'济宁曲阜机场',
			'鸡西兴凯湖机场',
			'佳木斯东郊机场',
			'嘉峪关机场',
			'锦州小岭子机场',
			'景德镇机场',
			'井冈山机场',
			'九江庐山机场',
			'九寨黄龙机场'
		]
	}, {
		'letter': 'K',
		'data': [
			'喀什机场',
			'克拉玛依机场',
			'库车龟兹机场',
			'库尔勒机场',
			'昆明巫家坝国际机场'
		]
	}, {
		'letter': 'L',
		'data': [
			'拉萨贡嘎机场',
			'兰州中川机场',
			'丽江三义机场',
			'黎平机场',
			'连云港白塔埠机场',
			'临沧机场',
			'临沂机场',
			'林芝米林机场',
			'柳州白莲机场',
			'龙岩冠豸山机场',
			'泸州蓝田机场',
			'洛阳北郊机场'
		]
	}, {
		'letter': 'M',
		'data': [
			'满洲里西郊机场',
			'绵阳南郊机场',
			'漠河古莲机场',
			'牡丹江海浪机场'
		]
	}, {
		'letter': 'N',
		'data': [
			'南昌昌北国际机场',
			'南充高坪机场',
			'南京禄口国际机场',
			'南宁吴圩机场',
			'南通兴东机场',
			'南阳姜营机场',
			'宁波栎社国际机场'
		]
	}, {
		'letter': 'O',
		'data': []
	}, {
		'letter': 'P',
		'data': [
			'普洱思茅机场'
		]
	}, {
		'letter': 'Q',
		'data': [
			'齐齐哈尔三家子机场',
			'秦皇岛山海关机场',
			'青岛流亭国际机场',
			'衢州机场',
			'泉州晋江机场'
		]
	}, {
		'letter': 'R',
		'data': [
			'日喀则和平机场'
		]
	}, {
		'letter': 'S',
		'data': [
			'三亚凤凰国际机场',
			'汕头外砂机场',
			'上海虹桥国际机场',
			'上海浦东国际机场',
			'深圳宝安国际机场',
			'沈阳桃仙国际机场',
			'石家庄正定国际机场',
			'苏南硕放国际机场'
		]
	}, {
		'letter': 'T',
		'data': [
			'塔城机场',
			'太原武宿国际机场',
			'台州路桥机场 (黄岩机场)',
			'唐山三女河机场',
			'腾冲驼峰机场',
			'天津滨海国际机场',
			'通辽机场',
			'铜仁凤凰机场'
		]
	}, {
		'letter': 'U',
		'data': []
	}, {
		'letter': 'V',
		'data': []
	}, {
		'letter': 'W',
		'data': [
			'万州五桥机场',
			'潍坊机场',
			'威海大水泊机场',
			'文山普者黑机场',
			'温州永强国际机场',
			'乌海机场',
			'武汉天河国际机场',
			'乌兰浩特机场',
			'乌鲁木齐地窝堡国际机场',
			'武夷山机场',
			'梧州长洲岛机场'
		]
	}, {
		'letter': 'X',
		'data': [
			'西安咸阳国际机场',
			'西昌青山机场',
			'锡林浩特机场',
			'西宁曹家堡机场',
			'西双版纳嘎洒机场',
			'厦门高崎国际机场',
			'香港国际机场',
			'襄阳刘集机场',
			'兴义机场',
			'徐州观音机场'
		]
	}, {
		'letter': 'Y',
		'data': [
			'延安二十里堡机场',
			'盐城机场',
			'延吉朝阳川机场',
			'烟台莱山国际机场',
			'宜宾菜坝机场',
			'宜昌三峡机场',
			'伊春林都机场',
			'伊宁机场',
			'义乌机场',
			'银川河东机场',
			'永州零陵机场',
			'榆林榆阳机场',
			'玉树巴塘机场',
			'运城张孝机场'
		]
	}, {
		'letter': 'Z',
		'data': [
			'湛江机场',
			'昭通机场',
			'郑州新郑国际机场',
			'芷江机场',
			'重庆江北国际机场',
			'中卫香山机场',
			'舟山朱家尖机场',
			'珠海三灶机场'
		]
	}],


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
		computed: {

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
					netid: '',
					name: '',
					major: '',
					level:'',
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
										id: this.baseFormData.netid,
										name:this.baseFormData.name,
										tel:this.baseFormData.tel,
										major:this.baseFormData.major
									},
									leader:{
										id: this.baseFormData2.netid,
										name:this.baseFormData2.name,
										tel:this.baseFormData2.tel,
										major:this.baseFormData2.major,
										grade:this.baseFormData2.level,
										email:this.baseFormData2.email,
									},
									members:this.dynamicFormData2.domains									
			
									
								},
							dataType:'json',
							success: (res) => {
									// var result = JSON.parse(res.data.projectList);
									if(res.data.code == 200){

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