flex布局和传统布局：
    传统布局：兼容性好，布局繁琐，局限性（不能在移动端很好的布局）
    flex布局：操作方便布局简单，移动端应用广泛，PC端浏览器支持情况差，IE11或者更低版本，不支持或仅部分支持
如果是PC端，建议传统布局，移动端不考虑兼容性的PC端布局用flex布局。

flex原理：通过给父盒子添加flex属性，来控制子盒子的位置和排列方式。
弹性布局，用来为盒模型提供最大的灵活性，任何一个容器都可以指定为flex布局（众生平等——
注意：当我们为父元素设置flex之后，子元素的float，clear，vertical-align都失效。
    采用flex布局的元素，称为Flex容器，子元素：flex Item，子容器可以横向纵向排列
    flex默认子元素排在一行，放不下会缩小子元素宽度，可以使用flex-wrap设置换行
flex布局父元素常见属性：
    1：flex-direction设置主轴方向，默认x方向，y轴默认向下。row/从左到右，根据主轴排列，row-reverse，主轴设置为y轴，x就成为侧轴。
    2：justify-content 设主轴(默认水平）子元素排列：flex-start,flex-end,conter,space-around,space-between
    3：flex-wrap 默认nowrap，换wrap
    4：align-items设置侧轴排列方式，flex-start,flex-end center,strech拉升（去掉高度）
        align-items只能设置顶头顶尾，不能和justify-content一样设置space-around和space-between
    5：align-content设置侧轴上子元素的排列方式（使用多行（出现换行）,单行没效果），父元素flex：wrap，控制子元素的对齐方式使用align-content，值有sapce-between\space-around\flex=start\flex-end\stretch\center
    6：flex-wrap是flex-direction和flex-wrap的合并
flex布局子元素常见属性：
    1：flex：占据剩余空间多少份
    2：align-self：控制子项在自己的侧轴上排列方式，
