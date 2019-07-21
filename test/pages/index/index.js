/*
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    encryptedData:{},
    openid: null
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        openid: app.globalData.openid,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
      console.log("userInfo:",this.data.userInfo)//////////////////////////////
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
  getUserInfo: function(e) {
    console.log(e)/////////////////////////////////////////////
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getPhoneNumber(e){
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    this.setData({
      encryptedData: e.detail.encryptedData
    })
  },
  // 用户点击右上角分享
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: 'xx小程序',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  }

})
*/



// pages/shop/shop.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    swiperPicUrl: [
      '../../image/shopRoll/001.png',
      '../../image/shopRoll/003.png',
      /*'../../image/shopRoll/002.png'*/
    ],
    goodsList: [
      {
        id: 101,
        imgUrl: '../../image/goods/101-1.jpg',
        title: '抱枕ins日本可爱小兔子',
        oldPrice: 78,
        newPrice: 53
      },
      {
        id: 102,
        imgUrl: '../../image/goods/102-1.jpg',
        title: '巨型玩具熊软绵玩偶',
        oldPrice: 99,
        newPrice: 79
      },
      {
        id: 201,
        imgUrl: '../../image/goods/201-1.jpg',
        title: '《皮囊》蔡崇达',
        oldPrice: 29.9,
        newPrice: 28.8
      },
      {
        id: 202,
        imgUrl: '../../image/goods/202-1.jpg',
        title: '《繁花落尽是孤独》季羡林',
        oldPrice: 26,
        newPrice: 24
      },
      {
        id: 301,
        imgUrl: '../../image/goods/301-1.jpg',
        title: '三只松鼠甘果三十天装',
        oldPrice: 40,
        newPrice: 36
      },
      {
        id: 302,
        imgUrl: '../../image/goods/302-1.jpg',
        title: '三只松鼠手撕面包',
        oldPrice: 39.9,
        newPrice: 38.8
      }
    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    encryptedData: {},
    openid: null
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
      // 所以此处加入 callback 以防止这种情
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        app.setData({
          userInfo: res.userInfo,
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
          app.setData({
            userInfo: res.userInfo,
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
  onShareAppMessage: function (e) {
    if (e.from === 'button') {
      // 来自页面内转发按钮
      console.log(e.target)
    }
    return {
      title: 'OOPS商城',
      path: 'pages/shop/shop',
      success: function (res) {
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },

  //
  search: function () {
    console.log("searching");
  },

  getUserInfo: function (e) {
    console.log("getUserInfo: e=", e);
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

})