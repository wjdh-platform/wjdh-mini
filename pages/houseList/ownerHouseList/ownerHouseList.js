// pages/houseList/ownerHouseList/ownerHouseList.js

const app = getApp();
import * as api from '../../../api/api'
import utils from '../../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listType:false,
    changeCellType:false,
    title:'',
    false:false,
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

  bindListDetail(e){
    console.log(e.currentTarget.dataset)
    let id = e.currentTarget.dataset.houseid?e.currentTarget.dataset.houseid:'',
         shenhe_id = e.currentTarget.dataset.shenheid?e.currentTarget.dataset.shenheid:'',
         role = e.currentTarget.dataset.role?e.currentTarget.dataset.role:''
         if(role == '业主'||shenhe_id){
          wx.redirectTo({
            url: '/pages/houseDetails/houseDetails?houseId='+id+'&role='+role+'&shenhe_id='+shenhe_id,
          })
         }else if(role != '业主'){
          utils.showToast('只有业主才能查看房屋详情','none')
         }
  },

  //获取列表
  housesList(){
    let t = this
    // return new Promise((resolve, reject) => {
    api.housesList({},(res)=>{
      if(res.data.code == 0){
        let list = res.data.data
        if(list.length === 0){
          t.setData({
            listType: false
          })
        }else{
          for(let i = 0; i<list.length;i++){
            switch(list[i].status){
              case 0: 
              list[i].statusVal = '未通过审核'
              break;
              case 1: 
              list[i].statusVal = '已通过审核'
              break;
              case 2: 
              list[i].statusVal = '待审核'
              break;
            }
          }
          t.setData({
            listType: true,
          })
        
        t.setData({
          houseList:list,
        })
      }
      }
      
    })
  // })
  },

  // housesList: function() {
  //   let parmas = {},
  //        t = this
  //        housesList(parmas).then((res)=> {
  //     console.log(res)
  //     if(res.data.code == 0){
  //       let list = res.data.data
  //       if(list.length === 0){
  //         t.setData({
  //           listType: false
  //         })
  //       }else{
  //         for(let i = 0; i<list.length;i++){
  //           switch(list[i].status){
  //             case 0: 
  //             list[i].statusVal = '未通过审核'
  //             break;
  //             case 1: 
  //             list[i].statusVal = '已通过审核'
  //             break;
  //             case 2: 
  //             list[i].statusVal = '待审核'
  //             break;
  //           }
  //         }
  //         t.setData({
  //           listType: true,
  //         })
        
  //       t.setData({
  //         houseList:list,
  //       })
  //     }
  //     }
  //   })
  // },


  // async init () {
  //   await utils.token()
  //   await this.housesList()
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.init()
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
    
    this.housesList()
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