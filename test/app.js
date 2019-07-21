/*
//app.js
App({
  globalData: {
    appid: 'xxxxxxx',//输入小程序appid  
    secret: 'xxxxxxx',//输入小程序app_secret  
    userInfo: null,
    openid: null
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    //登录
    var that = this
    var user = wx.getStorageSync('user') || {}; //包含openid
    var userInfo = wx.getStorageSync('userInfo') || {};  //包含nickName、头像等
    if ((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) && (!userInfo.nickName)) {
      wx.login({
        success: function (res) {
          if (res.code) {
            console.log("code:",res.code)
            wx.getUserInfo({ //////////////////get userInfo////////////////////
              success: function (res) {
                var userInfoo = {};
                userInfoo.avatarUrl = res.userInfo.avatarUrl;
                userInfoo.nickName = res.userInfo.nickName;
                userInfoo.country = res.userInfo.country;
                userInfoo.province = res.userInfo.province;
                console.log("userInfoo:",userInfoo);
                wx.setStorageSync('userInfo', userInfoo);//存储userInfo
              },fail: function() {
                console.log("get userInfo failed");
              }
            });
            var d = that.globalData;//这里存储了appid、secret、token串  
            var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
            wx.request({ //////////////////get user////////////////////
              url: l,
              data: {},
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
              // header: {}, // 设置请求的 header  
              success: function (res) {
                var userr = {};
                userr.openid = res.data.openid;
                userr.expires_in = Date.now() + res.data.expires_in;
                console.log("userr:",userr);
                console.log("openid:",userr.openid);
                that.globalData.openid = userr.openid;/////////////////////////////
                wx.setStorageSync('user', userr);//存储openid  
              },fail: function(){
                console.log("get user failed");
              }
            });
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    //设置tabbar 
    wx.setTabBarStyle({
      color: '#cdcdcd',
      selectedColor: '#82529d',
      fontSize: '28rpx',
    })
    wx.setTabBarItem({
      index: 0,
      iconPath: '/image/icon/tabbar/shangcheng1.png',
      selectedIconPath: '/image/icon/tabbar/shangcheng2.png'
    })
    wx.setTabBarItem({
      index: 1,
      iconPath: '/image/icon/tabbar/gouwuche1.png',
      selectedIconPath: '/image/icon/tabbar/gouwuche2.png'
    })
    wx.setTabBarItem({
      index: 2,
      iconPath: '/image/icon/tabbar/wode1.png',
      selectedIconPath: '/image/icon/tabbar/wode2.png'
    })

  }
})
*/

//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    //设置tabbar 
    wx.setTabBarStyle({
      color: '#cdcdcd',
      selectedColor: '#82529d',
      fontSize: '28rpx',
    })
    wx.setTabBarItem({
      index: 0,
      iconPath: '/image/icon/tabbar/shangcheng1.png',
      selectedIconPath: '/image/icon/tabbar/shangcheng2.png'
    })
    wx.setTabBarItem({
      index: 1,
      iconPath: '/image/icon/tabbar/gouwuche1.png',
      selectedIconPath: '/image/icon/tabbar/gouwuche2.png'
    })
    wx.setTabBarItem({
      index: 2,
      iconPath: '/image/icon/tabbar/wode1.png',
      selectedIconPath: '/image/icon/tabbar/wode2.png'
    })

  },

  globalData: {
    userInfo: null,
    openid: null
  }

})