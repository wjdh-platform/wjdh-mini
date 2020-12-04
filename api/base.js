// import * as api from '../api/api.js';
// import utils from './../utils/util.js'
// let weChatLoginFlag = true;
// export default (url, data, cb, method) => {
//   return new Promise((resolve, reject) => {
//   let token = wx.getStorageSync('accessToken')
//   wx.showLoading({
//     title: '加载中',
//     mask: true
//   })
//   let header = {};
//   if (token) header.Authorization = 'Bearer ' + token;
//   header['content-type'] = method == 'get' ? 'application/json' : 'application/x-www-form-urlencoded';
//   header['Accept'] = "application/json";
//   let app = getApp();
//   url = app.servers + '' + url;
//   wx.request({
//     url,
//     data,
//     method,
//     header,
//     success: (res) => {
//       // console.log(res)
//       wx.hideLoading()
//       resolve(typeof cb == "function" && cb(res));
//     },
//     fail(err) {
//       reject(err)
//     }
//   })
// })
// }

// //发送ajax请求
// // function requestXhrAjax(url, data, cb, method) {
// //   wx.showLoading({
// //     title: '加载中',
// //     mask: true
// //   })
// //   let header = {};
// //   let token = wx.getStorageSync('accessToken'); //token
// //   if (token) header.token = token;
// //   header['content-type'] = method == 'get' ? 'application/json' : 'application/x-www-form-urlencoded';
// //   let app = getApp();
// //   url = url;
// //   wx.request({
// //     url,
// //     data,
// //     header,
// //     method,
// //     success: function (res) {
// //       wx.hideLoading()
// //       typeof cb == "function" && cb(res.data);
// //     },
// //     fail: function (res) {
// //       wx.hideLoading()
// //       wx.showModal({
// //         title: '网络异常，请稍后重试', //res,
// //         showCancel: false
// //       })
// //     }
// //   })
// // }

import * as api from '../api/api.js';
let weChatLoginFlag = true;
export default (url, data, cb, method) => {

  wx.showLoading({
    title: '加载中',
    mask: true
  })
  // method = !method ? 'get' : 'post';
  let header = {};
  let token = wx.getStorageSync('accessToken'); //token
  if (token) header.Authorization = 'Bearer ' + token;
  // header['content-type'] = method == 'get' ? 'application/json' : 'application/x-www-form-urlencoded';
  header['Accept'] = "application/json";
  let app = getApp();
  url = app.servers + '' + url;
  wx.request({
    url,
    data,
    method,
    header,
    success: (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.data.message == "token值因各种原因而失效，请重新调用接口获取token") {
        if(token&&token!=''){
          refreshToken(url, data, cb, method);
        }else{
          requestWechatLogin(url, data, cb, method);
        }
        
      } else {
        typeof cb == "function" && cb(res);
      }

    },
    fail(res) {
      wx.hideToast()
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

//判断微信token过期，重新请求微信登录拿到code换新token
function requestWechatLogin(url, data, cb, method) {
  weChatLoginFlag = false;
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  // method = !method ? 'get' : 'post';
  let header = {};
  let token = wx.getStorageSync('accessToken'); //token
  if (token) header.Authorization = 'Bearer ' + token;
  // header['content-type'] = method == 'get' ? 'application/json' : 'application/x-www-form-urlencoded';
  header['Accept'] = "application/json";
  let app = getApp();
  url = url;
  wx.login({
    success(res) {
      if (res.code) {
        wx.request({
          url: app.servers + 'api/v1/weapp/authorizations',
          data: {
            code: res.code
          },
          header,
          method:'POST',
          success: function(res) {
            wx.hideLoading() 
            if (res.data.code == 0) { //请求的心token
              wx.setStorageSync("accessToken", res.data.access_token); //老用户登录token
              wx.setStorageSync("avatar", res.data.avatar);
              wx.setStorageSync("name", res.data.name);
              requestXhrAjax(url, data, cb, method); //新token请求数据
              weChatLoginFlag = true;
            }
          }
        })
      }
    }
  })
}
//判断微信token过期，刷新token
function refreshToken(url, data, cb, method) {
  weChatLoginFlag = false;
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  // method = !method ? 'get' : 'post';
  let header = {};
  let token = wx.getStorageSync('accessToken'); //token
  if (token) header.Authorization = 'Bearer ' + token;
  // header['content-type'] = method == 'get' ? 'application/json' : 'application/x-www-form-urlencoded';
  header['Accept'] = "application/json";
  let app = getApp();
  url = url;
  wx.login({
    success(res) {
      if (res.code) {
        wx.request({
          url: app.servers + 'api/v1/authorizations/current',
          data: {
            
          },
          header,
          method:'PUT',
          success: function(res) {
            wx.hideLoading() 
            if (res.data.code == 0) { //请求的心token
              wx.setStorageSync("accessToken", res.data.access_token); //老用户登录token
              wx.setStorageSync("avatar", res.data.avatar);
              wx.setStorageSync("name", res.data.name);
              requestXhrAjax(url, data, cb, method); //新token请求数据
              weChatLoginFlag = true;
            }
          }
        })
      }
    }
  })
}

//发送ajax请求
function requestXhrAjax(url, data, cb, method) {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  // method = !method ? 'get' : 'post';
  let header = {};
  let token = wx.getStorageSync('accessToken'); //token
  if (token) header.Authorization = 'Bearer ' + token;
  // header['content-type'] = method == 'get' ? 'application/json' : 'application/x-www-form-urlencoded';
  header['Accept'] = "application/json";
  let app = getApp();
  url = url;
  wx.request({
    url,
    data,
    header,
    method,
    success: function(res) {
      wx.hideLoading() 
      typeof cb == "function" && cb(res);
    },
    fail: function(res) {
      wx.hideLoading()
      if (!loadingNone) {
        wx.hideLoading();
      }
      wx.showModal({
        title: '网络异常，请稍后重试', //res,
        showCancel: false
      })
    }
  })
}

