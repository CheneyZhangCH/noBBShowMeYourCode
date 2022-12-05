#### BFC是个啥？

##### 1、定义
块级格式化上下文

##### 2、有什么用
- 防止margin合并
- 清除浮动 （更推荐.clearFix）

##### 3、如何触发
- float !== none
- overflow !== visible
- display: inline-block
- position: absolute/fixed
- 父元素display: flex / inline-flex