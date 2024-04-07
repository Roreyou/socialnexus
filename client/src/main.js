/*
 * @Author: 19875196595 2458190458@qq.com
 * @Date: 2024-03-18 20:25:27
 * @LastEditors: 19875196595 2458190458@qq.com
 * @LastEditTime: 2024-03-18 23:22:51
 * @FilePath: \socialnexus\client\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'

// main.js
import uView from "uview-ui";

import store from './store'

import App from './App'
import './uni.promisify.adaptor'
//url全局挂载
import BASE_URL from './utils/api.js'
Vue.prototype.$url = BASE_URL

Vue.use(uView);

Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})

app.$mount()
