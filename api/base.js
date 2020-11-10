import * as api from '../api/api.js';
let weChatLoginFlag = true;
export default (url, data, cb, method) => {

  wx.showLoading({
    title: '加载中',
    mask: true
  })
  let header = {};
  let token = wx.getStorageSync('accessToken'); //token
  if (token) header.Authorization = 'Bearer '+token;
  header['content-type'] = method == 'get' ? 'application/json' : 'application/x-www-form-urlencoded';
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

