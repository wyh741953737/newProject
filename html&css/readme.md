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
标准box-sizing：content-box（真实内容的宽高），怪异
，css3的flex弹性伸缩模型，columns多列布局
我们最常用的就是标准盒子模型：也就是box-sizing为content-box代表内容宽高，不代表盒子宽高，盒子宽高包括内边距，外边距，边框。但是这样在项目开发过程中会遇到
问题：比如我们想要构建100*100的盒子，但是设置了width和height是100，我加border的时候不改变width和height会变大。
CSS3提供了一个方式：box-sizing：border-box，也就是怪异盒模型（width和height是指盒子的大小，不是内容大小，
真实项目中都在用box-sizing：border-box，我看。。。的源码也是用的ie盒模型），

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

绝对定位和固定定位会完全压住盒子，包括文字图片
浮动只会压住它下面标准流的盒子，但是不会压住下面标准流盒子里面的文字（图片
为什么浮动不会压住下面标准流所有内容？
    浮动设计初衷是为了做文字环绕效果的（文字环绕浮动元素
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

display:
    none隐藏后不占用原来的位置
    block除了变为快元素还可以显示
    inline|inline-block
    table|table-cell|table-column|table-row
visiblity：visible元素可见
            hidden隐藏，占用原来的位置

overflow auto需要时剪切内容并添加滚动条，溢出才显示滚动条
        scroll总是显示滚动条，不溢出也显示滚动条
        hidden 溢出隐藏
定位：
static：静态定位，正常文档流排列
相对定位：相对原理位置定位，不脱标，原来位置继续保留。
绝对定位：如果没有祖先元素或者祖先元素没有定位，以浏览器为准
         如果祖先元素有定位（相对，绝对，固定），就以最近的有定位的祖先元素为参考点
        绝对定位脱标，原来位置不保留
固定定位：fixed，相对于可视窗口进行定位
sticky：粘性定位，下拉到一定程度固定，距离topleftrightbottom中一个多少的时候固定，既有相对定位的原理位置保留，又有fixed的固定定位
固定在网页的右侧：可视区域的一般，margin-left网页的一半


精灵图：将网页中一些小的背景图片整合到一张大图中，这样服务器就可以请求一次就行
精灵图也叫雪碧图sprites的使用：主要针对小的背景图，
    移动背景图片的位置，使用background-position，移动的距离就是这个目标图片的x和y坐标。
    精灵图代码：
        background:url(image.png) no-repeat -123px -113px
    精灵图缺点：图片文件还是比较大的、图片本身放大缩小会失真、一旦图片制作完成想要更换非常复杂、
    一种新技术解决这个问题：字体图标：iconfont
    iconfont展示的是图标，本质是字体，
    优点：灵活性：放大缩小不失真，可以改大小，阴影
          轻量级：一个图标字体比一系列的图像小，一旦字体加载了，图标马上会展示出来，减少了服务器请求
            兼容性：完全兼容各大浏览器
    虽然字体图标有这么多优点，不能代替精灵图，结构样式简单用字体图标。遇到复杂的图片还是要用精灵图
    iconmoom：字体图标追加：把压缩包里的selection.json重新上传，重新选择，下载，替换

    CSS三角形：border-top-color:10px solid red;
              border-botton-color:10px solid green;
              border-left-color:10px solid pink;
              border-right-color:10px solid yellow;\
    或者：border:10px solid transparent
           border-top-color:red

鼠标 样式：
cursor:pointer小手  
cursor:default小白（默认）
cursor:move移动
cursor:text文本
cursor:not-allowed禁止

轮廓线：outline：给表单（input,textarea）添加outline：0或者outline：none之后，就可以去掉默认蓝色边框
防止文本域拖拽：textarea{resize:none}



图片：常见图片格式
    jpg，JPEG（JPG）对色彩的信息保留较好，高清，颜色较多，我们产品类的图片经常用jpg格式
    png：新兴的网络图像格式，结合了GIF和PEG的优点，具有存储形式丰富的特点，能够保持透明背景，如果要切成背景透明的图片用png格式
    gif：最多只支持256色，通常用来显示简单图像及字体，但是可以保存透明背景和动画效果，实际经常用于一些小动画效果
    PSD：是photoshop的专用格式，可以存放图层，通道，遮罩等多种设计稿，对我们来说最大的优点可以之间从上面复制文字，获得图片，测量大小和距离


水平垂直居中

vartical-align垂直居中，
只针对行内元素或者行内快元素有效
    vartical-align:baseline(父元素基线上) | top | middle（父元素中部 | bottom

    图片和文字实现垂直居中：display：inline-block；vertical-align：middle
    解决图片底部默认空白间隙的问题：
    bug：图片底侧有一个空白间隙，原因是行内快元素会和文字基线对齐。
    解决：vertical-align：buttom | middle | top 只要不是基线就可以（提倡）
        2：把图片转化为块元素（不提倡）

两个盒子排在一排，相邻边框重合？
    float;left;
    margin-lfet：-1px；
    第一个盒子往左1px，第二个先浮动靠紧第一个，然后-1px就可以了
鼠标悬浮边框颜色改变
    position:relative;//盒子没有定位，就relative。万一要加absolute了就不能relative，
    z-index：1，如果li都有定位就提高层级
左边图片，右边文字的布局：文字环绕图片形成左右结构布局
    float:left



