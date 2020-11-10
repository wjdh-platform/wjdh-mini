// pages/login/register/register.js
const app = getApp();
import * as api from '../../../api/api'
import utils from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeBtnText: "获取验证码",
    currentTime: 61, //倒计时
    phone:'',
    codeText:'',
    passwordText:'',
    passwordTextAgain:'',
    getCodeKeyLogin:'',
    clearInterval:''
  },
  //注册时手机号框失焦
  phoneBlur(e) {
    let phoneVal = e.detail.value
    let t = this
    if (t.data.phone!=''){
      if (t.data.phone != phoneVal){
        t.setData({
          getCodeKeyLogin:'',
          codeBtnText:"重新发送",
          currentTime:61
          // codeType:false
        })
        clearInterval(t.data.clearInterval)
        utils.showToast("修改手机后，请重新获取验证码","none")
      }
    }
    

    if (!/^1[3456789]\d{9}$/.test(e.detail.value)) {
      utils.showToast("请输入正确的手机号","none")
    } else {
      t.setData({
        phone: e.detail.value,
      })
    }
  },

  codeBlur(e) {
    this.setData({
      codeText: e.detail.value
    })
  },

  //注册获取验证码
  obtainCode() {
    var that = this;
    var phone = that.data.phone;
    var currentTime = that.data.currentTime
    if (phone == '') {
      utils.showToast("手机号码不能为空", "none")
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      utils.showToast("请输入正确的手机号", "none")
    } else {
      //当手机号正确的时候提示用户短信验证码已经发送 并禁止按钮点击导致定时器多次触发的bug
      that.setData({
        disabled: true,
        color: '#ccc',
      })
      api.getCode({
        phone: that.data.phone,
        type: "register",
      }, (res) =>  {
        if (res.data.code == 1) {
          utils.showToast(res.data.msg, "none")
          return
        } else {
          that.setData({
            getCodeKeyLogin: res.data.key
          })
          utils.showToast("短信验证码已发送", "none")
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
          that.setData({
            clearInterval: interval
          })
        }
      })
      

     
    };
  },

  //密码失焦
  passwordBlur(e) {
    let passwordTextVal = e.detail.value
    if (passwordTextVal.length>=8){
      this.setData({
        passwordText: passwordTextVal
      })
    }else{
      utils.showToast('密码不能少于8位','none')
    }
    
  },
  //再次输入密码失焦
  passwordBlurAgain(e) {
    let passwordTextAgainVal = e.detail.value
    if (passwordTextAgainVal.length >= 8) {
      this.setData({
        passwordTextAgain: passwordTextAgainVal
      })
    } else {
      utils.showToast('密码不能少于8位', 'none')
    }
  },

  //点击注册按钮
  registerBtn() {
    let t = this;
    if (t.data.phone == ""){
      utils.showToast('请输入手机号',"none")
    } else if (t.data.codeText == ""){
      utils.showToast('请输入验证码', "none")
    } else if (t.data.passwordText == "" || t.data.passwordText<8) {
      utils.showToast('请输入不少于8位的密码', "none")
    } else if (t.data.passwordTextAgain == "" || t.data.passwordTextAgain < 8) {
      utils.showToast('请输入不少于8位的密码', "none")
    }else if (t.data.passwordText !== t.data.passwordTextAgain) {
      utils.showToast('您两次输入的密码不相符', 'none')
    } else {
      wx.login({
        success: res => {
          if(res.code){
            let param = {
              verification_key: t.data.getCodeKeyLogin,
              verification_code: t.data.codeText,
              password: t.data.passwordText,
              code: res.code,
            }
            api.registerBtn(param, (res) => {
              console.log(res.data)
              if (res.data.code == 1) {
                utils.showToast(res.data.message,"none")
                
              }else{
                utils.showToast("已登录", "none")
                wx.setStorage({
                  key: 'accessToken',
                  data: res.data.access_token,
                })
                wx.navigateBack({

                })
              }

            })
          }else{
            utils.showToast('code不存在')
          }
        }
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
    let t = this
    // wx.login({
    //   success: res => {
    //     t.setData({
    //       code: res.code
    //     })
    //   }
    // })
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