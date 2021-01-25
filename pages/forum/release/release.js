// pages/forum/release/release.js
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
    count:4,
    uploadUrl: app.servers+ 'api/v1/forum/image',
    showUrl:'',
    groupingType:false,
    categoriesType:true,
    max: 2000,
  },

  introduction(e){
    var value = e.detail.value;
    var len = parseInt(value.length);
    if (len > this.data.max) return;
    this.setData({
      currentWordNumber: len, //当前字数 
      text_value: value
    });
   },

  changeClose(res) {
    let villageList = utils.getItem('villageList'),
    villageIdx = utils.getItem('villageIdx'),
    t = this
  if(villageIdx&&villageIdx!=0){
    t.setData({
      villageList,
      villageIdx
    })
    // t.houseExist({community_identifier:villageList[villageIdx].community_identifier})
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

bindCategories(e){
  console.log(e.currentTarget.dataset.idx)
  let  t = this,
        idx = e.currentTarget.dataset.idx,
       dataList = t.data.categoriesData
    dataList[idx].isShow = !dataList[idx].isShow
    if (dataList[idx].isShow) {
      t.packUp(dataList, idx);
    }
    t.setData({
      categoriesData: dataList,
      categoriesIdx:idx,
      categoriesType:false,
      groupingType:false
    })
  },
  packUp(data, index) {
    for (let i = 0, len = data.length; i < len; i++) {
      if (index != i) {
        data[i].isShow = false
      }
    }
  },


myEventListener:function(e){
  console.log("上传的图片结果集合")
  console.log(e.detail.picsList)
  this.setData({
    imgArr: e.detail.picsList
  })
 },

 categories(){
   api.categories({},(res)=>{
     let data = res.data
     data.data.forEach(item => {
      item.isShow = false;
    })
    //  for(let i = 0;i <data.data.length;i++){
    //   data.data[0].isShow = true
    //  }
     this.setData({
      categoriesData:data.data
     })
   })
 },

 bindGroup(){
   this.setData({
    groupingType:true
   })
 },


 formSubmit(e){
  console.log(e)
  let t = this,
  val = e.detail.value
  console.log(val.title.length)
  if(t.data.categoriesType){
    utils.showToast('必须选择分组','none')
    return
  }else if(val.title==''){
    utils.showToast('请输入标题（4～100个汉字）','none')
    return
  }else if(val.title.length>100||val.title.length<4){
    utils.showToast('标题字数为 4～100 个','none')
    return
  }
  else if(val.content==''){
    utils.showToast('请输入论坛内容（4～2000个汉字）','none')
    return
  }
  else if(val.content.length>2000||val.content.length<4){
    utils.showToast('论坛内容字数为 4～2000 个','none')
    return
  }else{
    let param = {
      community_identifier: t.data.villageList[t.data.villageIdx].community_identifier,
      title: val.title,
      content: val.content,
      // category_id: t.data.categoriesData[t.data.categoriesIdx].id,
      category_id:1,
      images: JSON.stringify(t.data.imgArr)
    }
    api.submitTopic(param,(res)=>{
      let data = res.data
      if(data.code == 0){
        utils.showToast(data.msg,'none')
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
    let villageList = utils.getItem('villageList'),
         villageIdx = utils.getItem('villageIdx')
    this.setData({
      navH: app.globalData.navHeight,
      villageIdx,
      villageList
    })
    this.categories()
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