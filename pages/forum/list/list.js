// pages/forum/list/list.js
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
    currentTab: 1,
    groupType: false,
    categoriesType: true,
    pageIndex: 1,
    pageSize: 10,
    totalNum: 0,
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
    // reportPRType: false,
    // reportPType: false,
    // zanType:false,
    zanDe:'../../../static/icon/forum/zan.png',
    zanActive:'../../../static/icon/forum/zanActive.png',
    interactiveType:false
  },

  moreEvent(e) {
    let t = this,
    idx = e.currentTarget.dataset.idx
    t.setData({
      ['forumList['+idx+'].reportType']: true
    })
  },

  bindFollow(e) {
    let t = this,
    idx = e.currentTarget.dataset.idx,
    followType = 'forumList['+idx+'].followType'
    t.setData({
      [followType]:!t.data.forumList[idx].followType
    })
    if(t.data.forumList[idx].followType){
      //走接口关注
    }else{
      //取消关注
    }
  },

  zanTypeR(e){
    let idx = e.currentTarget.dataset.idx,
         index = e.currentTarget.dataset.index
    this.setData({
      ['forumList['+index+'].replies['+idx+'].zanTypeR']:!this.data.forumList[index].replies[idx].zanTypeR
    })
  },

  reportPR(e) {
    let  t = this,
    idx = e.currentTarget.dataset.idx
    t.setData({
      ['forumList['+idx+'].reportPopType']: true,
    })
  },

  replyReport(e){
    let  t = this,
    idx = e.currentTarget.dataset.idx,
    index = e.currentTarget.dataset.index
    t.setData({
      ['forumList['+index+'].replies['+idx+'].reportTypeR']:true
    })
  },

  replyPClose(e) {
    let t = this,
    idx = e.currentTarget.dataset.idx
    t.setData({
      ['forumList['+idx+'].reportPopType']: false,
      ['forumList['+idx+'].reportType']: false,
    })
  },
  bindZan(e){
    let idx = e.currentTarget.dataset.idx,
         zanType = 'forumList['+idx+'].zanType'
    this.setData({
      [zanType]:!this.data.forumList[idx].zanType
    })
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
      t.getForumList({
        community_identifier: villageList[villageIdx].community_identifier,
        page: t.data.pageIndex,
        per_page: 10
      })
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

  closeBtn(res) {
    this.setData({
      changeCellType: res.detail
    })
  },

  tabTap(e) {
    var t = this,
      idx = e.currentTarget.dataset.idx,
      villageIdx = utils.getItem('villageIdx'),
      villageList = utils.getItem('villageList')
    console.log(e.target.dataset.current)

    if (t.data.currentTab === e.target.dataset.current) {
      if (e.target.dataset.current == 1) {
        t.setData({
          groupType: !t.data.groupType
        })
        return
      }
      return false;
    } else {
      t.setData({
        currentTab: e.target.dataset.current,
        groupType: false
      })
    }
  },

  forumDetails(e){
    let t = this,
    idx = e.currentTarget.dataset.idx
    // t.setData({
      wx.navigateTo({
        url: '/pages/forum/details/details',
      })
    // })
  },

  cancelBtn(){
    let list = this.data.forumList
    list.forEach((item)=>{
      item.replyType=false
    })
    this.setData({
      forumList:list
    })
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
      ['forumList['+index+'].reportPopType']: false,
      ['forumList['+index+'].reportType']: false
    })  
  },

  reportReplyCol(e){
    let t = this,
    idx = e.currentTarget.dataset.idx,
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
    })
  },


  bindReply(e){
    let t = this,
    idx = e.currentTarget.dataset.idx
    t.setData({
      ['forumList['+idx+'].replyType']:true,
      ['forumList['+idx+'].focusType']:true
    })
  },

  textareaFocus(e){
    // console.log(e)
    let height = e.detail.height
    console.log(e)
    this.setData({
      popHeight:height
    })
  },

  textareaBlur(e){
    this.setData({
      popHeight:0
    })
  },

  getForumList(param) {
    api.forumList(param, (res) => {
      let data = res.data,
        list = data.data,
        t = this
      if (data.code == 0) {
        if(list.length == 0){
          t.setData({
            forumList:[]
          })
        }else{
          //给列表初始化交互状态
        list.forEach((item) => {
          item.topic_images = JSON.parse(item.topic_images)
          if (item.topic_content.length > 100) {
            item.topic_content_sub = item.topic_content.substr(4, 95) + '...'
            item.contentType = true
          } else {
            item.topic_content_sub = ''
          }
          item.zanType = false;
          item.followType = true;
          item.replyType = false;
          item.focusType = false;
          item.reportType = false;
          item.reportPopType = false;
        })
        //给评论列表初始化状态
        for(let i = 0;i < list.length; i++){
          for(let j = 0;j < list[i].replies.length; j++){
            list[i].replies[j].zanTypeR = false
            list[i].replies[j].reportTypeR = false
          }
        }
        let arr = [];
        if (t.data.pageIndex == 1) {
          arr = list;
        } else {
          arr = t.data.forumList.concat(list);
        }
        t.setData({
          forumList: arr,
          totalNum: res.data.pages.total,
          pageSize: res.data.pages.per_page,
        })
      }
      }
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

  listImages(e) {
    let idx = e.currentTarget.dataset.idx,
      list = e.currentTarget.dataset.list
    console.log(idx)
    console.log(list)
    wx.previewImage({
      current: list[idx], // 当前显示图片的http链接
      urls: list // 需要预览的图片http链接列表
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
    t.getForumList({
      community_identifier: t.data.villageList[t.data.villageIdx].community_identifier,
      category_id: dataList[idx].id,
      page: t.data.pageIndex,
      per_page: 10
    })
  },

  listMoreCont(e){
    console.log(e.currentTarget.dataset.idx)
    let idx = e.currentTarget.dataset.idx,
         contentType = 'forumList['+idx+'].contentType'
    // if(this.data.forumList[idx].contentType){

    // }
    this.setData({
      [contentType]:!this.data.forumList[idx].contentType
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
    let villageList = utils.getItem('villageList'),
      villageIdx = utils.getItem('villageIdx'),
      t = this
    t.getForumList({
      community_identifier: villageList[villageIdx].community_identifier,
      page: t.data.pageIndex,
      per_page: 10
    })
    t.categories()
    t.setData({
      navH: app.globalData.navHeight,
      villageIdx,
      villageList
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
    let t = this
    if (t.data.pageIndex < Math.ceil(t.data.totalNum / t.data.pageSize)) {
      t.data.pageIndex++;
      t.setData({
        pageIndex: t.data.pageIndex
      }, function () {
        t.getForumList({
          community_identifier: t.data.villageList[t.data.villageIdx].community_identifier,
          page: t.data.pageIndex,
          per_page: 10
        })
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
