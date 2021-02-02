import * as api from '../api/api';

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
  setTimeout(() => {
  wx.showToast({
    title: title,
    icon: icon
  })
  },300)
}



function packUp(data, index) {
  for (let i = 0, len = data.length; i < len; i++) {
    if (index != i) {
      data[i].isShow = false
    }
  }
}



module.exports = {
  // formatTime: formatTime,
  setItem: setItem,
  getItem: getItem,
  removeItem: removeItem,
  checkLogin: checkLogin,
  showToast,
  packUp,
}