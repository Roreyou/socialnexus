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
		userName: "",
		userInfo: {
			verification_status: 0,
		}
	},
	mutations: {
		login(state, {userName, verification_status}) {
			// console.log(userName, verification_status)
			state.userName = userName || '新用户';
			state.hasLogin = true;
			state.userInfo.verification_status = verification_status;
		},
		logout(state) {
			state.userName = "";
			state.userInfo = {};
			state.hasLogin = false;
		}
	}
})

export default store
