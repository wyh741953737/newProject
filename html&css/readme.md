很多标签都有语义的，比如产品标题就用h，大量文字就用p

文本格式化标签：
加粗：string,b
斜体:i,em 分割线使用<em>|</em> 设置font-style为normal
删除线：delete，s
下划线：ins，u

a标签：anchor锚，target属性：用于指定链接打开的方式，_self为默认值，——blank为在新窗口打开的方式
链接分类：外链接，内链接，空链接，锚链接，下载链接（href地址是文件或者压缩包），网页元素链接，文本，音频可添加链接
实例锚链接：<a href='#id名字'>

表格：主要用来显示、展示数据，可以让数据显示很规整。
表格属性：cellpadding，单元边缘与内容之间空白 ，1px
        cellspacing  单元格之间的空白，默认2像素
合并单元格：跨行合并：rowspan=‘合并单元格个数’
           跨列合并：colspan=‘合并单元格列数’     

自定义列表：比如：
    关于微信
    了解微信
    加入微信
    联系我们
下面三个都是围绕关于微信做的解释，这种布局，我们就用自定义列表
<dl></dl>自定义列表，dt定义项目/名字，和dd一起用

<dl>
  <dt>关于微信</dt>
  <dd>了解微信</dd>
  <dd>加入微信</dd>
  <dd>联系我们</dd>
<dl>

表单：action='url地址' method=提交方式 name表单域名称用于区分不同表单域

input,type取值：text，file,button,radio,checkbox,reset重置,submit.image,password
除了type属性，input还有name（区分不同input),value,checked此input首次加载时要被选中，maxlength输入最长

label为input元素定义标注，label的for和input的id要对应。当点击label标签内文本时，浏览器自动将焦点（光标转到选择对应的表单元素上，
<label for=;sex>男</label>
<input type='radio' name='sex' id='sex>

select，option选择项，selected=‘selected默认选中
textrea，rows显示行数,cols每行多少个字


元素显示模式：
  1、独占一行块级标签：
    div,h1-h6,p,hr,ul,ol, dl,form,table
    宽高可控，宽度默认父宽度，可放行/快元素，文字类不可用块级元素，p存放文字，不可放div，h1和h6都不行

  2、排在一行：
    a,span，label，select，textarea，em
    排在一行，设置宽高无效，默认宽度是它本身宽度，行内只能容纳文本或者其他行内
    特殊情况，a可放块级，但给a转换模式最安全
    行内元素为了照顾兼容性，尽量只设置左右内外边距，不要设置上下内外边距，但是转换为行内快元素就可以了
    上下不起效果。
    行内元素没有width，所以设置padding不会被撑开


  3、行内元素中有几个特殊的input，img，td他们同时具有快元素和行内元素的特点，有些资料称他们为行内块元素
        行内快元素特点：和相邻行内元素排一行，但是他们之间有空白缝隙，默认宽度是他们内容宽度，高度，行高，外边距，内边距可控制（块级特点）
  比如搜索框：-----------------------
     input+button因为input和button都是行内快元素，放在一起会有间隙
     解决：浮动就不会有间隙，input和button都加浮动left
     button默认有边框，border：0去掉
     
元素显示模式转换：display:block|inline|inline-block


emmet语法快速生成html，格式化文档


