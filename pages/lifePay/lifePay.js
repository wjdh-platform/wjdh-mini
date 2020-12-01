// pages/lifePay/lifePay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cellList:[
      {id:0,
        cellName:'请选择'
        },
      {id:1,
      cellName:'晨曦家园'
      }
    ],
    cellListIdx:0,
    currentTab:0,
    payList: [
      { payName:'物业费',time:'2019年度',payNum:'¥2660' },
      { payName:'水费',time:'暂无账单',payNum:'¥2660' ,checked: 'true' },
      { payName:'电费',time:'暂无账单',payNum:'¥2660'},
      { payName:'燃气费',time:'暂无账单',payNum:'¥2660' },
      { payName:'停车费',time:'暂无账单',payNum:'¥2660' },
    ]
  },

  payListChange(e){
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  bindChangeCell(e){
    this.setData({
      cellListIdx:e.detail.value
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