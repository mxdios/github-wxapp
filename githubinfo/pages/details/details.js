Page({
  data:{
    title:''
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var that = this;
    wx.getStorage({
      key: 'languagecInfoKey',
      success: function(res){
        that.title = res.data
        console.log(res.data)
      },
      fail: function() {
        // fail
        console.log('失败')
      },
      complete: function() {
        // complete
      }
    })
  },
  
  onShow:function(){
    
    
  }
})