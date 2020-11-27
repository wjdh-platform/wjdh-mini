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
      icon:'/static/image/bindCell.png',
    },{
      text:'生活缴费',
      icon:'/static/image/bindCell.png',
    },{
    text:'物业保修',
    icon:'/static/image/bindCell.png',
    },{
      text:'云停车场',
      icon:'/static/image/bindCell.png',
    },{
      text:'投诉建议',
      icon:'/static/image/bindCell.png',
    },{
      text:'公告通知',
      icon:'/static/image/bindCell.png',
    },{
      text:'一键报警',
      icon:'/static/image/bindCell.png',
    },{
      text:'访客通行',
      icon:'/static/image/bindCell.png',
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
            url: '/pages/bindCell/bindCell?type=owner',
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
    let tocken = utils.getItem('accessToken'),
         currentTime = Date.parse(new Date()),//当前时间
         timestamp1 = wx.getStorageSync('timestamp1'),
         t = this
         t.getRoles()
    wx.login({
      success(res) {
        t.setData({
          code: res.code
        })
        if (tocken && tocken != '') {
          if(currentTime>timestamp1+3600000){
            console.log("token过期")
            api.getTockenN({}, (res) => {
              if(res.data.code == 0){
              utils.setItem('accessToken', res.data.access_token)
              utils.setItem('userRoles', res.data.roles)
              if(utils.getItem('avatar')){
                return true
              }else{
                utils.setItem('avatar', res.data.avatar)
                utils.setItem('name', res.data.name)
              }
            }else{
              t.codeToken()
            }
            })
          }else{
            console.log("token未过期")
          }
        } else {
          t.codeToken()
        }
      }
    })
    
    
  },

  //code换token
  codeToken(){
    let t = this
    api.getTocken({
      code:t.data.code
    }, (res) => {
      if(res.data.code == 0){
        utils.setItem('accessToken', res.data.access_token)
        utils.setItem('userRoles', res.data.roles)
        if(utils.getItem('avatar')){
          return true
        }else{
          utils.setItem('avatar', res.data.avatar)
          utils.setItem('name', res.data.name)
        }
        
      }else if (res.data.code == 1){
        //游客身份
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