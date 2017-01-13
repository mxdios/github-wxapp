Page({
  data:{
    btns: [{
            'name': 'Contributors',
            'url': ''
          }, {
            'name': 'Star',
            'url': ''
          }],
    title:'',
    imgurl:'',
    description:'',
    fork:'',
    star:'',
    selectId: '',
    listDataArray: [],
    hiddenLoading: false
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var that = this;
    wx.getStorage({
      key: 'languagecInfoKey',
      success: function(res){
        that.setData({
          title: res.data.full_name,
          imgurl: res.data.owner.avatar_url,
          description: res.data.description,
          fork: res.data.forks_count,
          star: res.data.stargazers_count,
          btns: [{
                  'name': 'Contributors',
                  'url': res.data.contributors_url
                }, {
                  'name': 'Star: '+ res.data.stargazers_count,
                  'url': res.data.stargazers_url
                }]
        })
        that.loadData(res.data.contributors_url)
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
    
    
  },

  btnclick: function(event) {
    var that = this;
    this.setData({
      selectId: event.target.id
    }),
    this.loadData(event.target.dataset.hi)
  },
  loadData: function(event) {
    var that = this; 
    let listData = [];
    this.setData({
       hiddenLoading: false
    });
   // 网络加载获取数据
    wx.request({
      url: event,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        listData = res.data,         
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