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
    codeBtnTextYZ:'获取验证码',
    moreText:'点击添加更多',
    popupType:true,
    moreType:false,
    shipType:false,
    phoneVal:'',
    currentTime:61,
    currentTimeYZ:61,
    codeVal:'',
    villageIdx:0,
    buildingsIdx:0,
    unitsIdx:0,
    floorIdx:0,
    roomIdx:0,
    fwytIdx: 0,
    fwxzIdx: 0,
    jzxzIdx: 0,
    zhlxIdx: 0,
    sfdbIdx: 0,
    twjrIdx: 0,
    sfjlIdx: 0,
    zzmmIdx:0,
    shipIdx:0,
    photoBase64:'',
    verificationPhoneVal:'验证手机号',
    buildingsType:true,
    unitsType:true,
    floorType:true,
    roomType:true,
    cellDetail:true,
    cellList:false,
    pagesType:false,
    ownerType:false,
    codeAgain:true,
    codeAgainYZ:true,
    pageType:true
  },
  bindFwyt(e){
    this.setData({
      fwytIdx:e.detail.value
    })
  },

  bindFwxz(e) {
    this.setData({
      fwxzIdx: e.detail.value
    })
  },

  bindShip(e){
    let t = this
    if(e.detail.value!="0"){
      t.setData({
        ownerType: false
      })
      
    }

    t.setData({
      shipIdx: e.detail.value
    })
    
  },

  bindJzxz(e) {
    this.setData({
      jzxzIdx: e.detail.value
    })
  },

  bindZhlx(e) {
    this.setData({
      zhlxIdx: e.detail.value
    })
  },

  bindSfdb(e) {
    this.setData({
      sfdbIdx: e.detail.value
    })
  },

  bindTwjr(e) {
    this.setData({
      twjrIdx: e.detail.value
    })
  },
  bindZzmm(e) {
    this.setData({
      zzmmIdx: e.detail.value
    })
  },

  bindSfjl(e) {
    this.setData({
      sfjlIdx: e.detail.value
    })
  },

  checkMoreBtn(){
    this.setData({
      moreType:!this.data.moreType
    })
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

  //业主验证码失焦
  codeBlurYZ(e) {
    this.setData({
      codeValYZ: e.detail.value
    })
  },

  //业主获取验证码
  obtainCodeYZ() {
    var that = this;
    var phone = that.data.yezhuOldPhone;
    var currentTime = that.data.currentTimeYZ
    if(that.data.codeAgainYZ){
      that.setData({
        codeAgainYZ:false
      })
      api.getCode({
        phone: that.data.yezhuOldPhone,
        type: "verify",
      }, (res) => {
        if (res.data.code == 1) {
          utils.showToast(res.data.msg, "none")
          return
        } else {
          that.setData({
            getCodeKeyLoginYZ: res.data.key
          })
          utils.showToast("短信验证码已发送", "none")
          var interval = setInterval(function () {
            currentTime--;
            that.setData({
              codeBtnTextYZ: currentTime + 's',
            })
            if (currentTime <= 0) {
              clearInterval(interval)
              that.setData({
                codeBtnTextYZ: '重新发送',
                currentTimeYZ: 61,
                codeAgainYZ:true
              })
            }
          }, 1000);
          that.setData({
            clearInterval: interval
          })
        }
      })
    }
    // };
  },

  //获取验证码
  obtainCode() {
    var that = this;
    var phone = that.data.phoneVal;
    var currentTime = that.data.currentTime
    if(that.data.codeAgain){
      that.setData({
        codeAgain:false
      })
    if (phone == '') {
      utils.showToast("手机号码不能为空", "none")
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      utils.showToast("请输入正确的手机号", "none")
    } else {
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
          var interval = setInterval(function () {
            currentTime--;
            that.setData({
              codeBtnText: currentTime + 's',
            })
            if (currentTime <= 0) {
              clearInterval(interval)
              that.setData({
                codeBtnText: '重新发送',
                currentTime: 61,
                codeAgain: true
              })
            }
          }, 1000);
          that.setData({
            clearInterval: interval
          })
        }
      })
    }
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
        if(res.data.code == 0){
          utils.showToast(res.data.msg,"none")
          t.setData({
            popupType: false
          })
          wx.navigateTo({
            url: '/pages/houseList/ownerHouseList/ownerHouseList',
          })
        }else if(res.data.code == 1){
          utils.showToast(res.data.msg,"none")
        }else{
          t.setData({
            popupType: false
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
    if (t.data.villageIdx!=idx){
      t.setData({
        buildingsType:false,
        unitsType: false,
        floorType: false,
        roomType: false,
      })
    }
    t.setData({
      villageIdx: idx
    })
    api.getBuildings({ id: list[idx].community_identifier},(res)=>{
      let data = res.data
      if(data.code == 0){
        utils.showToast(res.data.message,"none")
      }else if(data.code == 1&&data.data.length>0){
        let list = [],
          oldList = data.data
        list = oldList.unshift({ building_name: '请选择' })
        t.setData({
          buildingsList: oldList,
          buildingsType:true,
          unitsType: true,
          floorType: true,
          roomType: true,
        })
      }
    })
  },

  //选择楼栋
  bindBuildingsList(e) {
    let t = this,
      list = t.data.buildingsList,
      idx = e.detail.value
    if (t.data.villageIdx != idx) {
      t.setData({
        unitsType: false,
        floorType: false,
        roomType: false,
      })
    }
    t.setData({
      buildingsIdx: e.detail.value
    })
    api.getUnits({ id: list[idx].id }, (res) => {
      let data = res.data
      if (data.code == 0) {
        utils.showToast(res.data.message, "none")
      } else if (data.code == 1&&data.data.length>0) {
        let list = [],
          oldList = data.data
        list = oldList.unshift({ unit_name: '请选择' })
        t.setData({
          unitsList: oldList,
          unitsType: true,
          floorType: true,
          roomType: true,
        })
      }
    })
  },
  //选择单元
  bindUnitsList(e) {
    let t = this,
      list = t.data.unitsList,
      idx = e.detail.value
    if (t.data.villageIdx != idx) {
      t.setData({
        floorType: false,
        roomType: false,
      })
    }
    t.setData({
      unitsIdx: e.detail.value
    })
    api.getFloor({ id: list[idx].id }, (res) => {
      let data = res.data
      if (data.code == 0) {
        utils.showToast(res.data.message, "none")
      } else if (data.code == 1&&data.data.length>0) {
        let list = [],
          oldList = data.data
        list = oldList.unshift({ floor_name: '请选择' })
        t.setData({
          floorList: oldList,
          floorType: true,
          roomType: true,
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
        let list = [],
          oldList = data.data
        list = oldList.unshift({ house_name: '请选择' })
        t.setData({
          roomList: oldList
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
      if (data.code == 1) {
        utils.showToast(res.data.msg, "none")
      } else if (data.code == 0) {
        t.setData({
          encryptionPhone:data.data.phone,
          yezhuOldPhone: data.data.people_phone
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
        if(!t.data.pageType){
          let arr = res.data.data.role,
               arrChange=arr.shift()
          console.log(arr)
          console.log(arrChange)
        }
        t.setData({
          dataList: res.data.data
        })
      }
    })
  },


  launchAppError(e) {
    console.log(e.detail.errMsg)
  },
  // 获取百度access_token
  // getBaiduToken: function () {
  //   const apiKey = 'aEo4u7peePL39qjpEfYbc7Dv';
  //   const seckey = 'pozj20ovr7SSudqyAKQFPjQFGEL8sx6o';
  //   const tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${seckey}`;

  //   let that = this;
  //   wx.request({
  //     url: tokenUrl,
  //     method: 'POST',
  //     dataType: 'json',
  //     header: {
  //       'content-type': 'application/json; charset=UTF-8'
  //     },
  //     success: function (res) {
  //       console.log('getBaiduToken提示pass', res);
  //       that.setData({
  //         baiduToken: res.data.access_token
  //       })
  //     },
  //     fail: function (res) {
  //       console.log('getBaiduToken提示fail', res);
  //     }
  //   })
  // },
  // 上传图片
  uploadImg: function () {
    let t = this;
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
            console.log('data:image/png;base64,' + res.data)
            api.idcard({
              image: res.data
            },(res)=>{
              console.log(res.data.data)
              t.setData({
                idcardData:res.data.data
              })
            })
          },
          fail: res => {
            console.log('读图片数据fail', res.data);
          }
        })
      }
    })
  },
  // 扫描图片中的数据
  // scanImageInfo: function (imageData) {
  //   let that = this;
  //   const detecUrl = 'https://yixi.market.alicloudapi.com/ocr/idcard';
  //   wx.showLoading({
  //     title: '加载中',
  //   });
  //   wx.request({
  //     url: detecUrl,
  //     data: {
  //       image: imageData,
  //       side: 'front'
  //     },
  //     method: 'POST',
  //     header: {
  //       'Authorization': 'APPCODE 498b3a6f9e484f5fbbacf77e4a3f147c'
  //     },
  //     success: res => {
  //       console.log(res)

  //     },
  //     fail: res => {
  //       console.log('fail')
  //     },
  //     complete: res => {
  //       wx.hideLoading();
  //     }
  //   })
  // },



  addImg(e) {
    var _this = this,
          data = _this.data
          if(data.roomIdx == 0){
            utils.showToast('请先选择要绑定的房子','none')
            return
          }
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function (photo) {
        wx.getImageInfo({
          src: photo.tempFilePaths[0],
          success: function (res) {
            console.log(res)
            var ctx = wx.createCanvasContext('photo_canvas');
            var ratio = 0;
            var canvasWidth = res.width
            var canvasHeight = res.height;
            _this.setData({
              aaa: photo.tempFilePaths[0],
              canvasWidth2: res.width,
              canvasHeight2: res.height
            })
            // 保证宽高均在200以内
            while (canvasWidth > 300 || canvasHeight > 300) {
              //比例取整
              canvasWidth = Math.trunc(res.width / ratio)
              canvasHeight = Math.trunc(res.height / ratio)
              ratio++;
            }
            _this.setData({
              canvasWidth: canvasWidth,
              canvasHeight: canvasHeight
            }) //设置canvas尺寸
            ctx.drawImage(photo.tempFilePaths[0], 0, 0, canvasWidth, canvasHeight) //将图片填充在canvas上
            ctx.draw()
            //下载canvas图片
            setTimeout(function () {
              wx.canvasToTempFilePath({
                canvasId: 'photo_canvas',
                success: function (res) {
                  console.log(res.tempFilePath)
                  _this.setData({
                    imgSrc: res.tempFilePath
                  })
                  wx.uploadFile({
                    filePath: res.tempFilePath,
                    formData:{
                      'community_identifier':data.villageList[data.villageIdx].community_identifier,
                      'building_number':data.buildingsList[data.buildingsIdx].building_number,
                      'unit_number':data.unitsList[data.unitsIdx].unit_number,
                      'floor_number':data.floorList[data.floorIdx].floor_number,
                      'house_number':data.roomList[data.roomIdx].house_number
                    },
                    name: 'file',
                    url: 'https://tc.mg.cool/api/v1/people/photo',
                    success(res){
                      // console.log(JSON.parse(res.data))
                      let data = JSON.parse(res.data)
                      _this.setData({
                        photoUrl:data.data
                      })
                    }
                  })
                },
                fail: function (error) {
                  console.log(error)
                }
              },_this)
            }, 100)
          },
          fail: function (error) {
            console.log(error)
          }
        })
      },
      error: function (res) {
        console.log(res);
      }
    })
  },

  delPhoto(){
    this.setData({
      imgSrc:''
    })
  },

  radioChange(e){
    let t = this
    if(e.detail.value == "1"){
      t.setData({
        shipType:true,
        ownerType:true
      })
    }else{
      t.setData({
        shipType: false,
        ownerType:true
      })
    }
    
  },

  //提交
  submitCell(e){
    console.log(e)
    let t = this,
         val = e.detail.value,
         data = t.data,
         dataList =t.data.dataList,
         param = {
          phone:data.phoneVal,
          idcard: data.idcardData ? data.idcardData.idcard:val.IDNumber,
          name: data.idcardData ? data.idcardData.name:val.userName,
          // photo: data.photoBase64 == ''?'':'data:image/png;base64,'+data.photoBase64,
          photo: data.photoUrl ? data.photoUrl:'',
          sex: data.idcardData ? data.idcardData.gender:val.sex,
          birth: data.idcardData ? data.idcardData.birthday:val.birth,
          nation: data.idcardData ? data.idcardData.nation:val.nation,
          address: data.idcardData ? data.idcardData.address:val.address,
          zzmm: dataList.zzmm[data.zzmmIdx].key,
          tyjr: dataList.tyjr[data.twjrIdx].key,
          dibao:dataList.dibao[data.sfdbIdx].key,
          shangfang: dataList.shangfang[data.sfjlIdx].key,
          job:val.job,
          company:val.company,
          house_id: data.roomIdx == 0?'':data.roomList[data.roomIdx].id,
          role: dataList.role[data.shipIdx].key,
          status: dataList.status[data.jzxzIdx].key,
          use: dataList.use[data.fwytIdx].key,
          xingzhi: dataList.xingzhi[data.fwxzIdx].key,
          choice: val.radio?val.radio:'',
          type:dataList.type[data.zhlxIdx].key
        }
      api.yibiaosanshi(param,(res)=>{
        if(res.data.code == 1){
          utils.showToast(res.data.msg,'none')
        } else if (res.data.code == 0){
          utils.showToast(res.data.msg, 'none')
          wx.redirectTo({
            url: '/pages/houseList/ownerHouseList/ownerHouseList',
          })
        }
      })
      // }

    
  },

  verificationPhone(){
    let t = this
    api.yezhuCode({
      verification_key:t.data.getCodeKeyLoginYZ,
      verification_code: t.data.codeValYZ,
    },(res)=>{
      if(res.data.code == 0){
        utils.showToast(res.data.message,"none")
        t.setData({
          verificationPhoneVal:"验证成功"
        })
      }else{
        utils.showToast(res.data.message, "none")
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let t = this,
         roles = utils.getItem('userRoles')
    // t.getBaiduToken();
    this.bellInitialize()
    t.getVillage();
    if (roles.includes('NewMember')){
      t.setData({
        popupType:true
      })
    }else{
      t.setData({
        popupType: false
      })
    }
    switch (options.type){
      case "owner":
        t.setData({
          // pagesType:false //业主进入
        })
        break;
      case "family":
        t.setData({
          pageType: false //家属进入
        })
        break;
      case "cellList":
        t.setData({
          cellList: true //小区列表进入
        })
        break;
    }
    
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
