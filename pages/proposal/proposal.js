// pages/proposal/proposal.js
const app = getApp();
import * as api from '../../api/api'
import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proposalList:[
      '请选择',
      '环境卫生',
      '物业服务',
      '公共设施',
      '合理化建议',
      '其它'
    ],
    proposalIdx:0,
    popupType:true
  },

  bindType(e){
    this.setData({
      proposalIdx:e.detail.value
    })
    
  }, 
  propasalSub(e){
    let t = this
    if(t.data.proposalIdx ==0){
      utils.showToast('请选择问题分类','none')
    }else if(e.detail.value.repairIntro == ''){
      utils.showToast('请填写详细说明','none')
    }else{
      t.setData({
        popupType:false
      })
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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