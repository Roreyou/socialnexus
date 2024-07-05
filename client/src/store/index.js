import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user_id: "",
		userName: "游客",

		//高校队伍的其它附加信息
		userInfo: {
			identity: '',  //身份，队长、队员、老师
			person_id: '',  // 高校队伍每个人的个人id
			isUser: false,  //是否是正式用户
			avatar: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.EPIY3c3pIwRgAK_vOVUjngHaHa?rs=1&pid=ImgDetMain',
			verification_status: 5,  //认证状态，5是游客视角的
			isleader: false, // 是否是队长（也就是有全部权限）
			province: '',  //定位
			city: '',
			personName: '', //这个人的姓名
			modification_status: 0, // 资料修改状态。。。1是审核中
		},

		communityInfo:{
			province: '',  //定位
			city: '',
			avatar: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.EPIY3c3pIwRgAK_vOVUjngHaHa?rs=1&pid=ImgDetMain',
			isUser: false,  //是否是正式用户
		},
		forcedLogin: false,
		hasLogin: false,
	},
	mutations: {
		// 团委
		login1(state, {user_id, userName}){
			state.hasLogin = true;
			state.user_id = user_id;
			state.userName = userName;
		},
		// 高校队伍
		login2(state, {user_id, user_name, person_identity, person_id, avatar, verification_status, isleader, personName, modification_status}) {
			// 登录
			state.hasLogin = true;
			state.userInfo.isUser = true;
			// console.log("login-avatar", avatar)
			state.user_id = user_id      // user_id根据情况可能是社区的id，高校的id...
			state.userName = user_name || '新用户';
			state.userInfo.identity = person_identity;
			state.userInfo.person_id = person_id;
			const a = 'https://tse4-mm.cn.bing.net/th/id/OIP-C.8Zujx-NGIfUypDUetU95JwHaHv?w=153&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7';  // 游客的默认头像
			state.userInfo.avatar = avatar || a;
			state.userInfo.verification_status = verification_status;
			state.userInfo.isleader = isleader;
			state.userInfo.personName = personName;
			state.userInfo.modification_status = modification_status;
		},
		// 社区
		login3(state, {user_id, username, avatar}){
			state.hasLogin = true;
			state.user_id = user_id;
			state.userName = username;
			const a = 'https://tse4-mm.cn.bing.net/th/id/OIP-C.8Zujx-NGIfUypDUetU95JwHaHv?w=153&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7';  // 游客的默认头像
			state.communityInfo.avatar = avatar || a;
			state.communityInfo.isUser = true;
		},
		setStatu(state,{verification_status}){
			state.userInfo.verification_status = verification_status;
		},
		setmodificationstatus(state,{modification_status}){
			state.userInfo.modification_status = modification_status;
		},
		setAddress(state, {province, city}) {
			console.log("setAddress", province, city)
			state.userInfo.province = province;
			state.userInfo.city = city;
		},
		setCommunityInfo(state, { userName, avatar }) {
			console.log("setCommunityInfo", userName, avatar)
			state.userName = userName;
			state.communityInfo.avatar = avatar;
		},
		logout(state) {
			// 登出
			state.user_id = "";
			state.userName = "游客";
			state.userInfo = {
				identity:'',
				person_id: '',
				isUser: false,
				avatar: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.EPIY3c3pIwRgAK_vOVUjngHaHa?rs=1&pid=ImgDetMain',
				verification_status: 5,
				isleader: false,
				province: '广东省',
				city: '珠海市',
				personName:'',
				modification_status: 0,
			};
			state.communityInfo = {
				avatar: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.EPIY3c3pIwRgAK_vOVUjngHaHa?rs=1&pid=ImgDetMain',
				isUser: false,
				province: '广东省',
				city: '珠海市',
			}
			state.hasLogin = false;
		}
	}
})

export default store
