// pages/property/property.js
const app = getApp();
import * as api from '../../api/api'
import utils from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        text: '绑定房屋',
        icon: '/static/newImg/bdfw.png',
        isActive: false
      }, {
        text: '添加家属',
        icon: '/static/newImg/tjjs.png',
        isActive: false
      }, {
        text: '生活缴费',
        icon: '/static/newImg/shjf.png',
        isActive: false
      }, {
        text: '物业报修',
        icon: '/static/newImg/wybx.png',
        isActive: false
      }, {
        text: '车辆管理',
        icon: '/static/newImg/ytcc.png',
        isActive: false
      }, {
        text: '投诉建议',
        icon: '/static/newImg/tsjy.png',
        isActive: false
      }, {
        text: '公告通知',
        icon: '/static/newImg/ggtz.png',
        isActive: false
      }, {
        text: '应急电话',
        icon: '/static/newImg/yjdh.png',
        isActive: false
      }, {
        text: '我的体温',
        icon: '/static/newImg/wdtw.png',
        isActive: false
      }, {
        text: '体温上报',
        icon: '/static/newImg/twsb.png',
        isActive: false
      }, {
        text: '疫情举报',
        icon: '/static/newImg/yqjb.png',
        isActive: false
      },
      //   ,{
      //     text:'访客通行',
      //     icon:'/static/icon/fktx.jpg',
      // }

    ],
    codeBtnText: '获取验证码',
    phoneVal: '',
    currentTime: 61,
    codeAgain: true,
    villageIdx: 0,
    villageList: [],
    activationType: false,
    verificationName: '',
    popupTips: true,
    changeCellType: false,
    title: '',
    backType: false,
    navH: 0,
    index: 'index',
    shake: false,
    cellName: '',
    buttonClicked: false //防重复点击
  },

  cloud() {
    utils.showToast('除了记忆，什么都别带走。', 'none')
  },
  sun() {
    utils.showToast('朝着太阳生长，做一个温暖的人。', 'none')
  },
  iconOther() {
    utils.showToast('功能暂未开放，敬请期待。 ', 'none')
  },
  tree() {
    utils.showToast('小区是我家，绿化靠大家。 ', 'none')
    this.setData({
      shake: true
    })
    setTimeout(() => {
      this.setData({
        shake: false
      })
    }, 3000)
  },
  grass() {
    utils.showToast('请勿沾花惹草！    ', 'none')
  },

  bindNewsList(e) {
    let t = this,
      idx = e.currentTarget.dataset.idx
    wx.navigateTo({
      url: '/pages/property/newsDetails/newsDetails?idx=' + idx,
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
      t.houseExist({
        community_identifier: villageList[villageIdx].community_identifier
      })
    }
    this.setData({
      changeCellType: res.detail.changeCellType,
      cellName: res.detail.community_name
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

  closePopupTips() {
    this.setData({
      popupTips: false
    })
  },

  tipsNone() {
    this.setData({
      popupTips: false
    })
    utils.setItem("tipsNone", 'none')
  },

  //获取小区名字
  getVillage() {
    let t = this
    api.getVillage({}, (res) => {
      if (res.data.code == 0) {
        let list = [],
          oldList = res.data.data
        list = oldList.unshift({
          community_name: '请选择'
        })
        t.setData({
          villageList: oldList
        })
      }
    })
  },
  getPins() {
    let t = this
    api.getPins({}, (res) => {
      if (res.data.code == 0) {
        t.setData({
          pinsText: res.data.data
        })
      }
    })
  },
  //验证手机号
  verificationBtn() {
    let t = this
    // if (t.data.villageIdx == 0) {
    //   utils.showToast("请选择小区", "none")
    // }else
    if (t.data.verificationName == '') {
      utils.showToast("请输入姓名", "none")
    } else if (t.data.phoneVal == '') {
      utils.showToast("请输入手机号", "none")
    } else if (t.data.codeVal == '') {
      utils.showToast("请输入验证码，并点击验证按钮", "none")
    } else {
      api.jihuo({
        verification_key: t.data.getCodeKeyLogin,
        verification_code: t.data.codeVal,
        // id: t.data.villageList[t.data.villageIdx].community_identifier,
        name: t.data.verificationName
      }, (res) => {
        console.log('激活', res)
        if (res.data.code == 0) {
          utils.showToast(res.data.msg, "none")
          t.setData({
            activationType: false,
          })
          wx.navigateTo({
            url: '/pages/houseList/ownerHouseList/ownerHouseList',
          })
        } else if (res.data.code == 1) {
          utils.showToast(res.data.msg, "none")
        } else {
          utils.showToast(res.data.msg, "none")
          t.setData({
            activationType: false
          })
          wx.navigateTo({
            url: '/pages/property/property',
          })
        }
      })
    }
  },

  //手机号失焦
  phoneBlur(e) {
    let t = this
    if (e.detail.value.length == 11) {
      if (!/^1[3456789]\d{9}$/.test(e.detail.value)) {
        utils.showToast("请输入正确的手机号", "none")
      } else {
        t.setData({
          phoneVal: e.detail.value
        })
      }
    } else {
      t.setData({
        phoneVal: e.detail.value
      })

    }
  },


  //验证码失焦
  codeBlur(e) {
    if (e.detail.value.length == 4) {
      this.setData({
        codeVal: e.detail.value
      })
    }

  },

  //获取验证码
  obtainCode() {
    var that = this;
    var phone = that.data.phoneVal;
    var currentTime = that.data.currentTime
    if (that.data.codeAgain) {
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
  //绑定家属
  bindFamily() {
    let t = this;
    let tocken = utils.getItem('accessToken')
    if (tocken && tocken != '') {
      wx.navigateTo({
        url: '/pages/bindCell/bindCell?type=family',
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  nameBlur(e) {
    this.setData({
      verificationName: e.detail.value
    })
  },


  //绑定小区
  bindCell(e) {
    let t = this;
    let tocken = utils.getItem('accessToken'),
      idx = e.currentTarget.dataset.idx,
      userRoles = utils.getItem('userRoles'),
      villageList = utils.getItem('villageList'),
      villageIdx = utils.getItem('villageIdx'),
      arr = []
    if (!t.data.buttonClicked) {
      if (villageIdx && villageIdx != '') {
        let community_identifier = villageList[villageIdx].cloud_parking_community_identifier
      }
      t.setData({
        ['list[' + idx + '].isActive']: true,
        buttonClicked: true
      })
      // utils.ButtonClicked(t)

      setTimeout(() => {
          for (let i = 0; i < userRoles.length; i++) {
            let arrN = userRoles[i].name;
            arr.push(arrN)
          }
          if (tocken && tocken != '') {
            // if (idx == 1 || idx == 2 || idx == 3 || idx == 4 || idx == 5) {
              if(idx == 0){
                wx.navigateTo({
                  url: '/pages/bindCell/bindCell?type=owner',
                });
                return
              }
            if (arr.includes('HouseMember')) {
              if (t.data.houseExist) {
                switch (idx) {
                  case 1: //添加家属
                    wx.navigateTo({
                      url: '/pages/bindCell/bindCell?type=family',
                    });
                    // utils.showToast("功能正在开发中","none")
                    break;
                  case 2: //生活缴费
                    wx.navigateTo({
                      url: '/pages/lifePay/lifePay',
                    });

                    break;
                  case 3: //物业报修
                    wx.navigateTo({
                      url: '/pages/repair/repair',
                    });

                    break;
                  case 4: //云停车场
                    // console.log('小区id', community_identifier)
                    // wx.navigateToMiniProgram({
                    //   appId: 'wx90d02216a88a39d6',
                    //   path: 'pages/index/index?app_guid=' + community_identifier,
                    //   // path: 'pages/index/index?app_guid=43682ab0a9cecea5c78b259b97a5ab97',
                    //   // envVersion: 'develop',
                    //   success(res) {
                    //     // 打开成功
                    //   }
                    // })
                    utils.showToast("功能正在开发中", "none")
                    break;
                  case 5: //投诉建议
                    wx.navigateTo({
                      url: '/pages/proposal/proposal',
                    });
                    break;
                  case 6: //公告通知
                    wx.navigateTo({
                      url: '/pages/notice/notice',
                    });
                    break;
                  case 7: //应急电话
                    wx.navigateTo({
                      url: '/pages/phoneCall/phoneCall',
                    });
                    break;
                  case 8: //我的体温
                    wx.navigateTo({
                      url: '/pages/epidemic/wdtw/wdtw',
                    });
                    break;
                  case 9: //体温上报
                    wx.navigateTo({
                      url: '/pages/epidemic/twsb/twsb',
                    });
                    break;
                  case 10: //疫情举报
                    wx.navigateTo({
                      url: '/pages/epidemic/report/report',
                    });
                    break;
                }
              } else {
                utils.showToast('您在' + t.data.villageList[t.data.villageIdx].community_name + '没有房屋或者房屋正在审核中', 'none')
                t.setData({
                  ['list[' + idx + '].isActive']: false
                })

              }
            } else if (arr.includes('NewMember')) {
              // utils.showToast('需要先绑定房屋才能访问', 'none')
              wx.showModal({
                title: '提示',
                content: '需要先绑定房屋才能访问',
                showCancel: false,
                confirmText: '去绑定',
                success(res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '/pages/bindCell/bindCell',
                    })
                  }
                }
              })

              t.setData({
                ['list[' + idx + '].isActive']: false
              })
            } else if (arr.includes('Shenheing')) {
              utils.showToast('需要等待物业审核通过才能访问', 'none')
              t.setData({
                ['list[' + idx + '].isActive']: false
              })
            }
          
          
        } else {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      }, 1000)
  }
  setTimeout(() => {
    t.setData({
      ['list[' + idx + '].isActive']: false,
      buttonClicked: false
    })
  }, 1000)
},


getRoles() {
  api.getRoles({}, (res) => {
    if (res.data.code == 0) {
      utils.setItem('userRoles', res.data.data)
    } else {

    }
  })
},

bindvillageList(e) {
  this.setData({
    villageIdx: e.detail.value
  })
},

closePopup() {
  console.log(111)
  this.setData({
    activationType: !this.data.activationType
  })
},

//检测用户在该小区是否有房屋

houseExist(param) {
  api.houseExist(param, (res) => {
    let code = res.data.code
    if (code == 0) {
      this.setData({
        houseExist: true
      })
    } else if (code == 1) {
      utils.showToast(res.data.msg)
    } else {
      this.setData({
        houseExist: false
      })
    }
  })
},
/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
  let arr = [],
    t = this,
    token = utils.getItem('accessToken'),
    userRoles = utils.getItem('userRoles')
  console.log('激活参数', options)
  for (let i = 0; i < userRoles.length; i++) {
    let arrN = userRoles[i].name;
    arr.push(arrN)
  }

  //  t.getVillage()   //先判断token 有token就是首页，没有token弹框
  if (options.type == 'share') {
    if (!userRoles) {
      wx.navigateTo({
        url: '/pages/login/login?type=activation',
      })
    } else {
      if (arr.includes('NewMember')) {
        wx.showModal({
          title: '提示',
          content: '是否确认激活？', //话术待商榷
          // showCancel:true,
          success(res) {
            if (res.confirm) {
              t.setData({
                activationType: true
              })
            } else if (res.cancel) {
              utils.showToast("如果想再次激活必须绑定小区", 'none')
            }
          }
        })
      }
    }
  }



  // if (options.type == 'houseDetails' && (!arr.includes('HouseMember'))) {
  //   wx.showModal({
  //     title: '提示',
  //     content: '是否确认激活？',//话术待商榷
  //     // showCancel:true,
  //     success(res) {
  //       if (res.confirm) {
  //         if (!token) {
  //           console.log('没有token')
  //           wx.navigateTo({
  //             url: '/pages/login/login?type=activation',
  //           })
  //         } else {
  //           console.log('有token')
  //           t.setData({
  //             activationType: true
  //           })
  //         }

  //       } else if (res.cancel) {
  //         utils.showToast("如果想再次激活必须绑定小区", 'none')
  //       }
  //     }
  //   })
  // }





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
  let token = utils.getItem('accessToken'),
    userRoles = utils.getItem('userRoles'),
    tipsNone = utils.getItem('tipsNone'),
    villageList = utils.getItem('villageList'),
    villageIdx = utils.getItem('villageIdx'),
    t = this,
    arr = []
  t.getRoles()
  t.getPins()
  t.setData({
    navH: app.globalData.navHeight,

  })

  if (villageIdx && villageIdx != 0) {
    t.houseExist({
      community_identifier: villageList[villageIdx].community_identifier
    })
    t.setData({
      changeCellType: false,
      villageList,
      villageIdx,
      cellName: villageList[villageIdx].community_name
    })
  } else {
    t.setData({
      changeCellType: true
    })
  }

  for (let i = 0; i < userRoles.length; i++) {
    let arrN = userRoles[i].name;
    arr.push(arrN)
  }
  // console.log(arr)
  if (tipsNone && tipsNone == 'none') {
    t.setData({
      popupTips: false
    })
  }
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
onShareAppMessage: function () {}
})
