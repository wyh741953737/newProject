//建造者模式：建造者模式注重创建对象的细节，使用这种模式创建出的复杂对象或者符合对象结构会非常清晰
//建造者模式创建复杂或者复合对象，普通构造函数抽象成复合函数
//比如意家招聘公司，现在有一批纸质简历或者简历数据信息，为了做成统一的电子版简历，需要将这些简历进行整理。
//再次抽象和封装，将Person，createName,CreateWork抽象出来，复合到Candidate2中
//不使用建造者模式的写法
let data = [
    {
        name: 'Ta Eileen',
        age: 22,
        work:'engineer'
    },
    {
        name: 'ya John',
        age: 32,
        work:'teacher'
    }
]
function Candidate(param) {
    let _candate = {}
    _candate.name = param.name
    _candate.age = param.age
    _candate.firstName = _candate.name.split(' ')[0]
    _candate.lastName = _candate.name.split(' ')[1]
    _candate.work = {}

    switch (param.work) {
        case 'engineer':
            _candate.work.name = '工程师';
            _candate.work.description = '掌握JS';
        case 'teacher':
            _candate.work.name = '老师';
            _candate.work.description = '无'
    }
    _candate.work.changeWork = function (work) {
        this.name = work
    }
    _candate.work.changeDes = function (des) {
        this.description = des
    }
    return _candate
}
let candidateArr = []
for (let i = 0; i < data.length; i++) {
    candidateArr[i] = Candidate(data[i])
}
console.log(candidateArr)



//使用建造者模式写法
function Candidate2(param) {
    let _candate = new Person(param)
    _candate.name = new CreateName2(param.name)
    _candate.work = new CreateWork2(param.work)
    return _candate
}
let candidateArr2 = []
for (let i = 0; i < data.length; i++) {
    candidateArr2[i] = Candidate2(data[i])
}
function Person(param) {
    this.name = param.name
    this.age = param.age
}
function CreateName2(name) {
    this.fullName = name
    this.firstName = name.split(' ')[0]
    this.lastName = name.split(' ')[1]
}
function CreateWork2(work) {
    switch (work) {
        case 'engineer':
            this.name = '工程师'
            this.description = 'js'
            break
        case 'teacher':
            this.name = '老师'
            this.description = '教师'
            break
        default:
            this.name = work
            this.description = '无'
    }
}
CreateWork2.prototype.changeWork = function (work) {
    this.name = work
}
CreateWork2.prototype.changeDes = function (des) {
    this.description = des
}
console.log(candidateArr2)
candidateArr2[0].work.changeDes('描述')