<!-- 团委 数据墙 玫瑰图 -->
<template>
    <view class="charts-box">
      <qiun-data-charts 
        type="rose"
        :opts="opts"
        :chartData="chartData"
        background="rgba(255,255,255,0)"
      />
    </view>
  </template>
  
  <script>
  import qiunDataCharts from "@/uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue";
  export default {
    components: {  
        qiunDataCharts 
    },
    data() {
      return {
        chartData: {},
        //这里的 opts 是图表类型 type="rose" 的全部配置参数，您可以将此配置复制到 config-ucharts.js 文件中下标为 ['rose'] 的节点中来覆盖全局默认参数。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
        opts: {
          timing: "easeOut",
          duration: 1000,
          rotate: false,
          rotateLock: false,
          color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
          padding: [0,0,0,0],
          fontSize: 11,
          fontColor: "#666666",
          dataLabel: true,
          dataPointShape: true,
          dataPointShapeType: "solid",
          touchMoveLimit: 60,
          enableScroll: false,
          enableMarkLine: false,
          // 右侧图例的配置
          legend: {
            show: true,
            position: "right",
            lineHeight: 25,
            float: "center",
            padding: 5,
            margin: 0,
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "rgba(0,0,0,0)",
            borderWidth: 0,
            fontSize: 11,
            fontColor: "#666666",
            hiddenColor: "#CECECE",
            itemGap: 10
          },
          extra: {
            rose: {
              type: "area",
              minRadius: 50,
              activeOpacity: 0.5,
              activeRadius: 10,
              offsetAngle: 0,
              labelWidth: 0.3,
              border: true,
              borderWidth: 2,
              borderColor: "#FFFFFF",
              linearType: "custom"
            },
            tooltip: {
              showBox: true,
              showArrow: true,
              showCategory: false,
              borderWidth: 0,
              borderRadius: 0,
              borderColor: "#000000",
              borderOpacity: 0.7,
              bgColor: "#000000",
              bgOpacity: 0.7,
              gridType: "solid",
              dashLength: 4,
              gridColor: "#CCCCCC",
              boxPadding: 3,
              fontSize: 13,
              lineHeight: 20,
              fontColor: "#FFFFFF",
              legendShow: true,
              legendShape: "auto",
              splitLine: true,
              horizentalLine: false,
              xAxisLabel: false,
              yAxisLabel: false,
              labelBgColor: "#FFFFFF",
              labelBgOpacity: 0.7,
              labelFontColor: "#666666"
            }
          }
        }
      };
    },
    onReady() {
      this.getServerData();
    },
    methods: {
      getServerData() {
        //模拟从服务器获取数据时的延时
        setTimeout(() => {
          //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
          let res = {
              series: [
                {
                  data: [{"name":"其他","value":50},{"name":"软件工程学院","value":30},{"name":"中法核","value":20},{"name":"商学院","value":18},{"name":"历史学系","value":8}]
                }
              ]
            };
          this.chartData = JSON.parse(JSON.stringify(res));
        }, 500);
      },
    }
  };
  </script>
  
  <style scoped>
    /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
    .charts-box {
      width: 100%;
      height: 80%;
    }
  </style>