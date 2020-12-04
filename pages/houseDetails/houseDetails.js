// pages/houseDetails/houseDetails.js
const app = getApp();
import * as api from '../../api/api'
import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0
  },

  tabTap(e){
    var t = this;
    if( t.data.currentTab === e.target.dataset.current ) {
        return false;
    } else {
        t.setData( {
            currentTab: e.target.dataset.current
        })
    }
  },

  addFamily(){
    wx.navigateTo({
      url: "/pages/bindCell/bindCell?type=family",
    })
  },

  getHouseDetails(){
    let t = this
    api.housesDetails({
      id: t.data.houseId,
      role:t.data.role
    },(res)=>{
      if(res.data.code == 0){
        t.setData({
          detailsData:res.data.data
        })
      }
    })
  },

  getShenheDetail(){
    let t = this
    api.getShenheDetail({
      id: t.data.shenhe_id,
    },(res)=>{
      if(res.data.code == 0){
        t.setData({
          shenheData:res.data.data
        })
      }
    })
  },

  delCell(e){
    let id = e.currentTarget.dataset.id
    console.log(e.currentTarget.dataset.id)
    api.houseDel({id:id},(res)=>{
      if(res.data.code == 0){
        utils.showToast(res.data.msg,'none')
        wx.redirectTo({
          url: '/pages/bindCell/bindCell',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    utils.token()
    this.setData({
      houseId:options.houseId,
      role: options.role,
      shenhe_id:options.shenhe_id
      // shenhe_id:16
    })
      if(options.houseId!=''){
        this.getHouseDetails()
      }else{
        this.getShenheDetail()
      }
    
    // this.getShenheDetail()
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