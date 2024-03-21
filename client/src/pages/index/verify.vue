<!-- 高校 认证信息 -->
<!-- <template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '高校 -- 认证信息'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script> -->

<template>
	<view class="container">
		<!-- <uni-card :is-shadow="false" is-full>
			<text class="uni-h6">uni-forms 组件</text>
		</uni-card> -->
		<uni-section title="所属院校信息认证" type="line">
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="baseForm" :model="baseFormData" labelWidth="80px">
					<uni-forms-item label="所属高校" required>
						<uni-easyinput v-model="baseFormData.name" placeholder="请输入所属高校" />
					</uni-forms-item>
					<uni-forms-item label="所属学院" required>
						<uni-easyinput v-model="baseFormData.age" placeholder="请输入所属学院" />
					</uni-forms-item>
					<uni-forms-item label="负责人姓名" required>
						<uni-easyinput v-model="baseFormData.name" placeholder="请输入队伍负责人姓名" />
					</uni-forms-item>
					<uni-forms-item label="负责人联系电话" required>
						<uni-easyinput v-model="baseFormData.name" placeholder="请输入负责人联系电话" />
					</uni-forms-item>
					<uni-forms-item label="负责人邮箱" required>
						<uni-easyinput v-model="baseFormData.name" placeholder="请输入负责人邮箱" />
					</uni-forms-item>
					<uni-forms-item label="负责人工号" required>
						<uni-easyinput v-model="baseFormData.name" placeholder="请输入队伍负责人工号" />
					</uni-forms-item>
					<!-- <uni-forms-item label="性别" required>
						<uni-data-checkbox v-model="baseFormData.sex" :localdata="sexs" />
					</uni-forms-item> -->
					<!-- <uni-forms-item label="兴趣爱好" required>
						<uni-data-checkbox v-model="baseFormData.hobby" multiple :localdata="hobbys" />
					</uni-forms-item> -->
					<uni-forms-item label="队伍介绍">
						<uni-easyinput type="textarea" v-model="baseFormData.introduction" placeholder="请输入队伍介绍" />
					</uni-forms-item>
					<!-- <uni-forms-item label="日期时间">
						<uni-datetime-picker type="datetime" return-type="timestamp"
							v-model="baseFormData.datetimesingle" />
					</uni-forms-item> -->
					<uni-forms-item label="选择队伍所在城市">
						<uni-data-picker v-model="baseFormData.city" :localdata="cityData" popup-title="选择队伍所在城市">
						</uni-data-picker>
					</uni-forms-item>

					<!-- <uni-forms-item label="选择队伍人数">
						<uni-data-select v-model="baseFormData.skills" :localdata="skillsRange" >
						</uni-data-select>
					</uni-forms-item> -->
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


		<uni-section title="队员(除负责人外)信息认证" type="line">
			<view class="example">
				<!-- 动态表单校验 -->
				<uni-forms ref="dynamicForm" :rules="dynamicRules" :model="dynamicFormData" labelWidth="80px">
					<!-- <uni-forms-item label="邮箱" required name="email">
						<uni-easyinput v-model="dynamicFormData.email" placeholder="请输入姓名" />
					</uni-forms-item> -->
					<uni-forms-item v-for="(item,index) in dynamicFormData.domains" :key="item.id"
						:label="item.label+' '+index" required :rules="item.rules" :name="['domains',index,'value']">
						<view class="form-item">
							<uni-easyinput v-model="dynamicFormData.domains[index].value" placeholder="请输入队员工号" />
							<button class="button" size="mini" type="default" @click="del(item.id)">删除</button>
						</view>
					</uni-forms-item>
				</uni-forms>
				<view class="button-group">
					<button type="primary" size="mini" @click="add">新增队员</button>
					<button type="primary" size="mini" @click="submit('dynamicForm')">提交</button>
				</view>
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
					age: '',
					introduction: '',
					sex: 2,
					hobby: [5],
					datetimesingle: 1627529992399,
					city: '',
					skills: 0
				},
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
				}
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
			add() {
				this.dynamicFormData.domains.push({
					label: '队员',
					value: '',
					rules: [{
						'required': true,
						errorMessage: '队员工号项必填'
					}],
					id: Date.now()
				})
			},
			del(id) {
				let index = this.dynamicLists.findIndex(v => v.id === id)
				this.dynamicLists.splice(index, 1)
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

	.button-group{
		display: flex;
  		flex-direction: column;
  		align-items: center;
	}
	.button-group button {
  		margin-bottom: 15px; 
	}
</style>