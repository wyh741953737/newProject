Fiber
- 当页面元素很多，并且需要频繁刷新的情况下，react15会出现掉帧的现象
  根本原因是大量的同步计算任务占用主线程，阻塞浏览器ui的渲染，页面得不到及时的更新，在调用setstate之后，react会遍历所有的元素，找出差异进行渲染，整个过程一气呵成不能中断，如果页面元素很多，整个过程占用的时间超过16ms就会出现掉帧的现象

- 针对这个现象，react团队从框架层面对web页面的运行机制做了优化，设计了一些算法，为了能让算法跑起来，就出现了fiber这种数据结构
 fiber数据结构+新的算法 =fiber架构

解决js运算持续占用主线程的思路：将运算分割成多个步骤，分批完成，在完成一部分任务后将控制权交回浏览器，让浏览器有时间进行页面渲染，等浏览器忙完再继续js运算
旧版本react通过递归方式进行渲染，使用的是js引擎自身的函数调用栈，直到为空。
Fiber实现了自己的组件调用栈，它以链表的形式遍历组件树，可以灵活的暂停，继续和丢弃执行的任务
实现方式：requiseIdleCallback这个api，window.requestidleCallback会在浏览器空闲的时候依次调用函数，

React框架内部运作分3层
vituralDOM层，描述页面长什么样
Reconclier（协调器）层，负责调用组件生命周期方法，进行diff运算等
renderer层，根据不同平台渲染出相应页面，常见的reactDOM和ReactNative
改动较大的是reconclier层，react团队给他取了个名字Fiber Reconciler
Stack reconciler运作过程不能被打断，要一条道走到黑，而Fiber Reconciler每执行一段时间都会将控制权交回给浏览器，可以分段执行（心电图）
为了达到这种效果，就要有一个调度器（scheduler进行分配
Fiber Reconciler在执行过程分为2个阶段
阶段一：生成Fiber树，得出需要更新的节点信息，这个过程可以被打断
阶段二：将需要更新的节点依次批量更新，这个过程不能被打断
阶段一可以被打段，让优先级更高的先执行，从1框架层面大大降低了页面掉帧的概率
Fiber其实指的是一种数据结构，用纯js对象来表示
const fiber = {
    stateNode,//节点实例
    child,//子节点
    slibling//兄弟节点
    return，父节点
}
为了加以区分，以前的reconciler被命名为Stack Reconciler
Fiber Reconciler在阶段一进行diff计算的时候会生成一颗fiber树，这棵树是在虚拟DOM基础上增加额外信息来生成的，本质是一个链表
fiber树在首次渲染的时候会一次生成，在后续需要diff的时候会根据已有树和最新VDOM的信息生成一颗新的树，这棵树每生成一个新的节点，都会将控制权交回主线程，去检测有没有优先级更高的任务需要执行，如果没有继续构建树的过程
如果过程中有优先级高的，fiber reconciler会丢弃正在生产都树，在空的时候重新执行


react应用从始至终管理着三样东西
1）Root（整个应用根，有个属性指向current树，也有个属性指向workinprogress树）
2）current树（树上每个节点都是fiber，保存的是上一次的状态，每个fiber节点都对应着jsx
3）workInProgress树（树上每个节点都是fiber，保存的是本次新的状态。每个fiber节点都对应着jsx

初次渲染的时候没有current树，react在一开始创建root时候会创建一个uninitialFiber（未初始化fiber），
让react的current指向uninitialFiber，之后再创建一个本次要用的workonprogess

- react中主要分两个阶段：
render阶段（创建fiber的过程）：（1）为每个节点创建fiber或者复用fiber，生成一颗有新状态的workinprogress
                            （2）初次渲染或创建某个节点的时候，会将这个fiber创建真实DOM实例。并且对当前节点的子节点进行插入（document.appendChild()
                            （3）如果不是初次渲染（setState），对比新旧的fiber状态，将产生了更新的节点，最终通过链表的形式挂载到RootFiber

commit阶段（真正要操作页面阶段）：（1）执行生命周期，会从RootFiber上获取链表，根据链表标识，来操作界面
