const app = getApp();
import * as api from '../../api/api'
import utils from '../../utils/util.js'

Page({
  data: {
    startX: 0, //开始坐标

startY: 0
  },

  housesList(param) {
    let t = this
    // return new Promise((resolve, reject) => {
    api.housesList(param, (res) => {
      if (res.data.code == 0) {
        let list = res.data.data
        if (list.length === 0) {
          t.setData({
            listType: false,
            houseList: list
          })
        } else {
          let newArr = list.map(item => {
            return {
              ...item,
              isActive: false,
              x: 0
            }
          })
          t.setData({
            listType: true,
          })

          t.setData({
            houseList: newArr,
          })
        }
      }

    })
    // })
  },
  onLoad: function () {
    let villageList = utils.getItem('villageList'),
      villageIdx = utils.getItem('villageIdx')
    this.housesList({
      type: 'bangding',
      community_identifier: villageList[villageIdx].community_identifier
    })
  },
  //手指触摸动作开始 记录起点X坐标

touchstart: function (e) {
  //开始触摸时 重置所有删除
  
  this.data.houseList.forEach(function (v, i) {
  if (v.isTouchMove)//只操作为true的
  
  v.isTouchMove = false;
  
  })
  
  this.setData({
  startX: e.changedTouches[0].clientX,
  
  startY: e.changedTouches[0].clientY,
  
  houseList: this.data.houseList
  
  })
  
  },
  
  //滑动事件处理
  
  touchmove: function (e) {
  var that = this,
  
  index = e.currentTarget.dataset.index,//当前索引
  
  startX = that.data.startX,//开始X坐标
  
  startY = that.data.startY,//开始Y坐标
  
  touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
  
  touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
  
  //获取滑动角度
  
  angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
  
  that.data.houseList.forEach(function (v, i) {
  v.isTouchMove = false
  
  //滑动超过30度角 return
  
  if (Math.abs(angle) > 30) return;
  
  if (i == index) {
  if (touchMoveX > startX) //右滑
  
  v.isTouchMove = false
  
  else //左滑
  
  v.isTouchMove = true
  
  }
  
  })
  
  //更新数据
  
  that.setData({
    houseList: that.data.houseList
  
  })
  
  },
  
  /**
  
  * 计算滑动角度
  
  * @param {Object} start 起点坐标
  
  * @param {Object} end 终点坐标
  
  */
  
  angle: function (start, end) {
  var _X = end.X - start.X,
  
  _Y = end.Y - start.Y
  
  //返回角度 /Math.atan()返回数字的反正切值
  
  return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  
  },
  
  //删除事件
  
  del: function (e) {
  this.data.houseList.splice(e.currentTarget.dataset.index, 1)
  
  this.setData({
    houseList: this.data.houseList
  
  })
  
  }
})
