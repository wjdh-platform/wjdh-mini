// pages/houseList/payList/payList.js
const app = getApp();
import * as api from '../../../api/api'
// import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderType:true,
    changeCellType:false,
    title:'',
    false:false,
    changeCellType:false,
    title:'',
    backType:true
  },

  changeClose(res){
    console.log(res)
    this.setData({
      changeCellType:res.detail.changeCellType,
      title:res.detail.community_name
    })
  },
  changePopupType(res){
    this.setData({
      changeCellType:res.detail
    })
  },

  // changeClose(res){
  //   console.log(res)
  //   this.setData({
  //     changeCellType:res.detail.changeCellType,
  //     title:res.detail.community_name
  //   })
  // },
  // changePopupType(res){
  //   this.setData({
  //     changeCellType:res.detail
  //   })
  // },
  orderDetails(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/houseList/payList/details/details?id='+id,
    })
  },
  getPayList(){
    api.payList({},(res)=>{
      let data = res.data,
           dataArr = data.data
      if(data.code == 0){
        dataArr.forEach(item => {
          item.isShow = false;
        })
        this.setData({
          payList:dataArr
        })
      }
    })
  },

  orderListType(e){
  let t = this,
      idx = e.currentTarget.dataset.idx,
      dataList = t.data.payList
      dataList[idx].isShow = !dataList[idx].isShow
    if (dataList[idx].isShow) {
      t.packUp(dataList, idx);
    }
    t.setData({
      payList: dataList
    })
  },
  packUp(data, index) {
    for (let i = 0, len = data.length; i < len; i++) {
      if (index != i) {
        data[i].isShow = false
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
    })
    this.getPayList()
    
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