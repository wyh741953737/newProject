## 1:屏幕尺寸：屏幕对角线的尺寸，单位是英寸，1英寸=2.54厘米
    常见尺寸有3.5、3.7.4.2、5.0、5.5、6.0，手机屏幕大小
## 2.屏幕分辨率（物理像素）
- 在横纵方向上的像素点，单位是px，1px=1个像素点，一般以纵向*横像素来表示一个手机的分辨率
    如1960*1080
    高清屏：相同区域像素个数比普通屏幕高4倍
    物理像素是设备呈像的基本单位（也叫设备像素）
    屏幕密度：每英寸上物理像素个数
    物理像素：分辨率-》一个物理像素占据的实际屏幕尺寸在不同设备上是否一样？
    设备出厂时，该设备包含的物理像素的点数和一个物理像素所占的实际屏幕尺寸是不会变得
## 屏幕像素密度：
   屏幕像素比 = 屏幕分辨率/屏幕尺寸
## css像素：
    抽象单位，浏览器最小单位
    标准显示密度下，一个css像素对应一个设备像素
    物理像素和css像素关系：
    一个200px的元素占据了200个css像素，但是占用多少个物理像素取决于屏幕特性（是否高清，缩放）
## 位图像素
一个位图像素是栅格图像（png，jpg等）最小的数据单元，1位图像素对应1个物理像素，图片才能得到完美清晰的展示


## 设备独立像素
 也叫密度无关像素，可以是计算机中的一个点，这个点可以使程序使用模拟像素（如css）
 然后由相关系统转化为物理像素
独立像素是css转物理像素很重要的一个环节

## 像素比dpr
  像素比 = 物理像素/设备独立像素
  在meta标签上写width=device-width之后，css像素和设备独立像素连接起来了，即css像素等于设备独立像素
  所以写了width=device-width之后，像素比dpr=物理像素/CSS像素
  当dpr=2的时候，给一个盒子设置高1px，那么在这个屏幕上显示的盒子高度就是2px物理像素
  1css像素=4*物理像素
  占据iphone6的屏幕需要750*1334（n）个物理像素
  占据iphone6的屏幕需要375*667（4n）个设备独立像素
  1设备独立像素=4倍物理像素

## 视口尺寸
横纵向上css像素个数

4像素：物理像素，图像像素，css像素，设备独立像素
3视口：布局视口，可视视口，理想视口
2操作：缩放
1比例：像素比



## 视口布局（Layout viewport
 pc端如何完整出现在移动端？
 PC端一般960*1024，我们需要一个容器放下可能大于960或者1024的页面，这个容器就是布局视口
 iphone：980
 ipad：980
 Android 三星:980
 chrome:980,
 IE:1024
 布局视口的出现本质上与设备没太大关系，它完全是移动端浏览器的一个属性，在物理像素与css像素1：1情况下，布局视口比设备分辨率大很多

## 视觉视口 (visiual viewport)
用户能看到的，网页最终靠物理像素显示的，从视觉视口可以看到整个设备分辨率

## Pc端只有一个视图

## 获取移动端视口宽度
- let layout = document.documentElement.clientWidth //layout的宽度，没有兼容问题
        clientWidth元素的内部宽度，以像素计，包括内边距，但是不包括垂直滚动条、边框、外边距
- let visual = window.innerWidth //visual宽度，几乎支持
        innerWidth包括垂直滚动条
- let ideal = screen.width;//一半代表理想视口宽度，一般代表设备分辨率，有很大兼容性问题

## 缩放
放大：一个css面积变大，像素个数变少，视觉视口尺寸会变，放大看到某一部分
缩小：一个css面积变大，像素个数变多，布局和视觉视口尺寸不变
缩小让布局视口变大，css元素变小，css像素个数变多
pc端，用户缩放影响视口的尺寸
移动端：用户缩放影响视口的尺寸

系统缩放参照于理想视口缩放，改变布局和视觉视口
把布局变为理想视图
<meta name="viewport" content="width=device-width,initial-scale=1.0/>
width=device-width将布局视口变为视觉视口，指定布局视口370，initial-scale=2.0指定布局视口和视觉视口，视图视口187.5
在样式中设置width=200px，超过视觉视口，出现滚动条，出不出滚动条和视觉视口有关系
meta&viewport是苹果发明的，桌面浏览器不支持

## 旋转（横竖切换）
切换时候，布局视口宽度不一样，ios的safari例外，基于性能考虑，布局视口不变
在不加initial-scale时候，基于性能考虑，旋转时候ios的布局时刻不会随之发生改变，但是ios的safari在initial-scale设置情况下，用户旋转时，ios的safari布局时刻宽度会改变，如果只设置initial-scale，ie10在旋转时候就会出问题。一句话：写全了
<meta name="viewport" content="width=device-width,initial-scale=1.0，user-scable=no“/>
完美视口不仅能解决旋转问题，如果你页面有太大元素，你的meta标签只会使用widthdevice-width，initial-scale=1.0中的一个。
有些浏览器会扩展布局视口高度来容纳你这个元素，但两个都用了，大部分浏览器都不会改变布局视口了
width=device-width和initial-scale冲突：谁大听谁的
minmum-scale缩放最小比例，默认20-500%
maxmum-scale缩放最大比例，默认10%-1000%
安卓不支持minmum-scale默认范围25%-400%

