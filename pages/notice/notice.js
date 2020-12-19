// pages/notice/notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{
      title:'温馨提示——请注意厨房用火安全',
      wyName:'晨曦家园物业',
      time:'一天前'
    },{
      title:'关于高空抛物的温馨提示',
      wyName:'晨曦家园物业',
      time:'2020年11月20日'
    },{
      title:'关于小区停水的通知',
      wyName:'晨曦家园物业',
      time:'2020年10月5日'
    },{
      title:'国庆节放假的温馨提示',
      wyName:'晨曦家园物业',
      time:'2020年9月29日'
    }],

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

  bindList(e){
    console.log(e)
    let idx = e.currentTarget.dataset.idx
    wx.navigateTo({
      url: '/pages/notice/details/details?idx='+idx,
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