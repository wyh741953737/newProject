Base64能做什么？
    转码、编码、图片、加解密、向浏览器以字符串输出
Base64是加密算法码？
    不是，是一种编码格式。
    加密算法：是把明文变为不可破解的密文，提高识别难度。
    编码：换一种体现形式，以便于传输，提高可读性
什么情况用Base64？
    URL特殊字符、专门、转意、嵌入图片（src=“编码后的内容”），语言文字，底层都是用的二进制来存储的。
Base64的算法原理：
    中文=》（编码表GBK，ASCII，Unicode）在编码表中找到对应的二进制。
    中文1：双字节，最大的是3字节，最大用3*8=24个字节，用24个字节可以标示世界上任何一个字符。
00000000 00000000 00000000 
000000 000000 000000 000000
min 000000 0
max 111111 63
所以一共要64个字符。
A-Z 0-25
a-z 26-51
0-9 52-61 
+/ 62-63
第一步：找到中文字符在操作系统中字符表码表代码 GB2312（简体中文编码方式）
第二步：中文找到字符编码中的十进制
第三步：十进制转二进制
第四步：二进制每6个分组


