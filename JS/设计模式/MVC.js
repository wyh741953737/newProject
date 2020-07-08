//模型-视图-控制器（逻辑）
//他是一种使用业务逻辑，数据，视图进行分离的方式。

// MVC和MVVM区别
// 没什么区别。vue的mvvm双向数据绑定，什么是双向？数据更改视图会变化，视图变化，数据也会变化，
//视图变化数据怎么变化》无外乎监听onchange，oninput事件，监听拿到最新值，数据一改，就影响了视图。
//只要我们能让数据影响视图。如果非要有区别，vue帮我们把onchange和oninput做好了，react要我们自己实现。

// MVC单向数据改变，mvc默认只实现了数据的更改控制视图
// MVVM双向数据改变，mVVM实现了数据的更改控制视图，视图改变数据，onchange/oninput
//MVVM是MVC的改造，数据驱动视图。view--viewModel==model，视图和数据分离。
//MVP（View == Presenter== model）view不能和model进行交互
let MVC = {}
MVC.model = (function () {
    let data = {
        sidebar: [{
            title: 'sidebar1',
            href:'./a.html'
        }, {
            title: 'sidebar2',
             href:'./b.html'
        }
        ]
    }
    return {
        getData: function (key) {
            return data[key]
        },
        setData: function (key,value) {
            data[key] = value
            MVC.view('createSidebar')
        }
    }
})()
MVC.view = (function () {
    let m = MVC.model
    let view = {
        createSidebar: function () {
            let data = m.getData('sidebar')
            let html = ''
            html += '<div id="#sidebar">'
            // for (let i = 0; i <div data.length; i++) {
            //     html += '<div class="sidebar-item"><a href="'+data[i].href+'">'+data[i].title+'</a></div>'
            // }
            html += '</div>'
            document.body.innerHTML = html
        }
    }
    return function (v) {
        view[v]()
    }
})()
MVC.ctrl = (function () { 
    let m = MVC.model
    let v = MVC.view
    let c = {
        initsidebar: function () {
            v('createSidebar')
        },
        updateSidebar: function () {
            m.setData('sidebar',[{title:'new sidebar',href:'./aa.html'}])
        }
    }
    return c
})()
window.onload = function () {
    MVC.ctrl.initsidebar
}