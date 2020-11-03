import * as api from '../api/api';
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 本地缓存存储
function setItem(key, value) {
  wx.setStorageSync(key, value);
  if (key == "accessToken") { //如果记录的缓存事件是token在此设置token失效时间
    wx.setStorageSync("accessTokenExpiration", Date.parse(new Date()) + 3600000);
  }
}
// 本地缓存获取
function getItem(key) {
  return wx.getStorageSync(key);
}
//删除本地缓存数据
function removeItem(key) {
  return wx.removeStorageSync(key);
}
//检测用户是否登录
function checkLogin() {
  if (wx.getStorageSync("accessToken") && wx.getStorageSync("accessToken") !== null) {
    return true;
  } else {
    return false;
  }
}


//提示框
function showToast(title, icon) {
  wx.showToast({
    title: title,
    icon: icon
  })
}

// function shareLogin(fn) {
//   wx.login({
//     success(res) {
//       if (res.code) {
//         wx.request({
//           url: "https://api.maykahotel.com/wechat.mc.user/wxLogin",
//           method: 'post',
//           data: {
//             code: res.code
//           },
//           header: {
//             "Content-Type": "application/json",
//             "Authorization": wx.getStorageSync("accessToken") ? wx.getStorageSync("accessToken") : ""
//           },
//           success(res) {
//             if (res.data.code) {
//               setItem("openid", res.data.data.openid);
//               if (res.data.code == 1) {
//                 setItem("accessToken", res.data.data.token); //老用户登录token
//                 setItem("uid", res.data.uid);
//                 setItem("avatar_url", res.data.data.avatar_url);
//                 setItem("nickName", res.data.data.nickName);
//                 setItem("share_code", res.data.data.share_code);
//                 fn && fn(res.data.data);
//               } else {
//                 wx.navigateTo({
//                   url: "/pages/login/login",
//                 })
//               }
//             }
//           }
//         })
//       } else { //微信登录失败
//         wx.showToast({
//           title: "微信登录失败，请刷新重试",
//           duration: 2000
//         })
//       }
//     }
//   })
// }

module.exports = {
  formatTime: formatTime,
  setItem: setItem,
  getItem: getItem,
  removeItem: removeItem,
  checkLogin: checkLogin,
  showToast,
  // shareLogin,
}