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
		userName: "",
		userInfo: {
			verification_status: 0,
		}
	},
	mutations: {
		login(state, {user_id, verification_status, user_name}) {
			// console.log(userName, verification_status)
			state.user_id = user_id      // user_id根据情况可能是社区的id，高校的id...
			state.userName = user_name || '新用户';
			state.hasLogin = true;
			state.userInfo.verification_status = verification_status;
		},
		logout(state) {
			state.user_id = "";
			state.userName = "";
			state.userInfo = {};
			state.hasLogin = false;
		}
	}
})

export default store
