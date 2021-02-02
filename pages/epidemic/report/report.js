// pages/epidemic/report/report.js
const app = getApp();
import * as api from '../../../api/api'
import utils from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventArr:[],
    eventIdx:0,
    max: 300,
    text_value: '', 
    changeCellType: false,
    title: '',
    checked:false,
    backType:true,
    titleNavName:'疫情举报'
  },

  changeClose(res) {
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

  introduction(e){
   var value = e.detail.value;
   var len = parseInt(value.length);
   if (len > this.data.max) return;
   this.setData({
     currentWordNumber: len, //当前字数 
     text_value: value
   });
  },
  
  yqEvent(){
    api.yqEvent({},(res)=>{
      if(res.data.code == 0){
        let oldList = res.data.data,
             list = []
        list = oldList.unshift('请选择')
        this.setData({
          eventArr:oldList
        })
      }
    })
  },

  bindEvent(e){
    this.setData({
      eventIdx:e.detail.value
    })
  },


  formSubmit(e){
    let val = e.detail.value,
         t = this,
         villageList = utils.getItem('villageList'),
         villageIdx = utils.getItem('villageIdx')
    // console.log(val)
    if(val.address == ''){
      utils.showToast('请输入地点','none')
    }else if(t.data.eventIdx == 0){
      utils.showToast('请选择事件','none')
    }else if(val.intro == ''){
      utils.showToast('请输入举报内容','none')
    }else{
      api.epidemicReport({
        community_identifier:villageList[villageIdx].community_identifier,
        type: t.data.eventArr[t.data.eventIdx],
        place: val.address,
        anonymous: val.radio == ''? 0 : 1,
        reason:val.intro
      },(res)=>{
        if(res.data.code == 0){
          wx.redirectTo({
            url: '/pages/epidemic/reportList/reportList',
          })
        }
          utils.showToast(res.data.msg,'none')
        
      })
    }
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = this
    t.setData({
      navH: app.globalData.navHeight
    })
    t.yqEvent()
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