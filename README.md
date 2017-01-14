# github-wxapp

微信小程序-访问github仓库。

接口使用github提供的[API接口](https://developer.github.com/v3/)

![效果图](http://oalg33nuc.bkt.clouddn.com/githuninfo.gif)

工作之余，学写小程序，踩了一些坑，做简要记录，有人发现问题所在或者其他错误，请留issue：

## app.json里的pages页面路径

```
"pages":[
    "pages/index/index",
    "pages/logs/logs",
    "pages/index/language/language" //此路径无法访问到页面，并报错
  ],
```

小程序的所有页面都需要在这里写入路径。我在`index`文件夹下创建新的页面文件夹`language`，`language`文件夹下放了`.json`、`.js`、`.wxml`、`wxss`四个页面所需文件。路径`"pages/index/language/language"`写入`pages`，但是却无法访问到`language`页面，把`language`页面文件夹拿出来，和`index`文件夹同级目录，才可访问到。

试过各种办法，重启工具，重写路径等，都不能正确访问到。

## 添加事件，传递参数无效

```
<block wx:for = "{{listDataArray}}">   
  <view class = "cellwxss"  bindtap = "languageviewclick" data-hi = "{{item}}">
      <view class = "viewwxss">
          <text class = "titlewxss">{{index + 1}}. {{item.name}}</text>
          <text class = "starwxss">Star: {{item.stargazers_count}}</text>
      </view>
      <view class = "viewwxss">
          <image src="{{item.owner.avatar_url}}" class = "imagewxss" bindtap = "languageviewclick" data-hi = "{{item}}"></image>
          <text class = "ownerwxss">Owner: {{item.owner.login}}</text>
      </view>
      <view class = "viewwxss">
          <text class = "descriptionwxss">{{item.description}}</text>
      </view>
  </view> 
</block>
```

上面这段代码中的事件：`bindtap = "languageviewclick" data-hi = "{{item}}"`添加到最外层的view上，能实现点击操作，但是`"{{item}}"`传递不过去，在事件方法中读取`data-hi`没有传递的`item`。包括其他指定参数的方法`id`等，都无效。

事件添加到内一层view`<view class = "viewwxss">`上面，部分view点击能传递，部分无法传递。

把事件添加到最内层`text`上，便可以实现`item`传递。


