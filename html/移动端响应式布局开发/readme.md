响应式开发原理：media通过媒体查询针对不同宽度的设备进行布局和样式的设置，从而适配不同的设备。
<link rel="stylesheet" type="text/css" media="screen and(max-device-width:400px)" href="tinyScreen.css"/>
响应式布局需要一个父级作为布局容器，来配合子元素实现变化效果。
响应式布局里设备划分为4部分：超小屏幕<768px
                           小屏设备（平板）>768px <992px
                           中等屏幕（桌面显示器）：992-1200px
                           宽屏设备（大桌面显示器）>=1200px; 
rem
flex
vh/vw
移动前端中常说的 viewport （视口）就是浏览器中用于呈现网页的区域
电脑端的视口宽度等于分辨率，而移动端的视口宽度跟分辨率没有关系,宽度默认值是设备厂家指定的。iOS, Android基本都将这个视口分辨率设置为 980px。、
<meta name="viewport" content="width=device-width initial-scale=1.0,maxminu=1.0,user-scable=0">
流式布局:百分比布局也叫作流式布局
弹性布局虽然可以让设计适应较多场景，也包括某些尺寸的屏幕，但有时候确实不够用，因为我们还需要对布局进行更细致的调整。媒体查询让这一切成为可能，它就相当于CSS中基本的条件逻辑。

布局容器，bootstrap预定义了.container类，它提供了两个作此用处的类
.container类                            container-fluid类
响应式布局的容器 固定宽度                   流式布局容器百分比宽度
大屏：>1200px 宽度为1170px                 占据全部视口（viewport）的容器 
中等屏：991-1200px 宽度为970px             适合于单独做移动端开发 
小屏：768-992px 宽度为750px
超小屏：<768px 宽度为100%

Bootstrap原理：bootstrap里面的container宽度是固定的，但是不同屏幕下，container宽度不同，我们再把container划分为12等分。
栅格系统把页面里内容划分为12等分，rem是把整个屏幕划分。
栅格系统用于通过一系列的行于列的组合来创建页面布局。
                    超小屏幕<768px    小屏设备（平板）<992  中等屏幕(桌面显示器）<1200  宽屏设备（大桌面显示器）>=1200
.container最大宽度      自动（100%）        750px                970px                      1170px
                        .col-xs-            .col-sm-            .col-md-                    .col-lg-
    
列大于12，多余的默认另起一行排列，每一列默认左右有15像素padding。
列嵌套：最好加row类名，可以取消父元素的padding，而且高度和父级一样
列排序：.col-md-push .col-md-pull可以很容易改变列的顺序。
列偏移：col-md-offset可以将列向右偏移。这些类实际上是通过使用选择器为当前元素增加了左侧的边距margin
在不同屏宽下显示不同元素：.hidden-xs超小屏隐藏  .hidden-sm小屏隐藏 .hidden-md中等屏隐藏 .hidden-lg大屏隐藏 .visible-xs可见

