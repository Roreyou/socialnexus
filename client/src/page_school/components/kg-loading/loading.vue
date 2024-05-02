<template>
	<view class="warp">
		<view class="wrapper">
			<view class="rainbow">
				<view class="arc red"></view>
				<view class="arc orange"></view>
				<view class="arc yellow"></view>
				<view class="arc green"></view>
				<view class="arc blue"></view>
				<view class="arc violet"></view>
				<view class="arc purple"></view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.warp {
		background: #d6a800;
		bottom: 0;
		left: 0;
		overflow: hidden;
		position: fixed;
		right: 0;
		top: 0;
		z-index: 977;
	}

	.wrapper {
		border-bottom: solid 2px #ffcc01;
		height: 100px;
		left: 50%;
		overflow: hidden;
		position: fixed;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 300px;
	}

	.wrapper .rainbow {
		animation: spin 2s ease-in-out infinite;
		height: 200px;
		margin: 0 auto;
		position: relative;
		width: 200px;
	}

	.wrapper .rainbow:after {
		background-color: #d6a800;
		bottom: 100px;
		content: "";
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
	}

	.wrapper .rainbow .arc {
		border: solid 8px;
		border-radius: 50%;
		bottom: 0;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
	}

	.wrapper .rainbow .arc.red {
		border-color: red;
	}

	.wrapper .rainbow .arc.orange {
		border-color: orange;
		margin: 8px;
	}

	.wrapper .rainbow .arc.yellow {
		border-color: yellow;
		margin: 16px;
	}

	.wrapper .rainbow .arc.green {
		border-color: yellowgreen;
		margin: 24px;
	}

	.wrapper .rainbow .arc.blue {
		border-color: skyblue;
		margin: 32px;
	}

	.wrapper .rainbow .arc.violet {
		border-color: violet;
		margin: 40px;
	}

	.wrapper .rainbow .arc.purple {
		border-color: mediumpurple;
		margin: 48px;
	}

	@keyframes spin {
		0% {
			transform: rotate(0);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>
