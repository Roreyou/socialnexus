import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: true,
		hasLogin: false,
		user_id: "",
		userName: "游客",
		userInfo: {
			isUser: false,  //是否是正式用户(高校队伍)
			avatar: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.EPIY3c3pIwRgAK_vOVUjngHaHa?rs=1&pid=ImgDetMain',
			verification_status: 5,  //游客视角的status
			isleader: false, // 是否是队长（也就是有全部权限
		}
	},
	mutations: {
		login(state, {user_id, verification_status, user_name, avatar, isleader}) {
			state.userInfo.isUser = true;
			// console.log("login-avatar", avatar)
			state.user_id = user_id      // user_id根据情况可能是社区的id，高校的id...
			state.userName = user_name || '新用户';
			state.hasLogin = true;
			state.userInfo.verification_status = verification_status;
			state.userInfo.isleader = isleader;
			const a = 'https://tse4-mm.cn.bing.net/th/id/OIP-C.8Zujx-NGIfUypDUetU95JwHaHv?w=153&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7';  // 默认头像
			state.userInfo.avatar = avatar || a;
		},
		logout(state) {
			state.user_id = "";
			state.userName = "游客";
			state.userInfo = {
				isUser: false,
				avatar: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.EPIY3c3pIwRgAK_vOVUjngHaHa?rs=1&pid=ImgDetMain',
				verification_status: 5,
				isleader: false
			};
			state.hasLogin = false;
		}
	}
})

export default store
