 懒加载：按需加载
 触发条件的时候再加载
 原理：图片没有进入可视区，先不给img的src赋值，等待图片进入可是去之后再给src赋值

 代码：
 1.<img class="lazy" src="img/loading.jpg" data-src="img/pic.jpg" alt="pic">
 
 2.判断可视区域：当图片距离顶部的距离top-height等于可视区域h和滚动区域高度s之和时说明图片马上就要进入可视区了，就是说当top-height<=s+h时，图片在可视区。
 网页可见区域宽：document.body.clientWidth
 网页可见区域高：document.body.clientHeight

 网页可见区域宽：document.body.offsetWidth包括边框线的宽
 网页可见区域高：document.body.offsetHeight包括边框线的宽

网页正文全文宽： document.body.scrollWidth;
网页正文全文高： document.body.scrollHeight;

网页被卷去的高： document.body.scrollTop;
网页被卷去的左： document.body.scrollLeft;
网页正文部分上： window.screenTop;
网页正文部分左： window.screenLeft;
屏幕分辨率的高： window.screen.height;
屏幕分辨率的宽： window.screen.width;
屏幕可用工作区高度： window.screen.availHeight;
