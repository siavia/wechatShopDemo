// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    pic1:null,
    pic2:null,
    oldPrice:null,
    newPrice:null,
    swiperPicUrl:null,
    title:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      pic1: "../../image/goods/" + options.id + "-1.jpg",
      pic2: "../../image/goods/" + options.id + "-2.jpg",
      oldPrice: options.oldPrice,
      newPrice: options.newPrice,
      title: options.title,
      swiperPicUrl: [
        "../../image/goods/" + options.id + "-1.jpg",
        "../../image/goods/" + options.id + "-2.jpg"
      ]
    })
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

  }
})