## 等比
原本样式设宽高200px，在不同设备可以等比加了meta后，大小不变了
<meta name="viewport" content="width=device-width,initial-scale=1.0，user-scable=no“/>
适配：为了加meta后实现等比。不加标签会等比，但是字会特别小

## 不做适配
正常PC流体布局两边留白
chrome下默认字体16px
谷歌默认最小12px


## %百分比适配

页面简单就应用百分比适配


## rem适配

rem适配 root-em，相对根标签的fontsize
html.style.fontSize = document.documentElement.clientWidth/16+"px"  这样16rem正好占了满屏，布局视口的宽度为16rem
宽度为10rem要占整屏，fontSize=？ 屏幕宽度为X
html.style.fontSize = document.documentElement.clientWidth/10+"px" width=8rem说明占据8/10


(function(){
    var styleNode = document.createElement("style") //创建style标签
    var w = document.documentElement.clientWidth/16
    styleNode.innerHTML = "html{font-size:"+w+"px!important}"
    document.head.appendChild(styleNode)
})

- rem适配原理：改变了一个元素在不同设备占据的css像素个数
- rem适配优点：没有破坏完美视图
- rem缺点：px值到rem的转换太复杂，less解决


## viewport适配
将所有设备布局视口的宽度调整为设计图的宽度
<!-- <script type="text/javascript">
    var targetW = 750
    var scale = screen.width/targetW   screen.width兼容问题，不太好，利用<meta name="viewport" content="width=device-width">
    var meta = document.createElement('meta')
    meta.name = 'viewport'
    meta.content = "initial-scale="+scale+",minmum-scale="+scale+",maxmum-scale"+",user-scale=no"
    document.head.appendChild(meta)
</script> -->
(function(){
    var targetW = 640
    var scale = document.documentElement.clientWidth/targetW //布局宽度/设备宽度=缩放比例，meta中width=device-width就将css像素和设备独立像素等同
    var meta = document.querySelector("meta[name='viewport']")
    meta.content="initial-scale="+scale+",minmum-scale"+scale+",maxmum-scale"+scale+",user-scale=no"
})

- viewport原理：viewport适配，每个元素在不同设备占据的css像素的个数是一样的，但是css像素和物理像素的比例是不一样的，等比
- viewport优点：简单，所量即所得
- viewport缺点：没用的完美视口

em适配


## 1物理像素
- 整个页面要缩小，写px就受到影响，写rem不会影响
- 使用rem适配
#test{
    width:16rem;
    height:1px;
    background:black;
}
window.onload = function() {
    (function() {
        var w = document.documentElement.clientWidth/16
        var styleNode = document.createElement('style')
        style.innerHTML = "html{ font-size:'+w+'px!importane'}"
        document.head.appendChild(styleNode)

        var dpr = window.devicePixeRatio || 1

    })()
}
transform：
div {
    height:1px;
    background:#000;
    -webkit-transform: scaleY(0.5);
    -webkit-transform-origin:0 0;
    overflow: hidden;
}
京东做法Transform
.div::after {
    content: '';
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #bfbfbf;
    border-radius: 4px;
    -webkit-transform: scale(0.5,0.5);
    transform: scale(0.5,0.5);
    -webkit-transform-origin: top left;
}
## ie6最小高度
19px，min-height只在ie7/8生效
解决：给父元素添加font-size：0，缺点，只能解决到2px



## querySelsector拿到的是静态的，你后面加了，就获取不到了，每次DOM结构变化了，只能重新获取一次

## getElementByClassName 动态的，DOM结构改变也能获取

## 移动端有两种事件：触屏事件和指针事件
  touchstart，              mousedown
  touchmove不可单独触发      mousemove可单独触发
  touchend                  mouseup
  建议使用DOM2级绑定
  item.addEventListener('touchstart',function(){})

  阻止默认事件后，滚动条也会被阻止
  pc端的事件可以在移动端触发，Pc端click会有300毫秒的延迟，移动端不会。
  为什么有300毫秒延迟？pc端事件太多了，比如单击和双击，
  浏览器怎么知道你触发的是双击还是单击？
  要等300毫秒确认是否有没有再点击来判断是单击还是双击事件，移动端事件比较少ontouchstart和ontouchmove，ontouchend
  ## PC端click300毫秒延迟

  ## event
  changedTouches触发当前事件的手指列表
  targetTouches触发当前事件时元素上的手指列表
  touches触发当前事件时屏幕上的手指列表
## 无缝滑屏
pc端轮播图主要是定位，left+top，滑动的时候，产生重绘重排，pc端考虑一个方向
移动端要考虑两个方向，而且使用left+top很耗性能，划着用户的电就没了，所以移动端采用transform，也会重绘重排，translatey有自己的图层。
translateX/Y会开辟图层自己去重绘重排，所以效率比left高
querySelect的坑：有时候绘制跟不上js引擎的渲染，解决：稍微延迟以下去拿

1.拿到元素和手指一开始位置
2.拿到元素一开始的偏移量和最后的位置，算出偏移量，将偏移量实时同步给滑坡元素
3.querySelector获取的是静态列表，动态添加元素要重新获取一遍，用定时器
4.定位版本，调整滑屏元素的left偏移量
    offSetLeft累加的过程
    抽象图片下标，滑屏元素的位置
5.2d变换版本（单独的图层，触发重绘重排代价较小
    translate的变换不会同步到offsetLeft
    解决：变量：设置一个变量专门同步translate
         定义css函数
        