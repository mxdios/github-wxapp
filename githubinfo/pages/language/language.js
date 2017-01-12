Page({
  data:{
    languages: [
      'JavaScript','Java','PHP',
      'Rub','Python','CSS','C++','C','Objective-C',
      'Swift','R','Perl','Lua','HTML','Scala','GO'
    ]
  },

  languageclick: function(event) {
    wx.setStorage({
      key: 'languageKey',
      data: event.target.dataset.hi,
    })
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  }
})