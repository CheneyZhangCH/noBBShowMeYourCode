### Vue2生命周期钩子有哪些？ 
beforeCreated
created
beforeMount
mounted
beforeUpdate
updated
beforeDestroyed
destroyed

如果被keep-alive还会有两个
activated
deactivated
errorCaptured 组件或自组件错误被捕获

数据请求放在mounted里

created 在ssr中会被后端和前端各执行一次， 所以前端请求一般放在mounted里面。

### 组件之间的通信方式有哪些
1、父子： props + emit
2、爷孙： props + emit 两次 / provide + inject 
3、任意组件通信： event Bus / vuex

### Vuex用过吗？ 如何理解
Vuex是一个状态管理库
核心概念包括 store/state/getter/mutation/action/module
store： 是一个大容器， 包含所有内容。
state： 用来读取状态， 附带一个mapState辅助函数
getter： 用来读取派生状态， 附带 mapGetters辅助函数
mutation： 用来同步更新状态，附带一个mapMutations辅助函数
action: 用来异步更新状态，但它提交的是mutation， 不能直接更新状态
module： 用来给store划分模块， 方便维护代码

为什么要把mutation和action分开？ 为了方便代码维护。

### VueRouter用过吗？怎么理解？

VueRouter是vuejs的官方路由， 深度适配

核心概念包括 router-link / router-view / hash模式 / history模式 / 导航守卫 / 懒加载

hash模式 vs history模式
* 字面区别
* history模式需要nginx配合， 后端没有的路由全部重定向到index，交由前端接管

导航守卫 beforeEach / afterEach
实现登录控制
router.beforeEach((from, to, next) => {
    if(to.path === '/login') return next()
    if('需要登录' && '没有登录') return next(`/login?redirect=${encodeURIComponent(to.path)}`)
    next
})

懒加载 import('../../')

### Vue2是如何实现双向绑定的？

1、一般通过v-model 或 .sync来实现双向绑定， v-model是v-bind:value=xxx 和 v-on:input=xxx的语法糖。
v-bind:value 实现了 data -> ui 的单项绑定
v-on:input 实现了 ui -> data 的单项绑定
加起来就是双向绑定了
2、这两个单向绑定是如何实现的呢？
v-bind 是通过Object.defineProperty递归的给data创建getter和setter，用于监听data的变化， data一变， 就更新ui
v-on 是通过template complier 给dom添加事件委托监听， dom input值改变之后就去更新data
