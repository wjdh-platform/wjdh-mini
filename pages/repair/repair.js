// pages/guarantee/guarantee.js
const app = getApp();
import * as api from '../../api/api'
import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  addressIdx:0

  },

  bindAddress(e){
    this.setData({
      addressIdx: e.detail.value
    })
  },

  addressSub(e){
    console.log(e)
  },

//获取小区名字
getVillage(){
  let t = this
  api.getVillage({},(res)=>{
    if(res.data.code == 0){
      let list = [],
        oldList = res.data.data
      list = oldList.unshift({ community_name:'请选择'})
      t.setData({
        addressList: oldList
      })
    }
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    utils.token()
    this.getVillage()
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