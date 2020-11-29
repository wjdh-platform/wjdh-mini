// pages/property/property.js
const app = getApp();
import * as api from '../../api/api'
import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{
      text:'绑定小区',
      icon:'/static/icon/bdxq.jpg',
    },{
      text:'生活缴费',
      icon:'/static/icon/shjf.jpg',
    },{
    text:'物业保修',
    icon:'/static/icon/wybx.jpg',
    },{
      text:'云停车场',
      icon:'/static/icon/ytcc.jpg',
    },{
      text:'投诉建议',
      icon:'/static/icon/tsjy.jpg',
    },{
      text:'公告通知',
      icon:'/static/icon/ggtz.jpg',
    },{
      text:'应急电话',
      icon:'/static/icon/yjbj.jpg',
    },{
      text:'访客通行',
      icon:'/static/icon/fktx.jpg',
  }]
    
  },
//绑定家属
  bindFamily(){
    let t = this;
    let tocken = utils.getItem('accessToken')
    if (tocken && tocken != '') {
      wx.navigateTo({
        url: '/pages/bindCell/bindCell?type=family',
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },


//绑定小区
  bindCell(e){
    let t = this;
    let tocken = utils.getItem('accessToken'),
         idx = e.currentTarget.dataset.idx
    console.log(e.currentTarget.dataset.idx)
    switch(idx){
      
      case 5:
        wx.navigateTo({
          url: '/pages/notice/notice',
        });
      break;
      case 6:
        wx.navigateTo({
          url: '/pages/phoneCall/phoneCall',
        });
      break;

    }
    if(tocken&&tocken!=''){
      switch(idx){
        case 0:
          wx.navigateTo({
            url: '/pages/bindCell/bindCell?type=owner',
          });
        break;
        case 1:
          wx.navigateTo({
            url: '/pages/bindCell/bindCell?type=owner',
          });
        break;
        case 2:
          wx.navigateTo({
            url: '/pages/repair/repair',
          });
        break;
        case 3:
          wx.navigateTo({
            url: '/pages/bindCell/bindCell?type=owner',
          });
        break;
        case 4:
          wx.navigateTo({
            url: '/pages/bindCell/bindCell?type=owner',
          });
        break;
        case 5:
          wx.navigateTo({
            url: '/pages/bindCell/bindCell?type=owner',
          });
        break;
        case 6:
          wx.navigateTo({
            url: '/pages/bindCell/bindCell?type=owner',
          });
        break;
        case 7:
          wx.navigateTo({
            url: '/pages/bindCell/bindCell?type=owner',
          });
        break;

      }
      
      
    }else{
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  

  getRoles(){
    api.getRoles({},(res)=>{
      if(res.data.code == 0){
        utils.setItem('userRoles',res.data.data)
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = this
         utils.token()
         t.getRoles()
    
    
    
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