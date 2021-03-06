// pages/epidemic/reportList/reportList.js
const app = getApp();
import * as api from '../../../api/api'
import utils from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

    changeCellType: false,
    title: '',
    backType:true,
    titleNavName:'疫情举报列表'
  },

  changeClose(res) {
    let t = this,
    villageList = utils.getItem('villageList'),
      villageIdx = utils.getItem('villageIdx')
    t.epidemicReportList({
      community_identifier:villageList[villageIdx].community_identifier
    })
  this.setData({
    changeCellType: res.detail.changeCellType,
    title: res.detail.community_name
  })
},

changePopupType(res) {
  this.setData({
    changeCellType: res.detail
  })
},

closeBtn(res) {
  this.setData({
    changeCellType: res.detail
  })
},

epidemicReportList(param){
  api.epidemicReportList(param,(res)=>{
    if(res.data.code == 0){
      this.setData({
        list:res.data.data
      })
    }else{
      
    }
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = this,
    villageList = utils.getItem('villageList'),
      villageIdx = utils.getItem('villageIdx')
    t.setData({
      navH: app.globalData.navHeight
    })
    t.epidemicReportList({
      community_identifier:villageList[villageIdx].community_identifier
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})