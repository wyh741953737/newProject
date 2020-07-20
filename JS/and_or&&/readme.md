|| 
    只要||前面为false，不管后面是true还是false都返回后面的
    只要||前面为true，不管后面是true还是false都返回前面的
在js逻辑运算符中，0，'',null，undefined，NaN，false，都会判定为false，其他都为true

使用！！可以将其他类型的变量转化为布尔值
    5 //true
    ！5//false
    ！！5//true
&&
    只要&&前面是false，不管&&后面是true还是false都返回前面的
    只要&&前面是true，不管&&后面是true还是false都返回后面的

在回调中，callback && callback() 这样写更严谨，防止报错

案例：
    分数>12 显示A
    分数>10 显示B
    分数>5  显示C
    分数>0  显示D
    分数<=0 显示E

let score = 0
let show = （score>12 && 'A'） || （scBore>10 && 'B'）