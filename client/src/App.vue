
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<!-- <style>
	/*每个页面公共css */
</style> -->

<style lang="scss">
	// 字体
	@import "static/styles/font.css";
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */

	@import "uview-ui/index.scss";
	@import 'uview-ui/theme.scss';

	/* 头条小程序需要把 iconfont 样式放到组件外 */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "components/m-icon/m-icon.css";

  .tab-bar-active{
	color: #39b54a
  }
</style>