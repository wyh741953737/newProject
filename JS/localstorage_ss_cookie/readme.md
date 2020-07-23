localStorage:h5提供的api，为了实现跨页面的持久化存储，h5出来前只能通过cookie实现，cookie也存在c盘，每次都带上，cookie东西多，请求负担重变得慢。页面刷新，浏览器中所有变量都销毁，我们可以把不想销毁的存入localStorage。
localStorage：永久有效，除非主动删除，大小在5M左右，在请求的时候使用数据，不和服务器通信。
sessionStorage：当前会话期间有效，大小在5M左右，在请求的时候使用数据，不和服务器通信。
cookie：有效期之前一直有效，大小在4k左右（因为每次http请求都会携带cookie，如果使用过度会带来性能问题，所以不要在cookie中保存过多数据
localStorage和sessionStorage使用方法同
保存：
localStorage.setItem("key","value")

取得：
localStorage.getItem("key")
删除：
localStorage.removeItem("key")
localStorage.clear()

当要存储的数据是一个对象或者数组的时候，直接存储是不行的，
要转换数据的格式
存储前利用JSON.strginify将对象转字符串
获取数据后:利用JSON.parse将字符串转为对象