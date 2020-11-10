// pages/property/property.js
const app = getApp();
import * as api from '../../api/api'
import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
//绑定家属
  bindFamily(){
    let t = this;
    let tocken = utils.getItem('accessToken')
    if (tocken && tocken != '') {

    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },


//绑定小区
  bindCell(){
    let t = this;
    let tocken = utils.getItem('accessToken')
    if(tocken&&tocken!=''){
      utils.showToast("开发中", "none")
    }else{
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tocken = utils.getItem('accessToken');
    wx.login({
      success(res) {
        if (tocken && tocken != '') {
          api.getTockenN({}, (res) => {
            utils.setItem('accessToken', res.data.access_token)
          })
        } else {
          api.getTocken({
            code:res.code
          }, (res) => {
            utils.setItem('accessToken', res.data.access_token)
          })
        }
      }
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