CSS选择器：
基础选择器：id，类，标签，
复合选择器：
        后代选择器ul li，(亲儿子，也不是孙子）子选择器ul>li，并集选择器ul,div，伪类选择器div:nth-child(1)

伪类选择器：
    focus：用于选取获得焦点的元素（针对input）,谁获得光标换背景色
    input:focus{color:red}
    <input>
    <input>
    <input>



元素显示模式？
元素以什么方式显示，div占一行，span一行放多个


snipaste截图工具
    F1截图，F3在桌面置顶显示，点击图片，alt取色，shift切换去色模式，esc取消图片显示





CSS三大特性：
    1：层叠性：给相同选择器设置相同样式，此样式会覆盖（层叠）零一个冲突样式，层叠性解决样式冲突
            样式冲突：遵循就近规则，哪个样式离结构近就执行哪个样式
    2：继承性：text-、font-、line-这些开头科技处，color
            适当使用继承可以简化代码，降低CSS复杂性  
            父元素font：12px/1.5
            body{font:12px/1.5}
            div{font-size:14px}
            子元素继承父元素行高1.5 ,1.5就是当前文字大小的1.5倍，当前div行高21    
            这样的优势子元素可根据自己文字大小自动调整行高。
    3：优先级：同一个元素设置了不同选择器就用优先级。
        选择器相同执行层叠性
    权重：！importent>行内>id>class|伪类>元素>通配符*|继承>
               无穷的>1000>100>10      >1   >0  
    权重不会进位，权重计算：  
    li {}
    ul li {} 
    复合选择器有权重相加：ul li》li     
CSS引入方式：
外部样式表（外链）：link（rel定义当前文档与被链接文档之间的关系stylesheet。需要引入
行内样式表：style='color:red' 结构样式混乱
内部样式表（内嵌）<style></style>未彻底分离


border，padding会影响盒子的大小（会把原来盒子撑大）
    导航栏的item文字长度不一样。固定宽度不合理，使用pandding
    不给盒子指定宽度，padding就不会撑开。如果一个盒子设置了屏幕的宽度，你再设置padding，就会出现横向滚动条
（1）******相邻快元素垂直外边距重合：
    使用margin定义快元素的垂直外边距时，可能会出现外边距合并（取两个值的较大者
    解决：尽量只给一个盒子添加margin
（2）*******嵌套盒子塌陷：
    对于父子关系的快元素，父元素有margin-top，子元素也有margin-top(无效）依然紧贴父元素顶边），此时父元素会塌陷较大的外边距,
    解决：1.给父元素添加边框
        2.给父元素设内边距
        3.给父元素设overflow：hidden
        4.浮动:float:left，
        5.固定：position:fixed
        6.绝对定位position:absolute

清除元素的内外边距：
  网页元素很多带有默认的内外边距，而且浏览器默认值不一样，在布局前要清除网页的内外边距。
  *{}


css盒子模型：
关键：宽高是否代表盒子本身的宽高，盒子有margin，border，padding，content内容组成
IE（怪异盒模型）：宽度为内容本身的宽度box-sizing：border-content
标准盒子模型：宽度为内容，padding，border合起来的宽度。box-sizing：border-box

让块级盒子水平居中：
（1）定宽度：margin：auto
让行内元素或者行内快元素水平居中
（2）给父元素加text-align:center就可以

传统布局的三种方式
  一个网页基本包含了标准流，浮动定位这三种布局方式。
    1:标准流（普通流/文档流）标签按照定义好的方式排列,块级元素和行内元素布局
    2：浮动
    3：定位

浮动：标准流无法完成，浮动可以改变标签默认排列方式。
浮动特性：1：脱离标准普通流
        2： 加了浮动就会排成一行，
        3：浮动的盒子不再保留原来的位置
        4：浮动的元素具有行内快元素的相似特性

    如果行内元素浮动后，就会变为行内快元素，可以设置宽高
    如果盒子没有设置宽高，默认和父亲的宽高一样，如果盒子浮动之后，宽度就是内容的宽高。
    浮动的盒子中间是没有间隙的，紧挨着
    浮动盒子只会影响后面的盒子，不会影响前面，一浮全浮

浮动的副作用：父元素高度坍塌，父元素没有设置高度，子元素设置了浮动，浮动脱离文档流，不占原有位置，影响其他元素
清除浮动（本质是清除浮动造成的影响）：
    1、额外标签法（隔墙法），W3C推荐（必须是块级元素）
        <div class='clear'> .clear{clear:both}
        优点：通俗易懂，书写方便
        缺点：添加没有意义的标签，结构化差
    2、父级添加overflow:hidden
        优点：写法简单
        缺点：溢出隐藏
    3、父级添加after伪元素，额外标签的升级版,
      .father:after{
           content:'',
           display:block,
           height:0,
           clear:both;
           visibility:hidden
        } IE6、7专有：.father {*zoom:1}
        优点：没有增加额外的标签，结构更简单
        缺点：照顾低版本的浏览器
        代表网站：百度，淘宝，网易用的
    4、父级添加双伪元素
        在大盒子前面插入
        .father:before,
        .father:after{
            content:'';
            display:table;
        }
        .father:after{
            clear:both
        }
        .father {*zoom:1}
        优点：代码简洁
        缺点：照顾低版本
        代表：腾讯，小米



图片：常见图片格式
    jpg，JPEG（JPG）对色彩的信息保留较好，高清，颜色较多，我们产品类的图片经常用jpg格式
    png：新兴的网络图像格式，结合了GIF和PEG的优点，具有存储形式丰富的特点，能够保持透明背景，如果要切成背景透明的图片用png格式
    gif：最多只支持256色，通常用来显示简单图像及字体，但是可以保存透明背景和动画效果，实际经常用于一些小动画效果
    PSD：是photoshop的专用格式，可以存放图层，通道，遮罩等多种设计稿，对我们来说最大的优点可以之间从上面复制文字，获得图片，测量大小和距离


写CSS属性顺序：
    1.布局定位属性：display/position/float/clear/visibility/overflow
    2.自身属性：width/height/margin/padding/border/backgrounnd
    3.文本属性：color/font/text-decoration/text-align/vertical-align/white-space/break-word
    4.其他属性：content/cursor/border-radius/box-shadow/background


实际开发中，不会直接用a而是li包含a语义更清晰，如果用a搜索引擎容易辨别为有堆砌关键字的嫌疑，从而影响网站排名

SEO网站优化











-----------------------------------------字体：-------------------------------------------------------------------------
属性：font-size,font-family,font-weight,font-style,font字体连写（复合属性）
font-family字体系列：
常见字体：’Microsoft yahei‘，tahoma
复合属性：简写方式
div {
    font-style:italic,
    font-weight:500;
    font-size:18px;
    font-family:'Microsoft yahei'
    //复合属性 font:font-style font-weight font-size font-family 不能颠倒顺序
    font:italic 500 18px 'Microsoft yahei'
}

-------------------------------------------文本------------------------------------------------------------------------：
color:red,#fff,reg(255,0,0,0)
text-align:对齐center,left,right
text-decoration,添加装饰线，underline,overline,line-througn
text-indent文本首行缩进 10px
line-height控制文字与行之间的距离（怎么控制居中？行间距为上间距+文本高度+下间距，真正改变的是行间距
行高的上间隙和下间隙把文字挤到中间了，行高小于盒子高度，文字偏上，大于盒子高度文字偏下

----------------------------------------background-----------------------------------------------------------

background-color:transparnt默认透明
background-image：url()
background-repeat:repeat-x,repeat-y,no-repeat
background-position:x,y (top|center|left|bottom|right) 方位名词(第二个参数省略默认居中。center right或者 right center一一样)
background-position:top center; background-position:15px 50px;靠左15，靠上50 .混合单位，第一个一定是x，第二个是y.background-position:20px center
！！！background-attachment:背景图像固定，设置背景图像是否固定或者随页面其余部队滚动，可做视差滚动效果
    background-attachment：scroll随内容滚动，fixed固定不随内容滚动
背景复合写法：
background：背景颜色 图片地址 平铺 背景图像滚动 背景图片位置 （不固定顺序，font固定）
background：transparent url() repext-y fixed top

CSS3新增属性
background:rgba(0,0,0,0.3)设置透明度（颜色透明）

------------------------------------------border--------------------------------------------------------
简写：border：1px solid red
border-width 边框粗细
border-style 虚实，波浪
border-color
border-collapse：（合并相邻边框）collapse

--------------------------------------------------------------------------------------




PS基本操作：
Ctrl+R可以打开标尺，或试图->标尺
右击标尺把里面的单位改为像素
Ctrl+（+或者-）可以放大缩小
按住空格，鼠标可以变成小手 ，拖动ps试图
用选区拖动，可以测量大小



CSS3新增属性：
background
border-radius
box-shadow：h-shadow v-shadow blur spread color insert
          h-shadow  水平阴影位置,影子在水平上移动，负往左
           v-shadow  垂直阴影 影子上下移动 
           blur 模糊距离 影子虚实，改为0就是很嘿的阴影
           spread 阴影尺寸，影子大小
           insert 改为内阴影，这样就看不见了.默认outset
           阴影不占空间
text-shadow h-shadow v-shadow blur color 