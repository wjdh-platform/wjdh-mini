// pages/bindCell/bindCell.js
const app = getApp();
import * as api from '../../api/api'
import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeBtnText:'获取验证码',
    popupType:true,
    phoneVal:'',
    currentTime:61,
    codeVal:'',
    villageIdx:0,
    buildingsIdx:0,
    unitsIdx:0,
    floorIdx:0,
    roomIdx:0
  },

  //关闭弹层
  closePopup(){
    this.setData({
      popupType:false
    })
  },

  //手机号失焦
  phoneBlur(e){
    
    this.setData({
      phoneVal:e.detail.value
    })
  },

  //验证码失焦
  codeBlur(e){
    this.setData({
      codeVal: e.detail.value
    })
  },

  //获取验证码
  obtainCode() {
    var that = this;
    var phone = that.data.phoneVal;
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
        phone: that.data.phoneVal,
        type: "verify",
      }, (res) => {
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

  //验证手机号
  verificationBtn(){
    let t = this
    if (t.data.phoneVal == ''){
      utils.showToast("请输入手机号","none")
    } else if (t.data.codeVal == ''){
      utils.showToast("请输入验证码", "none")
    }else{
      api.verificationPhone({
        verification_key: t.data.getCodeKeyLogin,
        verification_code:t.data.codeVal
      },(res)=>{
        if(res.data.code == 1||res.data.code == 2){
          t.setData({
            popupType:false
          })
        }
      })
    }
  },

  //选择小区
  bindvillageList(e){
    let t = this,
         list = t.data.villageList,
         idx = e.detail.value
         
    t.setData({
      villageIdx:e.detail.value
    })
    api.getBuildings({ id: list[idx].id},(res)=>{
      let data = res.data
      if(data.code == 0){
        utils.showToast(res.data.message,"none")
      }else if(data.code == 1){
        t.setData({
          buildingsList:data.data
        })
      }
    })
  },

  //选择楼栋
  bindBuildingsList(e) {
    let t = this,
      list = t.data.buildingsList,
      idx = e.detail.value

    t.setData({
      buildingsIdx: e.detail.value
    })
    api.getUnits({ id: list[idx].id }, (res) => {
      let data = res.data
      if (data.code == 0) {
        utils.showToast(res.data.message, "none")
      } else if (data.code == 1) {
        t.setData({
          unitsList: data.data
        })
      }
    })
  },
  //选择单元
  bindUnitsList(e) {
    let t = this,
      list = t.data.unitsList,
      idx = e.detail.value

    t.setData({
      unitsIdx: e.detail.value
    })
    api.getFloor({ id: list[idx].id }, (res) => {
      let data = res.data
      if (data.code == 0) {
        utils.showToast(res.data.message, "none")
      } else if (data.code == 1) {
        t.setData({
          floorList: data.data
        })
      }
    })
  },
  //选择楼层
  bindFloorList(e) {
    let t = this,
      list = t.data.floorList,
      idx = e.detail.value

    t.setData({
      floorIdx: e.detail.value
    })
    api.getRoom({ id: list[idx].id }, (res) => {
      let data = res.data
      if (data.code == 0) {
        utils.showToast(res.data.message, "none")
      } else if (data.code == 1) {
        t.setData({
          roomList: data.data
        })
      }
    })
  },
  //选择房间号
  bindRoomList(e) {
    let t = this,
      list = t.data.roomList,
      idx = e.detail.value

    t.setData({
      roomIdx: e.detail.value
    })
    api.yezhu({ id: list[idx].id }, (res) => {
      let data = res.data
      if (data.code == 0) {
        utils.showToast(res.data.message, "none")
      } else if (data.code == 1) {
        t.setData({
          // roomList: data.data
          yezhuOldPhone:data.phone
        })
      }
    })
  },

  //获取小区名字
  getVillage(){
    let t = this
    api.getVillage({},(res)=>{
      if(res.data.code == 1){
        let list = [],
          oldList = res.data.data
        list = oldList.unshift({ community_name:'请选择'})
        t.setData({
          villageList: oldList
        })
      }
    })
  },

  //初始化
  bellInitialize(){
    let t = this
    api.bellInitialize({}, (res) => {
      if (res.data.code == 1) {
        
        t.setData({
          // villageList: oldList
        })
      }
    })
  },

  updateImg() {
    let t = this
    wx.chooseImage({
      success: function (res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        var imgList = []
        imgList.push(tempFilePaths)
        t.setData({
          imageList: imgList.concat(t.data.imageList)
        })
        console.log(t.data.imageList)
      },
    })
  },

  launchAppError(e) {
    console.log(e.detail.errMsg)
  },
  // 获取百度access_token
  getBaiduToken: function () {
    const apiKey = 'aEo4u7peePL39qjpEfYbc7Dv';
    const seckey = 'pozj20ovr7SSudqyAKQFPjQFGEL8sx6o';
    const tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${seckey}`;

    let that = this;
    wx.request({
      url: tokenUrl,
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/json; charset=UTF-8'
      },
      success: function (res) {
        console.log('getBaiduToken提示pass', res);
        that.setData({
          baiduToken: res.data.access_token
        })
      },
      fail: function (res) {
        console.log('getBaiduToken提示fail', res);
      }
    })
  },
  // 上传图片
  uploadImg: function () {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        // 路径转化为base64图片
        wx.getFileSystemManager().readFile({
          filePath: tempFilePaths[0],
          encoding: 'base64',
          success: res => {
            // console.log('读图片数据pass', res.data);
            that.scanImageInfo(res.data);
          },
          fail: res => {
            console.log('读图片数据fail', res.data);
          }
        })
      }
    })
  },
  // 扫描图片中的数据
  scanImageInfo: function (imageData) {
    let that = this;
    const detecUrl = 'https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=' + this.data.baiduToken;

    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: detecUrl,
      data: {
        image: imageData,
        id_card_side: 'front'
      },
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log('success', res.data)
        this.setData({
          message: res.data.words_result,
          address: res.data.words_result.住址.words,
          name: res.data.words_result.姓名.words,
          sex: res.data.words_result.性别.words,
          codeText: res.data.words_result.公民身份号码.words,
          nation: res.data.words_result.民族.words
        })
      },
      fail: res => {
        console.log('fail')
      },
      complete: res => {
        wx.hideLoading();
      }
    })
  },

  addImg(){
    wx.chooseImage({
      count: 1,
      sizeType: [ 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.uploadFile({
          url: 'https://tc.mg.cool/api/v1/peoplephoto', 
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            const data = res.data
            //do something
            console.log(data)
          }
        })
      }
    })
  },

  //提交
  submitCell(e){
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBaiduToken();
    this.getVillage()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.bellInitialize()
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