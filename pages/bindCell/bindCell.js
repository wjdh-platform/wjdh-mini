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
    pageType:true,
    photoUrl:'',
    inputDisable:true,
    // placeholder:'业主只能是使用拍照识别身份证',
    villageIdxP:0
  },

  bindvillageListP(e){
    this.setData({
      villageIdxP:e.detail.value
    })
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

  inputDis(e){
    utils.showToast('业主只能是使用拍照识别身份证','none')
  },

  bindShip(e){
    let t = this
    console.log(e.detail.value)
    if(e.detail.value!="0"){
      t.setData({
        ownerType: false,
        inputDisable:false,
        // placeholder:'请输入'
      })
    }else{
      t.setData({
        ownerType: true,
        inputDisable:true,
        // placeholder:'业主只能是使用拍照识别身份证'
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
    let t = this;
    t.setData({
      moreType:!this.data.moreType,
    })
    if(t.data.moreType){
      t.setData({
        moreText: '收起',
      })
    }else{
      t.setData({
        moreText: '点击查看更多',
      })
    }
    
  },

  //关闭弹层
  closePopup(){
    this.setData({
      popupType:false
    })
  },

  //手机号失焦
  phoneBlur(e){
    let t = this
    if(e.detail.value.length == 11){
      if (!/^1[3456789]\d{9}$/.test(e.detail.value)) {
        utils.showToast("请输入正确的手机号","none")
      }else{
        t.setData({
          phoneVal: e.detail.value
        })
      }
    }else{
      t.setData({
        phoneVal: e.detail.value
      })
      
    }
  },


  //验证码失焦
  codeBlur(e){
    if(e.detail.value.length == 4){
      this.setData({
        codeVal: e.detail.value
      })
    }
    
  },

  //业主验证码失焦
  codeBlurYZ(e) {
    this.setData({
      codeValYZ: e.detail.value
    })
  },

  //业主获取验证码
  obtainCodeYZ() {
    let that = this,
         data = that.data,
         phone = data.yezhuOldPhone,
         currentTime = data.currentTimeYZ,
         villageName = data.villageList[data.villageIdx].community_name,
         buildingName = data.buildingsList[data.buildingsIdx].building_name,
         unitsName = data.unitsList[data.unitsIdx].unit_name,
         floorName = data.floorList[data.floorIdx].floor_name,
         roomName = data.roomList[data.roomIdx].house_name
    if(data.codeAgainYZ){
      api.getCode({
        phone: phone,
        type: "yezhu",
        community_house_name: villageName+buildingName+unitsName+floorName+roomName
      }, (res) => {
        if (res.data.code == 1) {
          utils.showToast(res.data.msg, "none")
          return
        } else {
          that.setData({
            getCodeKeyLoginYZ: res.data.key,
            codeAgainYZ:false
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
            getCodeKeyLogin: res.data.key,
            codeAgain: false
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
  }
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
        verification_code:t.data.codeVal,
        id:t.data.villageList[t.data.villageIdxP].community_identifier
      },(res)=>{
        if(res.data.code == 0){
          utils.showToast(res.data.msg,"none")
          t.setData({
            popupType: false
          })
          wx.redirectTo({
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
        buildingsIdx:0,
        unitsIdx:0,
        floorIdx:0,
        roomIdx:0,
      })
    }
    t.setData({
      villageIdx: idx
    })
    api.getBuildings({ id: list[idx].community_identifier},(res)=>{
      let data = res.data
      if(data.code == 1){
        utils.showToast(res.data.message,"none")
      }else if(data.code == 0&&data.data.length>0){
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
    if (t.data.buildingsIdx != idx) {
      t.setData({
        unitsType: false,
        floorType: false,
        roomType: false,
        unitsIdx:0,
        floorIdx:0,
        roomIdx:0,
      })
    }
    t.setData({
      buildingsIdx: e.detail.value
    })
    api.getUnits({ id: list[idx].id }, (res) => {
      let data = res.data
      if (data.code == 1) {
        utils.showToast(res.data.message, "none")
      } else if (data.code == 0&&data.data.length>0) {
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
    if (t.data.unitsIdx != idx) {
      t.setData({
        floorType: false,
        roomType: false,
        floorIdx:0,
        roomIdx:0,
      })
    }
    t.setData({
      unitsIdx: e.detail.value
    })
    api.getFloor({ id: list[idx].id }, (res) => {
      let data = res.data
      if (data.code == 1) {
        utils.showToast(res.data.message, "none")
      } else if (data.code == 0&&data.data.length>0) {
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
      if (t.data.floorIdx != idx) {
        t.setData({
          roomType: false,
          roomIdx:0,
        })
      }
    t.setData({
      floorIdx: e.detail.value
    })
    api.getRoom({ id: list[idx].id }, (res) => {
      let data = res.data
      if (data.code == 1) {
        utils.showToast(res.data.message, "none")
      } else if (data.code == 0) {
        let list = [],
          oldList = data.data
        list = oldList.unshift({ house_name: '请选择' })
        t.setData({
          roomList: oldList,
          roomType: true,
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
      }else{
        t.setData({
          pageType:false,
          ownerType:true,
          shipType:true,
          encryptionPhone:'',
          yezhuOldPhone:''
        })
      }
    })
  },

  //获取小区名字
  getVillage(){
    let t = this
    api.getVillage({},(res)=>{
      if(res.data.code == 0){
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
      if (res.data.code == 0) {
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
            // console.log('data:image/png;base64,' + res.data)
            api.idcard({
              image: res.data
            },(res)=>{
              // console.log(res.data.data)
              if(res.data.data){
                t.setData({
                  idcardData:res.data.data,
                  inputDisable:false
                })
              }
              t.setData({
                
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
            // console.log(res)
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
                  // console.log(res.tempFilePath)
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
                      // console.log(data)
                      
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
      imgSrc:'',
      'examineData.photo': '',
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
        ownerType:true,
        pageType:false
      })
    }
    
  },

  //提交
  submitCell(e){
    console.log(e)
    console.log(this.data.photoUrl )
    let t = this,
         val = e.detail.value,
         data = t.data,
         dataList =data.dataList,
         
         param = {
          phone:data.phoneVal?data.phoneVal:val.phone,
          idcard: data.idcardData ? data.idcardData.idcard:val.IDNumber,
          name: data.idcardData ? data.idcardData.name:val.userName,
          // photo: data.photoBase64 == ''?'':'data:image/png;base64,'+data.photoBase64,
          photo: data.photoUrl ? data.photoUrl:'',
          sex: data.idcardData ? data.idcardData.gender:'',
          // birth: data.idcardData ? data.idcardData.birthday:val.birth,
          nation: data.idcardData ? data.idcardData.nation:'',
          address: data.idcardData ? data.idcardData.address:'',
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
          choice: val.radio?val.radio:'1',
          type:dataList.type[data.zhlxIdx].key
        }
        if(data.photoUrl == ''){
          wx.showLoading({
            title: '人脸照片上传中...',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
          
          return
        }
      api.yibiaosanshi(param,(res)=>{
        if(res.data.code == 1){
          utils.showToast(res.data.msg,'none')
        } else if (res.data.code == 0){
          utils.showToast(res.data.msg, 'none')
          utils.setItem('examineData',res.data.shenhe_data)
          utils.setItem('userRoles',res.data.data)
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
          verificationPhoneVal:"验证成功",
          pageType:false
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
    let t = this,
         roles = utils.getItem('userRoles'),
         examineData = utils.getItem('examineData')
         utils.token()
    // t.getBaiduToken();
    setTimeout(()=>{
      t.bellInitialize();
      t.getVillage();
    },300)
    if(examineData){
      t.setData({
        examineData
      })
    }
    
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
