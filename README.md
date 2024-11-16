# 自动匹配助手

#### 介绍
chrome插件，读取本地的一个文本文件，文件格式是key:value的list，然后读取页面中的key，在list中找到对应的key及匹配的value，然后在页面中的一个下拉列表中选择相同的value，并提交。重复上述循环，一直到页面中找不到key的container

#### 软件架构
chrome插件


#### 使用说明

1.  用wps打开需要处理的文件，把content的回车符处理掉（wps中有一个橡皮图标，点开旁边的下拉三角——特殊字符——换行符），如果wps版本的原因找不到这个功能，可以使用公式：=SUBSTITUTE(A1, CHAR(10), "")
2.  wps另存为unicode文本，content和question之间用“制表符”分隔。
3.  在本插件页面，先上传导出的文件，然后启动自动匹配。
4. enjoy it.
