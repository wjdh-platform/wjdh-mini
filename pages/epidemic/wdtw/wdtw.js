import * as echarts from '../../../ec-canvas/echarts';
var dataList = [];
var Chart = null;
const app = getApp();
import * as api from '../../../api/api'
import utils from '../../../utils/util.js'

Page({
  data: {
    ec: {
      lazyLoad: true
    },
    changeCellType: false,
    title: '',
    titleNavName:'我的体温',
    backType:true,
  },

  bindYear(e){
    this.setData({
      yearIdx:e.detail.value
    })
  },
  bindMouth(e){
    this.setData({
      mouthIdx:e.detail.value
    })
  },
  bindDay(e){
    this.setData({
      dayIdx:e.detail.value
    })
  },

  twsb(){
    wx.redirectTo({
      url: '/pages/epidemic/twsb/twsb',
    })
  },
  temperaturesList(){
    api.temperaturesList({},(res)=>{
      if(res.data.code == 0){
        dataList = res.data.data
        this.init_echarts();
      }
    })
  },

  onLoad(){
    let t = this
    t.setData({
      navH: app.globalData.navHeight,
    })
    t.temperaturesList()
    t.echartsComponnet = t.selectComponent('#mychart');
  },
  //初始化图表
  init_echarts: function () {
    let t = this
    t.echartsComponnet.init((canvas, width, height,dpr) => {
      // 初始化图表
      Chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr //解决小程序视图模糊的问题，必写
      });
      // Chart.setOption(this.getOption());
      t.setOption(Chart);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  setOption: function (Chart) {
    // Chart.clear();  // 清除
    Chart.setOption(this.getOption());  //获取新数据
  },
  getOption: function () {
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '我的体温',
        left: 'center'
      },
      color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
      legend: {
        data: ['上周体温', '本周体温'],
        top: 30,
        left: 'center',
      },
      grid: {
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        min:35,
        max:43,
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      
      series: dataList
    };
    return option;
  },

});
