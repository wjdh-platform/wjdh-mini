import * as api from '../api/api.js';
import utils from './../utils/util.js'
let weChatLoginFlag = true;
export default (url, data, cb, method) => {
  let timestamp1 = wx.getStorageSync('timestamp1'),
       timestampNow= Date.parse(new Date()),
       token = wx.getStorageSync('accessToken'); //token
    // if (timestamp1&&timestampNow > timestamp1 + 3600){
    //   api.getTockenN({}, (res) => {
    //     debugger
    //     utils.setItem('accessToken', res.data.access_token)
    //     app.globalData.roles = res.data.roles
    //   })
    // }
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  let header = {};
  
  if (token) header.Authorization = 'Bearer '+token;
  header['content-type'] = method == 'get' ? 'application/json' : 'application/x-www-form-urlencoded';
  header['Accept'] = "application/json";
  let app = getApp();
  url = app.servers + '' + url;
  wx.request({
    url,
    data,
    method,
    header,
    success: (res) => {
      // console.log(res)
      wx.hideLoading()
      typeof cb == "function" && cb(res);
    },
    fail(res) {
      wx.showModal({
        title: '提示',
        content: '连接超时',
        showCancel: false
      });
    },
    complete(res) {
      wx.hideLoading()
    }
  })
}

//发送ajax请求
function requestXhrAjax(url, data, cb, method) {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  let header = {};
  let token = wx.getStorageSync('accessToken'); //token
  if (token) header.token = token;
  header['content-type'] = method == 'get' ? 'application/json' : 'application/x-www-form-urlencoded';
  let app = getApp();
  url = url;
  wx.request({
    url,
    data,
    header,
    method,
    success: function (res) {
      wx.hideLoading()
      typeof cb == "function" && cb(res.data);
    },
    fail: function (res) {
      wx.hideLoading()
      wx.showModal({
        title: '网络异常，请稍后重试', //res,
        showCancel: false
      })
    }
  })
}

