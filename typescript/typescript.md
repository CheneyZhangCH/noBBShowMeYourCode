### ts 和 js 的区别
1、ts是js的超集 ts === js + type
2、浏览器和nodejs可以直接执行js， 不能直接执行ts
3、ts要先编译成js 才能执行
4、ts更难写，但是类型更安全
5、ts ide的提示更完美。 js的提示很弱。

### any、unknown、never 的区别是什么？

unknown 比 any 类型检查更严格， any就是不做类型检查， unknown 在赋值的时候会进行类型检查。
never 不能被赋值
```Typescript
// 举个具体点的例子，当你有一个 union type:
interface Foo {
  type: 'foo'
}
interface Bar {
  type: 'bar'
}
type All = Foo | Bar

// 在 switch 当中判断 type，TS 是可以收窄类型的 (discriminated union)：
function handleValue(val: All) {
  switch (val.type) {
    case 'foo':
      // 这里 val 被收窄为 Foo
      break
    case 'bar':
      // val 在这里是 Bar
      break
    default:
      // val 在这里是 never
      const exhaustiveCheck: never = val
      break
  }
}

```

### type 和 interface 的区别
1、组合方式不同： interface 只能extends继承， type可以使用&符号
2、扩展方式： interface 重复声明两次， 类型会自动合并， type 不能重复声明
3、范围不同： type适用于基本类型, interface一般不行
4、命名方式不同：interface会创建一个新的类型，  type只是给类型起了一个别名

const a = [1, 2,3] as const
// as const 是指类型收窄到最小

### TS 工具类型 Partial、Required 等的作用和实现？
1. 将英文翻译为中文。
interface User {
    id: number
    name: string
    age: number
}
* Partial 部分类型 Partial<User, 'id', 'name'>
* Required 必填类型
* Readonly 只读类型
* Exclude 排除类型 (基本类型)
* Extract 提取类型 (基本类型)
* Pick 提取 key 类型 (interface)
* Omit 排除 key 类型 (interface)
* ReturnType 返回值类型