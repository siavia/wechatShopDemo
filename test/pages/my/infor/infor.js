// pages/my/infor/infor.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: null,
    user: {},
    userInfo: {},
    appid: 'xxxxxx',//输入小程序appid  
    secret: 'xxxxxxx',//输入小程序app_secret
    hasUserInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        openid: app.globalData.openid,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
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
    //获取openid
    var that = this
    var user = wx.getStorageSync('user') || {}; //包含openid
    if (!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600) ) {
      wx.login({
        success: function (res) {
          if (res.code) {
            console.log("code:", res.code) 
            var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + that.data.appid + '&secret=' + that.data.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
            wx.request({ //////////////////get user////////////////////
              url: l,
              data: {},
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
              // header: {}, // 设置请求的 header  
              success: function (res) {
                var userr = {};
                userr.openid = res.data.openid;
                userr.expires_in = Date.now() + res.data.expires_in;
                console.log("userr:", userr);
                that.setData({
                  openid : userr.openid,
                  user : userr
                })
                app.globalData.openid = userr.openid;/////////////////////////////
                wx.setStorageSync('user', userr);//存储openid  
              }, fail: function () {
                console.log("get user(openid) failed");
              }
            });
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
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
  onShareAppMessage: function () {

  },
/*
  getUserInfo: function (e) {
    console.log("getUserInfo: e=", e);
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
*/
})