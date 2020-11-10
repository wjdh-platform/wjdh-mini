// pages/property/property.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList:[],
    baiduToken: '',
    message:''
  },


  updateImg(){
    let t = this
    wx.chooseImage({
      success: function(res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        var imgList = []
        imgList.push(tempFilePaths)
        t.setData({
          imageList:imgList.concat(t.data.imageList)
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
        console.log('success', res.data.words_result.住址.words)
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBaiduToken();
    wx.login({
      success(res) {
        if (res.code) {
          console.log('登录成功！' + res.code)
        } else {
          console.log('登录失败！' + res.errMsg)
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