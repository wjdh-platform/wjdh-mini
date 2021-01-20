// pages/forum/details/details.js
const app = getApp();
import * as api from '../../../api/api'
import utils from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    changeCellType: false,
    title: '',
    backType:true,
    zanDe:'../../../static/icon/forum/zan.png',
    zanActive:'../../../static/icon/forum/zanActive.png',
    groupType:false,
    categoriesType:true,
    reportType:false,
    reportPopType:false,
    replyRCol: [{
      name: '垃圾广告信息',
      isShow: false
    },
    {
      name: '色情、低俗',
      isShow: false
    },
    {
      name: '涉嫌侵权',
      isShow: false
    },
    {
      name: '恐怖恶心',
      isShow: false
    },
    {
      name: '辱骂、人身攻击',
      isShow: false
    },
    {
      name: '违法信息',
      isShow: false
    }
  ],
  },
  changeClose(res) {
    let villageList = utils.getItem('villageList'),
      villageIdx = utils.getItem('villageIdx'),
      t = this
    if (villageIdx && villageIdx != 0) {
      t.setData({
        villageList,
        villageIdx
      })
      // t.getForumList({
      //   community_identifier: villageList[villageIdx].community_identifier,
      //   page: t.data.pageIndex,
      //   per_page: 10
      // })
    }
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

  moreFun(){
    this.setData({
      reportType:true
    })
  },

  reportPR(){
    this.setData({
      reportPopType:true
    })
  },

  categories() {
    api.categories({}, (res) => {
      let data = res.data
      let oldList = data.data,
        list = []
      list = oldList.unshift({
        category_name: '全部'
      })
      oldList.forEach(item => {
        item.isShow = false;
      })
      this.setData({
        categoriesData: oldList
      })
    })
  },

  fenleiBind(e){
    console.log(e)
    this.setData({
      groupType:true
    })
  },

  bindCategories(e) {
    let t = this,
      idx = e.currentTarget.dataset.idx,
      dataList = t.data.categoriesData
    dataList[idx].isShow = !dataList[idx].isShow
    if (dataList[idx].isShow) {
      utils.packUp(dataList, idx);
    }
    t.setData({
      categoriesData: dataList,
      categoriesIdx: idx,
      categoriesType: false,
      groupType: false
    })
    // t.getForumList({
    //   community_identifier: t.data.villageList[t.data.villageIdx].community_identifier,
    //   category_id: dataList[idx].id,
    //   page: t.data.pageIndex,
    //   per_page: 10
    // })
  },

  replyRColBind(e) {
    let t = this,
    index = e.currentTarget.dataset.index,//父层索引
    idx = e.currentTarget.dataset.idx,//子层索引
      dataList = t.data.replyRCol
      dataList.forEach((item)=>{
        item.isShow = false
      })
    dataList[idx].isShow = !dataList[idx].isShow
    if (dataList[idx].isShow) {
      utils.packUp(dataList, idx);
    }
    t.setData({
      replyRCol: dataList,
      reportPopType: false,
      reportType: false
    })  
  },

  replyPClose(){
    this.setData({
      reportPopType: false,
      reportType: false
    }) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = this
    t.setData({
      navH: app.globalData.navHeight,
    })
    t.categories()
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