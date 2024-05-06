<template>
	<view class="content">
		<canvas class="myCanvas" :style="{width,height}"  canvas-id="myCanvas"></canvas>
	</view>
</template>

<script>
	import { createPoster,loadImage } from "@/page_school/utils/poster.js";
	export default {
		data() {
			return {
				width: '100%',
				height:'2500px',
				drawData:[{
					type:'text',
					config:{
						x:200,
						y:40,
						text:'图片',
					}
				},{
					type:'image',
					config:{
						x:100,
						y:80,
						w:192,
						h:120,
						url:'/static/5b0cf1e640f29.jpg'
					}
				},{
					type:'text',
					config:{
						x:200,
						y:240,
						text:'文字',
					}
				},{
					type:'text',
					config:{
						x:200,
						y:280,
						text:'新年快乐',
						font:'normal bold 16px 仿宋',
						color:'#F40'
					}
				},{
					type:'text',
					config:{
						x:200,
						y:320,
						text:'圆',
					}
				},{
					type:'arc',
					config:{
						x:200,
						y:400,
						r:50,
						sAngle:0,
						eAngle:2 * Math.PI,
						fillStyle:'#b8e994',
						lineWidth:2,
						strokeStyle:'#f6b93b'
					}
				},{
					type:'text',
					config:{
						x:200,
						y:480,
						text:'矩形',
					}
				},{
					type:'rect',
					config:{
						x:130,
						y:500,
						w:150,
						h:75,
						fillStyle:'#b8e994',
						lineWidth:2,
						strokeStyle:'#f6b93b'
					}
				},{
					type:'text',
					config:{
						x:200,
						y:610,
						text:'非填充矩形',
					}
				},
				{
					type:'stroke_rect',
					config:{
						x:130,
						y:640,
						w:150,
						h:75,
						lineWidth:4,
						strokeStyle:'#f6b93b'
					}
				},{
					type:'text',
					config:{
						x:200,
						y:760,
						text:'直线',
					}
				},
				{
					type:'line',
					config:{
						path:[{
							points:[{
								type:'moveTo',
								point:[130,780]
							},{
								type:'lineTo',
								point:[280,780]
							}],
							lineJoin:'round',
							lineCap:'round',
							lineWidth:3,
							strokeStyle:'red'
						}],
					}
				},{
					type:'text',
					config:{
						x:200,
						y:820,
						text:'多直线的连接',
					}
				},
				{
					type:'line',
					config:{
						path:[{
							// 可以简写成一个二位数组
							points:[[130,840],[280,840],[280,890],[260,870]],
							lineJoin:'round',
							lineCap:'round',
							lineWidth:3,
							strokeStyle:'red'
						},{
							//每个 points 就是一个线的开的和结束，每个 point 代表直线的点时也可以不写 type
							points:[{
								point:[130,920]
							},{
								point:[160,890]
							},{
								point:[190,980]
							},{
								point:[220,920]
							}],
							lineJoin:'round',
							lineCap:'round',
							lineWidth:3,
							strokeStyle:'red'
						}],
					}
				},{
					type:'text',
					config:{
						x:200,
						y:1020,
						text:'曲线',
					}
				},{
					type:'line',
					config:{
						path:[{
							points:[{
								type:'moveTo',
								point:[130,1040]
							},{
								type:'bezierCurveTo',
								point:[260,1040],
								P1:[195,1100],
							}],
							lineWidth:3,
							strokeStyle:'red'
						},{
							points:[{
								type:'moveTo',
								point:[130,1120]
							},{
								type:'bezierCurveTo',
								point:[260,1120],
								P1:[175,1020],
								P2:[215,1220],
							}],
							lineWidth:3,
							strokeStyle:'blue'
						}]
					}
				},{
					type:'text',
					config:{
						x:200,
						y:1220,
						text:'多曲线连接',
					}
				},
				{
					type:'line',
					config:{
						path:[{
							points:[{
								type:'moveTo',
								point:[30,1300]
							},{
								type:'bezierCurveTo',
								point:[160,1300],
								P1:[70,1340],
								P2:[105,1260],
							},{
								type:'bezierCurveTo',
								point:[260,1300],
								P1:[190,1320],
								P2:[215,1260],
							},{
								type:'bezierCurveTo',
								point:[220,1400],
								P1:[330,1380],
								P2:[185,1280],
							}],
							lineWidth:3,
						}]
					}
				},{
					type:'text',
					config:{
						x:200,
						y:1440,
						text:'直线与曲线连接',
					}
				},{
					type:'line',
					config:{
						path:[{
							points:[{
								type:'moveTo',
								point:[120,1480]
							},{
								type:'lineTo',
								point:[180,1480]
							},{
								type:'bezierCurveTo',
								point:[180,1600],
								P1:[200,1520],
								P2:[140,1580],
							},{
								type:'bezierCurveTo',
								point:[200,1580],
								P1:[200,1520],
								P2:[140,1580]
							},{
								type:'lineTo',
								point:[240,1580],
							}],
							lineWidth:3,
							strokeStyle:'red'
						}],
					}
				},{
					type:'text',
					config:{
						x:200,
						y:1640,
						text:'非填充圆角矩形',
					}
				},{
					type:'stroke_round_rect',
					config:{
						x:130,
						y:1650,
						w:150,
						h:75,
						r:8,
						lineWidth:4,
						strokeStyle:'#f6b93b'
					}
				},{
					type:'text',
					config:{
						x:200,
						y:1780,
						text:'填充圆角矩形',
					}
				},{
					type:'round_rect',
					config:{
						x:130,
						y:1800,
						w:150,
						h:75,
						r:4,
						fillStyle:'#f6b93b'
					}
				},{
					type:'text',
					config:{
						x:200,
						y:1900,
						text:'以下为剪切的使用',
					}
				},{
					type:'image',
					config:{
						x:100,
						y:1900,
						w:192,
						h:120,
						url:'/static/5b0cf1e640f29.jpg',
					},
					// 被裁剪元素可以是别的图形
					// type:'rect',
					// config:{
					// 	x:200,
					// 	y:1920,
					// 	w:150,
					// 	h:100,
					// 	fillStyle:'#b8e994',
					// 	strokeStyle:'transparent'
					// },
					
					// type:'round_rect',
					// config:{
					// 	x:200,
					// 	y:1920,
					// 	w:150,
					// 	h:100,
					// 	r:40,
					// 	fillStyle:'#b8e994',
					// },
					
					// type:'arc',
					// config:{
					// 	x:200,
					// 	y:1960,
					// 	r:40,
					// 	sAngle:0,
					// 	eAngle:2 * Math.PI,
					// 	fillStyle:'blue',
					// 	lineWidth:3,
					// 	strokeStyle:'red'
					// },
					clip:{
						// 剪切形状为矩形 （stroke_rect 和 rect 绘制策略相同）
						// type:'rect',
						// config:{
						// 	x:130,
						// 	y:1920,
						// 	w:150,
						// 	h:50
						// }
						// 剪切形状为圆角矩形（stroke_round_rect 和 round_rect 绘制策略相同）
						// type:'round_rect',
						// config:{
						// 	x:130,
						// 	y:1920,
						// 	w:150,
						// 	h:50,
						// 	r:20,
						// }
						// 剪切形状为圆
						type:'arc',
						config:{
							x:200,
							y:1950,
							r:40,
							sAngle:0,
							eAngle:2 * Math.PI,
						}
						// 剪切形状为一个闭合的图形（一个闭合的线）
						// type:'line',
						// config:{
						// 	path:[{
						// 		points:[{
						// 			type:'moveTo',
						// 			point:[120,1920]
						// 		},{
						// 			type:'lineTo',
						// 			point:[180,1920]
						// 		},{
						// 			type:'bezierCurveTo',
						// 			point:[220,2020],
						// 			P1:[200,1920],
						// 			P2:[240,1980],
						// 		},{
						// 			type:'lineTo',
						// 			point:[120,2020],
						// 		},{
						// 			type:'closePath',
						// 		}]
						// 	}],
						// }
					}
				},{
					type:'text',
					config:{
						x:200,
						y:2100,
						text:'现在闭合的线可以构建图形',
					},
					//同样的 text 类型也适用裁剪
					// clip:{
					// 	type:'rect',
					// 	config:{
					// 		x:200,
					// 		y:2090,
					// 		w:40,
					// 		h:16,
					// 	}
					// }
				},{
					type:'line',
					config:{
						path:[{
							points:[{
								type:'moveTo',
								point:[80,2120]
							},{
								type:'lineTo',
								point:[140,2120]
							},{
								type:'bezierCurveTo',
								point:[160,2220],
								P1:[200,2120],
								P2:[240,2180],
							},{
								type:'lineTo',
								point:[80,2220],
							},{
								type:'closePath',
							}],
							lineWidth:3,
							strokeStyle:'blue',
							fillStyle:'#b8e994',
						},{
							points:[{
								type:'moveTo',
								point:[240,2120]
							},{
								type:'lineTo',
								point:[300,2120]
							},{
								type:'bezierCurveTo',
								point:[320,2220],
								P1:[260,2120],
								P2:[240,2180],
							},{
								type:'lineTo',
								point:[220,2220],
							},{
								type:'closePath',
							}],
							lineWidth:3,
							strokeStyle:'red',
							fillStyle:'#f6b93b',
						}],
					}
					// 同样的 line 类型的闭合图形也适用裁剪
					// clip:{
					// 	type:'rect',
					// 	config:{
					// 		x:150,
					// 		y:2140,
					// 		w:100,
					// 		h:70,
					// 	}
					// }
				}],
				drawData2:[{
					type:'line',
					config:{
						path:[{
							points:[{
								type:'moveTo',
								point:[60,80]
							},{
								type:'lineTo',
								point:[120,80]
							},{
								type:'bezierCurveTo',
								point:[120,200],
								P1:[140,120],
								P2:[80,180],
							},{
								type:'bezierCurveTo',
								point:[140,180],
								P1:[140,120],
								P2:[80,180]
							},{
								type:'bezierCurveTo',
								point:[180,180],
								P1:[180,160],
								P2:[180,160]
							}],
							lineWidth:3,
							strokeStyle:'red'
						},{
							points:[{
								point:[160,100]
							},{
								point:[160,80]
							},{
								point:[280,120],
							},{
								point:[220,200],
							}],
							lineWidth:4,
							strokeStyle:'#f6b93b'
						},
						{
							points:[[200,200],[200,300],[300,300],[300,200],[200,200]],
							lineWidth:2,
							strokeStyle:'blue'
						}],
					}
				}]
			}
		},
		mounted() {
			const ctx = uni.createCanvasContext('myCanvas');
			createPoster(ctx,this.drawData)
		}
	}
</script>

<style scoped>
	.myCanvas{
		border: 1px solid;
		box-sizing: border-box;
	}
</style>
