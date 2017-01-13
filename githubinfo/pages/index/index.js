//index.js
//获取应用实例
// var app = getApp()
Page({
  data: {
    listDataArray: [],
    headertext: 'random',
    hiddenLoading: false
  },
  //事件处理函数
  headerviewclick: function() {
    wx.navigateTo({
      url: '../language/language'
    })
  },
  languageviewclick: function(event) {
    console.log(event.target.dataset.hi),
    wx.setStorage({
      key: 'languagecInfoKey',
      data: event.target.dataset.hi,
      success: function(res){
        console.log('保存成功')
      }
    }),
    wx.navigateTo({
      url: '../details/details'
    })
  },
  // 生命周期方法，监听页面加载
  onLoad: function () {
    // this.loadGithubData('page=1&q=language:')
  },
  onShow: function() {
    var that = this;
    wx.getStorage({
      key: 'languageKey',
      success: function(res){
        that.loadGithubData('page=1&q=language:' + res.data)
        that.setData({
          headertext: res.data
        })
      }, fail: function() {
          that.loadGithubData('page=1&q=language:')
        }
    })
  },
  // 加载列表数据
  loadGithubData: function(event) {
    var that = this; 
    let listData = [];
    let localURL = 'https://api.github.com/search/repositories?sort=stars&order=desc&';
    // page=1&q=language:Objective-c
    this.setData({
       hiddenLoading: false
    });
    // 网络加载获取数据
    wx.request({
      url: localURL + event,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        listData = res.data.items,         
        that.setData({
          listDataArray: listData,
          hiddenLoading: true
        })
      }, fail: function() {
        // fail
        console.log('接口调用失败')

      }, complete: function() {
        // complete
        console.log('接口调用结束')
      }
    })
  }
})