溢出文字省略：
    单行文本：
        white-space：normal// 如果文字一行显示不开，自动换行，
       1： white-space：nowrap //强制不换行一行显示
       2：overflow：hidden //溢出的藏起来
       3：text-overflow：ellipsies 溢出就用省略号
    多行文本：
    有较大兼容性问题，适合webkit浏览器或移动端（大部分webkai内核）
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-line-clamp:2
        -webkit-box-orident:vertical;




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
字体：黑体：\9ED1\4F53要变为unicode编码，有效避免浏览器解析CSS出现乱码
    宋体\5B8B\4F53
    微软雅黑\5FAE\8F6F\96C5\9ED1
-------------------------------------------文本------------------------------------：
color:red,#fff,reg(255,0,0,0)
text-align:对齐center,left,right
text-decoration,添加装饰线，underline,overline,line-througn
text-indent文本首行缩进 10px
line-height控制文字与行之间的距离（怎么控制居中？行间距为上间距+文本高度+下间距，真正改变的是行间距
line-style

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

--==============================================================
HTML5新特性增加了一些新的标签、新的表单，新的表单属性，这些新特性都有兼容性，ie9以上才支持
1、与语义化标签：
    header，nav,article,aside,section，footer

2、多媒体标签：video，audio使用方式基本相似
    video只支持三种视频格式，mp4，webm，ogg
        IE，Chrome，FireFox（21以上版本，linux从30开始），safari，Opera都支持mp4格式，
        video属性：
            autoplay自动播放（chrome考虑到消耗用户流量不自动播放，添加muted解决自动播放问题
            controls向用户显示播放控件（循环和设置大小属性
            loog循环播放
            preload：auto预先加载视频，none不加载
            poster加载等待的动画图片
            muted：'muted'静音播放

    audio音频，支持mp3，ogg，Wav三种音频格式，mp3主流浏览器都支持，Wav，IE不支持
        audio属性：
            autoplay
            loop
            controls
            chrome禁止了自动播放，要通过js解决
3、新增表单input类型（必须使用表单提交域）
    type='email'
    type='url'
    type='date'日期
    type='time'时间
    type='month'月
    type='week'
    type='number'
    type='tel'
    type='search'搜索框
    type='color'生成一个颜色选择表单

4、新增input属性：
    required
    placeholader
    autofocus
    autocomplat默认打开
    multiple可以多选文件提交






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

新增选择器：
    类选择器、属性选择器，伪类选择器权重都是10
    属性选择器input[value]
        选择属性名为 div[class='box']
        选择以..开头 div[class^='box']
        选择以..结尾 div[class$='boss]
        选择包含... div[class*='box']
        
    结构伪类选择器 ：
      n可以是1，关键字（技术偶数），计算
        根据文档结构来选择元素，常用于根据父级选择器里的子选择器
        E:first-child 选择父元素的第一个子元素
            ul li:first-child{}选择ul中第一个叫li的元素
        E:last-child 选择父元素的最后一个子元素
        E:nth-child(n) 选择父元素的第n个子元素,nth-child会把所有的盒子都排序列号
            nth-child(n)执行的时候section div:nth-child会先把section的第一个孩子p选择出来，和div一对比，不符合，就选不出来。（先找孩子，再找类型）
            nth-of-type(n) 会选择类型一样的第一个孩子（先找类型再找孩子）
            <section>
                <p></p>
                <div></div>
            <scetion>
          ol li:nth-child(odd) 偶数
          ol li:nth-child(even) 奇数
          ol li:nth-child(n) 选择所有的孩子
          ol li:nth-child(2n) 选择0，4，6，8偶数孩子
          ol li:nth-child(2n+1) 选择1，3，5，奇数孩子
          ol li:nth-child(n+5) 选择 5，6，7，8后面的孩子

        E:first-of-type 指定类型E的第一个
        E:last-of-type 指定类型E的第一个
        E:nth-of-type(n) 指定类型E的第n个
        需求：排行榜前三名红色，其余灰色 

    元素伪类选择器（伪元素）
        ::before,::after创建一个元素，但是属于行内元素，新创建的这个元素再文档树中找不到，所以称为伪元素
        before和after在父元素内容的前面或者后面必须有content属性，伪元素和标签选择器一样，权重为1。
        使用场景：做字体图标>或者<
                鼠标放上去有半透明覆盖
        .tudou::before {content:'',display:none;position:absolute;top:0;left:0;width:100%;height:100%'background-color:rgba(0,0,0,.4)}
        .tudoi:hover::before {display:block}
        清除浮动：
        额外标签法的升级：
            div:after{ //单冒号照顾ie8低版本浏览器
                display:block;
                content:'';
                height:0;
                visibility:hidden;
                clear:both;
            }
        双伪元素：
        div:before,div:after {
            content:'';
            display:table; //转化为块级排在一行。插入的元素必须是块级元素，默认排在一列，我们要把他门排在一行，table表格，就排在一行
        }
        div:after{
            clear:both;
        }

新增border-box

模糊图片：
    filter:函数（）；
    filter:blur(5px);blur模糊处理 数值越大越模糊

计算盒子宽度calc
    width:calc(100%-25px)
CSS过度 
    transition在不使用flash和js情况下实现动画（从一个状态变为另一种状态。
    经常和hover搭配一起用。
    transition：要过度的属性 花费时间 运动曲线 何时开始
    liner线性
    ease慢下来
    ease-in加速
    ease-out减速
    ease-in-out先加速再减速
    transition:width 0.5s ease-in 1s
    transition:width 0.5s ease,height 1s ease-in
    要所以属性都变化用all：transition：all .5s


HTML5侠义说法：HTML5结构本身
HTML5广义说法：HTML5+CSS+Js，虽然不被某些浏览器支持，是发展趋势

*{
    padding:0;
    margin:0;
}
和html,body,ul,li,p,h1,h2,h3,fieldset,legend,img {margin:0;padding:0}哪个效率高？
后面的效率高，
