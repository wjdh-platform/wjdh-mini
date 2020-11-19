// pages/houseList/ownerHouseList/ownerHouseList.js

const app = getApp();
import * as api from '../../../api/api'
import utils from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{
      houseId:'1',
      cellName:'秦皇小区',
      examineType:'已绑定'
    },
      {
        houseId: '2',
        cellName: '盛达鑫苑',
        examineType: '未通过'
      }]
  },

  bindListDetail(e){
    console.log(e.currentTarget.dataset.houseId)
    wx.navigateTo({
      url: '/pages/bindCell/bindCell?type=cellList',
    })
  },

  //获取列表
  housesList(){
    api.housesList({},(res)=>{

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.housesList()
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