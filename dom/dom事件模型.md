### dom事件模型

1、dom事件先经历从上到下的捕获阶段， 在经历从下到上的冒泡阶段
2、addEventListener第3个参数可以选择阶段 true捕获阶段， false或者不写就是冒泡阶段
3、可以使用event.stopPropagation 阻止捕获或冒泡
