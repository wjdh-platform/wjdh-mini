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
      icon: '/static/icon/bdxq.jpg',
    }, {
      text: '添加家属',
      icon: '/static/icon/tjjs.jpg',
    }, {
      text: '生活缴费',
      icon: '/static/icon/shjf.jpg',
    }, {
      text: '物业报修',
      icon: '/static/icon/wybx.jpg',
    }, {
      text: '云停车场',
      icon: '/static/icon/ytcc.jpg',
    }, {
      text: '投诉建议',
      icon: '/static/icon/tsjy.jpg',
    }, {
      text: '公告通知',
      icon: '/static/icon/ggtz.jpg',
    }, {
      text: '应急电话',
      icon: '/static/icon/yjbj.jpg',
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
  },



  changeClose(res) {
    console.log(res)
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
  closePopupTips() {
    this.setData({
      popupTips: false
    })
  },

  tipsNone() {
    this.setData({
      popupTips: false
    })
    utils.setItem("tipsNone", false)
  },

  //获取小区名字
  getVillage() {
    let t = this
    api.getVillage({}, (res) => {
      if (res.data.code == 0) {
        let list = [],
          oldList = res.data.data
        list = oldList.unshift({ community_name: '请选择' })
        t.setData({
          villageList: oldList
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
          wx.redirectTo({
            url: '/pages/houseList/ownerHouseList/ownerHouseList',
          })
        } else if (res.data.code == 1) {
          utils.showToast(res.data.msg, "none")
        } else {
          utils.showToast(res.data.msg, "none")
          t.setData({
            activationType: false
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
      arr = []
    for (let i = 0; i < userRoles.length; i++) {
      let arrN = userRoles[i].name;
      arr.push(arrN)
    }
    console.log(arr)
    if (tocken && tocken != '') {
      if (idx == 1 || idx == 2 || idx == 3 || idx == 4 || idx == 5) {
        if (arr.includes('HouseMember')) {
          switch (idx) {
            case 1://添加家属
              wx.navigateTo({
                url: '/pages/bindCell/bindCell?type=family',
              });
              // utils.showToast("功能正在开发中","none")
              break;
            case 2://生活缴费
              wx.navigateTo({
                url: '/pages/lifePay/lifePay',
              });

              break;
            case 3://物业报修
              wx.navigateTo({
                url: '/pages/repair/repair',
              });

              break;
            case 4://云停车场
              utils.showToast("功能正在开发中", "none")

              break;
            case 5://投诉建议
              wx.navigateTo({
                url: '/pages/proposal/proposal',
              });
              // wx.navigateTo({
              //   url: '/pages/visitor/visitor',
              // });
              break;
          }
        } else if (arr.includes('NewMember')) {
          utils.showToast('需要先绑定房屋才能访问', 'none')
        } else if (arr.includes('Shenheing')) {
          utils.showToast('需要等待物业审核通过才能访问', 'none')
        }
      }

      switch (idx) {
        case 0://绑定小区
          wx.navigateTo({
            url: '/pages/bindCell/bindCell?type=owner',
          });
          break;
      }
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
    switch (idx) {
      case 6://公告通知
        wx.navigateTo({
          url: '/pages/notice/notice',
        });
        break;
      case 7://应急电话
        wx.navigateTo({
          url: '/pages/phoneCall/phoneCall',
        });
        break;
        return
    }
  },


  getRoles() {
    api.getRoles({}, (res) => {
      if (res.data.code == 0) {
        utils.setItem('userRoles', res.data.data)
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let token = utils.getItem('accessToken'),
      userRoles = utils.getItem('userRoles'),
      tipsNone = utils.getItem('tipsNone'),
      t = this,
      arr = []
    t.setData({
      navH: app.globalData.navHeight
    })





    for (let i = 0; i < userRoles.length; i++) {
      let arrN = userRoles[i].name;
      arr.push(arrN)
    }
    // console.log(arr)
    if (tipsNone == false) {
      t.setData({
        popupTips: tipsNone
      })
    }

    //  t.getVillage()
    if (options.type == 'houseDetails' && (!arr.includes('HouseMember'))) {
      wx.showModal({
        title: '提示',
        content: '是否确认激活？',
        // showCancel:true,
        success(res) {
          if (res.confirm) {
            if (!token) {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
            t.setData({
              activationType: true
            })
          } else if (res.cancel) {
            utils.showToast("如果想再次激活必须绑定小区", 'none')
          }
        }
      })
    }





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
    let t = this
    t.getRoles()
    //  t.getVillage()
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