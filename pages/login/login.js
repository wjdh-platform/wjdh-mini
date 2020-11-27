// pages/login/login.js
const app = getApp();
import * as api from '../../api/api'
import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // loginType: true,
    codeBtnText:"获取验证码",
    phone:'',
    currentTime: 61, //倒计时
    loginCode:'验证码登录',
    LoginPass: '密码登录',
    changeLoginType:true,//默认密码登录
    code:'',
    getCodeKey:'',
    loginPassVal:'',
    loginPhoneVal:'',
    loginCodeVal:'',
    loginType:false
  },

  getUserInfo(e){
    console.log(e)
    let t = this
    if(e.detail.userInfo){
      t.setData({
        userInfo: e.detail.userInfo,
        loginType: true
      })
    }else{
      utils.showToast('请授权获取用户信息','none')
    }
    
  },
  //杨哲
  getPhoneNumber(e){
    console.log(e.detail.encryptedData)
    console.log(e.detail.iv)
    let t = this
    t.setData({

    })
  },
  
  

  //切换登录方式
  changeLogin(){
    this.setData({
      changeLoginType: !this.data.changeLoginType
    })
  },

  //登录手机号失焦
  loginPhoneBlur(e){
    if (!/^1[3456789]\d{9}$/.test(e.detail.value)) {
      utils.showToast("请输入正确的手机号","none")
    }else{
      this.setData({
        loginPhoneVal: e.detail.value
      })
    }
  },

  //登录密码失焦
  loginpassBlur(e) {
    this.setData({
      loginPassVal: e.detail.value
    })
  },

  //登录验证码失焦
  loginCodeBlur(e) {
    this.setData({
      loginCodeVal: e.detail.value
    })
  },

  //登录按钮
  loginBtn(){
    let t = this
    if (t.data.changeLoginType){
      if(t.data.loginPhoneVal ==''){
        utils.showToast('请输入手机号', 'none')
      } else if (t.data.loginPassVal == ''){
        utils.showToast('请输入密码','none')
      }else{
        wx.login({
          success: res => {
            if (res.code) {
              api.loginPass({
                code:res.code,
                username: t.data.loginPhoneVal,
                password: t.data.loginPassVal,
              }, (res) => {
                wx.hideLoading()
                if (res.data.code == 1) {
                    utils.showToast(res.data.message, "none")
                } else {
                  utils.showToast("已登录", "none")
                  wx.setStorage({
                    key: 'accessToken',
                    data: res.data.access_token,
                  })
                  wx.navigateBack({})
                }
              })
            }
          }
        })
        
      }
    }else{
      if (t.data.loginPhoneVal == '') {
        utils.showToast('请输入手机号', 'none')
      } else if ( t.data.loginCodeVal == '') {
        utils.showToast('请输入验证码', 'none')
      } else {
        api.loginCode({
          verification_key: t.data.getCodeKeyLogin,
          verification_code: t.data.loginCodeVal,
          code:t.data.code
        }, (res) => {
          console.log(res.data)
          if (res.data.code == 1) {
            utils.showToast(res.data.message, "none")
          } else {
            utils.showToast("已登录", "none")
            wx.setStorage({
              key: 'accessToken',
              data: res.data.access_token,
            })
            wx.navigateBack({})
          }
        })
      }
    }
  },

  //登录获取验证码
  loginObtainCode() {
    var that = this;
    var phone = that.data.loginPhoneVal;
    var currentTime = that.data.currentTime
    if (phone == '') {
      utils.showToast("手机号码不能为空", "none")
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      utils.showToast("请输入正确的手机号", "none")
    } else {
      that.setData({
        disabled: true,
        color: '#ccc',
      })
      api.getCode({
        phone: that.data.loginPhoneVal,
        type:"login"
      }, (res) => {
        if(res.data.code == 1){
          utils.showToast(res.data.msg, "none")
          return
        }else{
          that.setData({
            getCodeKeyLogin: res.data.key
          })
          //设置一分钟的倒计时
          var interval = setInterval(function () {
            currentTime--; //每执行一次让倒计时秒数减一
            that.setData({
              codeBtnText: currentTime + 's', //按钮文字变成倒计时对应秒数
            })

            if (currentTime <= 0) {
              clearInterval(interval)
              that.setData({
                codeBtnText: '重新发送',
                currentTime: 61,
                disabled: false,
                color: '#929fff'
              })
            }
          }, 1000);
        } 
      })
      
    };
  },

  

  userRegister(){
    wx.redirectTo({
      url: '/pages/login/register/register',
    })
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
    let t = this
    wx.login({
      success: res => {
        t.setData({
          code: res.code
        })
      }
    })

    
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