正则表达式是用于匹配字符串中的字符组合的模式，通常用来检索，替换那些符合某个模式的文本
用于匹配，替换，提取
灵活，逻辑性和功能性很强
通过RegExp来创建
var reg = new RegExp(/123/)
test是正则对象方法，检测字符串是否符合规范

边界符：^,$
字符类：有一系列字符供你选择，匹配一个就好
    var reg = /[abc]/ 只要包含a，或者b，或者c就返回true
    []只能多选一
   [-]范围 
    如果^在[]里面表示取反，不能包含[]里面内容
    [^abc]表示不能以a或者b或者c开头

量词符号:
* 表示0，或者很多次
+ 1次，或者很多次
？ 1次或者0次
{n} 重复n次
{3，}大于等于3
{3，16} 大于等于3，且小于等于16
/^abc{3}/表示c重复三次
/^(abc){3}/表示把abc重复3次
\d   [0-9]
\D   [^
0-9] 0-9以外任意字符
\w   [A-Za-z0-9_] 匹配所有字母数字_字符
\W   [^A-Za-z0-9_] 所有字母数字_以外字符
\s 空格（包含换行符，制表符，空格符[\t\r\n\v\f]
\S 匹配非空字符，[^\t\r\n\v\f]