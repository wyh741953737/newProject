//组合模式
//比如登录，注册，或者一些信息的填写，这些表单都是类似的，重复度高。
//将表单拆分为一个个组件，之后排列组合
window.onload = function () {
    function inhertProto(subClass,superClass) {
        function F() {}
        F.prototype = superClass.prototype
        subClass.prototype = new F()
        subClass.prototype.constructor = subClass
    }
    function Container() {
        this.children = []
        this.element = null
    }
    Container.prototype = {
        init: function() {
            throw new Error('请重写init方法')
        },
        add: function(child) {
            this.children.push(child)
            this.element.appendChild(child.element)
            return this
        }
    }
    function CreateForm(id,method,action,parent) {
        Container.call(this)
        this.id = id || ''
        this.method = method || ''
        this.action = action || ''
        this.parent = parent
        this.init()
    }
    inhertProto(CreateForm,Container)
    CreateForm.prototype.init = function() {
        this.element = document.createElement('form')
        this.element.id = this.id
        this.element.method = this.method
        this.element.action = this.action
    }
    CreateForm.prototype.show = function() {
        this.parent.appendChild(this.element)
    }
    
    function CreateLine(className) {
        Container.call(this)
        this.className = className === undefined ? 'form-line' : 'form-line' + className
        this.init()
    }
    inhertProto(CreateLine,Container)
    CreateLine.prototype.init = function() {
        this.element = document.createElement('div')
        this.element.className = this.className
    }

    function CreateLabel(text,forName) {
        this.text = text || ''
        this.forName = forName || ''
        this.init()
    }
    CreateLabel.prototype.init = function() {
        this.element = document.createElement('label')
        this.element.setAttribute('for',this.forName)
        this.element.innerHTML = this.text
    }
    function CreateInput(type,id,name,defaultValue) {
        this.type = type || ''
        this.id = id || ''
        this.name = name || ''
        this.defaultValue = defaultValue || ''
        this.init()
    }
    CreateInput.prototype.init = function() {
        this.element = document.createElement('input')
        this.element.type = this.type
        this.element.id = this.id
        this.element.name = this.name
        this.element.value = this.defaultValue
    }
    let form = new CreateForm('owner-form','GET','/aa.html',document.body)
    let userLine = new CreateLine()
            .add(new CreateLabel('用户名','user'))
            .add(new CreateInput('text','user','user'))
    let pwdLine = new CreateLine()
            .add(new CreateLabel('密码','pwd'))
            .add(new CreateInput('password','pwd','pwd'))
    let submit = new CreateLine()
            .add(new CreateInput('submit','','','登录'))
    form.add(userLine).add(pwdLine).add(submit).show()
}