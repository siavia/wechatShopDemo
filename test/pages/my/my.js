// pages/my/my.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    openid: null,
    display: "none",
    newPic: null,
    windowWidth: 300,
    windowHeight: 370,
    score: 99,
    money: 99,
    
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    encryptedData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var op = wx.getStorageSync('user') || []
    // this.setData({
    //   userInfo: app.globalData.userInfo,
    //   openid: op.openid
    // })

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
  onShareAppMessage: function () {
    if (e.from === 'button') {
      // 来自页面内转发按钮
      console.log(e.target)
    }
    return {
      title: 'OOPS商城',
      path: 'pages/my/my',
      success: function (res) {
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },

  /**
   * 分享推荐
   */
  picShare: function() {//点击外面的分享按钮，开始转入图片生成程序
    wx.showLoading({
      title: 'loading~',
    })
    this.setData({
      display: "block"
    })
    var that = this;
    that.makePic("../../image/user/headPic.jpg","../../image/mall/bg.jpeg","../../image/mall/ma.png");
  },

  hideView: function() { //点击边框能hide弹出框
    this.setData({
      display: "none"
    })
    wx.hideLoading();
  },

  makePic: function(headPic,bgPic,maPic) {//制作图片
    var that = this;
    console.log("making pic...");
    console.log("headPic:", headPic);
    console.log("bgPic:",bgPic);
    console.log("maPic:", maPic);
    var name = that.data.userInfo.nickName; 
    //var headPic = this.data.userInfo.avatarUrl 
    //canvas引用的图片不能是外域的，所以我们要先下载图片才行。
    //but下载图片就要绑定域名了，于是这里使用本地图片了
    //于是改成参数headPic直接引入
    //1. 请求后端API生成小程序码
    //2. canvas绘制文字和图片
    const ctx = wx.createCanvasContext('myCanvas')
    //背景图
    ctx.drawImage(bgPic, 0, 0, this.data.windowWidth, 270); //背景图：宽（windowwidth300，高270）
    //白色框
    ctx.setFillStyle('white')
    ctx.fillRect(0, 270, 300, 100);  //白色框：宽300，高100
    //用户信息
    ctx.drawImage(headPic, 10, 280, 40, 40) //headPic
    ctx.setFontSize(14)
    ctx.setFillStyle('#6F6F6F')
    ctx.fillText(name, 63, 304)
    //分享语言
    ctx.setFontSize(15)
    ctx.setFillStyle('#111111')
    ctx.fillText('和我逛oops商城叭', 10, 340)
    ctx.setFontSize(13)
    ctx.fillText('长按扫码查看详情',10,360)
    //小程序码
    ctx.drawImage(maPic, 150, 270, 100, 100); //小程序码：边长100
    ////绘制图片并显示newPic
    ctx.draw(false,setTimeout(function(){
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
          console.log("tempFilePath:", res.tempFilePath);
          wx.hideLoading();
          that.setData({
            newPic: res.tempFilePath
          })
        },
        fail: function(res) {
          wx.hideLoading();
          wx.showToast({
            title: '生成失败',
            icon: "none"
          })
        }
      })
    },200));
  },

  save: function(){
    var that = this;
    console.log("newPic Path:",that.data.newPic);
    wx.saveImageToPhotosAlbum({
      filePath: that.data.newPic,
      success(res){
        wx.showToast({
          title: '保存成功',
        })
        wx.showToast({
          title: '记得发朋友圈哦~',
        })
        /*wx.showModal({
          title: '保存成功~',
          content: '记得把保存的图片拿去发圈哦~',
          showCancel: false,
          confirmText: '好哒',
          confirmColor: '#21bba6',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
            }
          }
        })*/
      },fail(res){
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        })
      }
    })
  },

  //基本信息
  infor: function() {

  },

  //地图
  map: function(){
    console.log("map");
    wx.navigateTo({
      url: '../map/map',
    })
  },

  getUserInfo: function (e) {
    console.log("getUserInfo: e=", e);
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

  //我的订单

  //联系我们

})