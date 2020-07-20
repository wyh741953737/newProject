什么是webworker？
webworker让js拥有多线程环境，js将一些任务分配给worker线程，worker线程一旦建立就一直工做，以备随时响应主线程。
所以worker也浪费资源，如果不用就关闭

webworker的限制：
同源限制：worker要和主线程要同源
DOM限制，worker的全局不再是window，所以很多window上的方法不能用，比如alert，confirm
通信限制：worker线程和主线程不在同一上下文环境，就不能通信，必须通过消息完成
文件限制：worker线程无法读取本地文件，即不能打开本机的文件系统，它加载的脚本必须来自网络

worker场景：
worker轮循：